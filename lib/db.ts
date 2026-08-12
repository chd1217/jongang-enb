import { Pool } from "pg";

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
  created_at: string;
};

export async function ensureSchema() {
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
  `);
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
}) {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO inquiries (name, company, tel, email, site, waste, volume, date, message)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
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
    ],
  );
}

export async function listInquiries(): Promise<Inquiry[]> {
  await ensureSchema();
  const { rows } = await getPool().query<Inquiry>(
    `SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 200`,
  );
  return rows;
}
