import { Pool } from "pg";
import type { Status } from "./inquiry-status";
import type { InquiryPhoto } from "./inquiry-photos";

let pool: Pool | null = null;

/** Vercel Postgres(Neon) 연동은 DATABASE_URL 대신 POSTGRES_URL로 주입되는 경우가 많아 둘 다 확인한다. */
function connectionString() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

function getPool() {
  const url = connectionString();
  if (!url) {
    throw new Error("DATABASE_URL(또는 POSTGRES_URL) 환경변수가 설정되지 않았습니다.");
  }
  if (!pool) {
    pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
  }
  return pool;
}

export type Inquiry = {
  id: number;
  name: string;
  company: string | null;
  tel: string;
  email: string | null;
  site: string;
  waste: string;
  volume: string | null;
  date: string | null;
  message: string | null;
  status: Status;
  agree: boolean;
  created_at: string;
};

let schemaReady: Promise<void> | null = null;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await getPool().query(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          company TEXT,
          tel TEXT NOT NULL,
          email TEXT,
          site TEXT NOT NULL,
          waste TEXT NOT NULL,
          volume TEXT,
          date TEXT,
          message TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT '접수완료';
        ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS agree BOOLEAN NOT NULL DEFAULT false;
        CREATE TABLE IF NOT EXISTS inquiry_photos (
          id SERIAL PRIMARY KEY,
          inquiry_id INTEGER NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
          filename TEXT NOT NULL,
          content_type TEXT NOT NULL,
          content BYTEA NOT NULL CHECK (octet_length(content) <= 716800)
        );
        CREATE INDEX IF NOT EXISTS inquiry_photos_inquiry_idx ON inquiry_photos(inquiry_id);
      `);
    })().catch((error) => { schemaReady = null; throw error; });
  }
  return schemaReady;
}

export async function insertInquiry(input: {
  name: string;
  company?: string;
  tel: string;
  email?: string;
  site: string;
  waste: string;
  volume?: string;
  date?: string;
  message?: string;
  agree: boolean;
  photos?: InquiryPhoto[];
}) {
  await ensureSchema();
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query<{ id: number }>(
      `INSERT INTO inquiries (name, company, tel, email, site, waste, volume, date, message, agree)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [
        input.name,
        input.company || null,
        input.tel,
        input.email || null,
        input.site,
        input.waste,
        input.volume || null,
        input.date || null,
        input.message || null,
        input.agree,
      ],
    );
    const id = rows[0].id;
    for (const photo of input.photos || []) {
      await client.query(
        `INSERT INTO inquiry_photos (inquiry_id, filename, content_type, content) VALUES ($1,$2,$3,$4)`,
        [id, photo.filename, photo.contentType, photo.content],
      );
    }
    await client.query("COMMIT");
    return id;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function listInquiryPhotos(inquiryId: number) {
  await ensureSchema();
  const { rows } = await getPool().query<{ id: number; filename: string }>(
    `SELECT id, filename FROM inquiry_photos WHERE inquiry_id = $1 ORDER BY id`, [inquiryId],
  );
  return rows;
}

export async function getInquiryPhoto(inquiryId: number, photoId: number) {
  await ensureSchema();
  const { rows } = await getPool().query<{ filename: string; content_type: string; content: Buffer }>(
    `SELECT filename, content_type, content FROM inquiry_photos WHERE inquiry_id = $1 AND id = $2`, [inquiryId, photoId],
  );
  return rows[0] || null;
}

export async function listInquiries(): Promise<Inquiry[]> {
  await ensureSchema();
  const { rows } = await getPool().query<Inquiry>(
    `SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 500`,
  );
  return rows;
}

export async function getInquiry(id: number): Promise<Inquiry | null> {
  await ensureSchema();
  const { rows } = await getPool().query<Inquiry>(`SELECT * FROM inquiries WHERE id = $1`, [id]);
  return rows[0] ?? null;
}

export async function updateInquiryStatus(id: number, status: Status) {
  await ensureSchema();
  await getPool().query(`UPDATE inquiries SET status = $1 WHERE id = $2`, [status, id]);
}

export async function deleteInquiry(id: number) {
  await ensureSchema();
  await getPool().query(`DELETE FROM inquiries WHERE id = $1`, [id]);
}
