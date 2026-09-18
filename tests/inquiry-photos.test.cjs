/* Offline integration checks: actual image decoder + route handlers; DB/mail transports are mocked. */
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS harness isolates TS modules with transport mocks. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const sharp = require('sharp');
const { NextRequest } = require('next/server');
const root = path.resolve(__dirname, '..');

function loader(overrides = {}) {
  const cache = new Map();
  function load(file) {
    const absolute = path.resolve(root, file);
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const result = { exports: {} };
    cache.set(absolute, result);
    const compiled = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText;
    const nativeRequire = Module.createRequire(absolute);
    function localRequire(id) {
      if (Object.hasOwn(overrides, id)) return overrides[id];
      if (id.startsWith('@/')) return load(`${id.slice(2)}.ts`);
      if (id.startsWith('.')) return load(`${path.resolve(path.dirname(absolute), id)}.ts`);
      return nativeRequire(id);
    }
    new Function('require', 'module', 'exports', compiled)(localRequire, result, result.exports);
    return result.exports;
  }
  return load;
}

const load = loader();
const { validatePhotos } = load('lib/inquiry-photos.ts');
const { MAX_CONTACT_BYTES, MAX_PHOTO_BYTES } = load('lib/photo-limits.ts');
const basics = { name: '테스트 담당자', tel: '010-0000-0000', site: '테스트 현장', waste: 'PE', agree: true };
async function photo() {
  const data = await sharp({ create: { width: 40, height: 30, channels: 3, background: '#ddd' } }).jpeg().toBuffer();
  return new File([data], 'test.jpg', { type: 'image/jpeg' });
}
async function request(count = 0, values = basics, overridePhoto) {
  const body = new FormData();
  for (const [k, v] of Object.entries(values)) body.append(k, String(v));
  for (let i = 0; i < count; i++) body.append('photos', overridePhoto || await photo());
  return new NextRequest('http://localhost/api/contact', { method: 'POST', body });
}

test('image normalization strips metadata and constrains resolution', async () => {
  const source = await sharp({ create: { width: 2200, height: 1100, channels: 4, background: '#abc' } })
    .withExif({ IFD0: { Copyright: 'private metadata' } }).png().toBuffer();
  const [result] = await validatePhotos([new File([source], 'private.png', { type: 'image/png' })]);
  const metadata = await sharp(result.content).metadata();
  assert.equal(metadata.format, 'jpeg');
  assert.equal(metadata.width, 1600);
  assert.equal(metadata.exif, undefined);
  assert.equal(result.filename, 'photo-1.jpg');
  assert.ok(result.content.length <= MAX_PHOTO_BYTES);
});

test('rejects disguised, oversized, unsupported files and more than three photos', async () => {
  await assert.rejects(validatePhotos([new File(['not an image'], 'fake.jpg', { type: 'image/jpeg' })]));
  await assert.rejects(validatePhotos([new File(['<svg/>'], 'x.svg', { type: 'image/svg+xml' })]));
  await assert.rejects(validatePhotos([new File([new Uint8Array(MAX_PHOTO_BYTES + 1)], 'big.jpg', { type: 'image/jpeg' })]));
  await assert.rejects(validatePhotos(Array(4).fill(await photo())));
});

test('JSON/no-photo and multipart/three-photo submissions reach both DB and email', async () => {
  const seen = [];
  const route = loader({
    '@/lib/db': { insertInquiry: async input => { seen.push(['db', input]); return 123; } },
    '@/lib/email': { sendInquiryEmail: async input => { seen.push(['mail', input]); } },
  })('app/api/contact/route.ts');
  for (const req of [
    new NextRequest('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(basics) }),
    await request(0), await request(3),
  ]) {
    const response = await route.POST(req);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
  }
  assert.equal(seen.length, 6);
  assert.equal(seen[4][1].photos.length, 3);
  assert.deepEqual(seen[4][1].photos, seen[5][1].photos);
});

test('invalid submissions never reach external transports', async () => {
  let calls = 0;
  const route = loader({
    '@/lib/db': { insertInquiry: async () => calls++ },
    '@/lib/email': { sendInquiryEmail: async () => calls++ },
  })('app/api/contact/route.ts');
  for (const req of [await request(1, { ...basics, agree: false }), await request(4), await request(1, basics, new File(['bad'], 'bad.jpg', { type: 'image/jpeg' }))]) {
    assert.equal((await route.POST(req)).status, 400);
  }
  const oversized = new NextRequest('http://localhost/api/contact', { method: 'POST', body: 'x'.repeat(MAX_CONTACT_BYTES + 1) });
  assert.equal((await route.POST(oversized)).status, 413);
  assert.equal(calls, 0);
});

test('transport failures retain the existing fallback; total failure returns 500', async () => {
  const original = console.error;
  console.error = () => {};
  try {
    for (const [dbFail, mailFail, expected] of [[true, false, 200], [false, true, 200], [true, true, 500]]) {
      const route = loader({
        '@/lib/db': { insertInquiry: async () => { if (dbFail) throw Error('DB failure'); } },
        '@/lib/email': { sendInquiryEmail: async () => { if (mailFail) throw Error('mail failure'); } },
      })('app/api/contact/route.ts');
      assert.equal((await route.POST(await request(1))).status, expected);
    }
  } finally { console.error = original; }
});

test('email includes normalized binary attachments and escapes user HTML', async () => {
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 'test-placeholder';
  let mail;
  try {
    const { sendInquiryEmail } = loader({ resend: { Resend: class { emails = { send: async input => { mail = input; return { error: null }; } }; } } })('lib/email.ts');
    const photos = await validatePhotos([await photo()]);
    await sendInquiryEmail({ ...basics, name: '<script>test</script>', photos });
    assert.equal(mail.attachments.length, 1);
    assert.deepEqual(mail.attachments[0].content, photos[0].content);
    assert.equal(mail.attachments[0].contentType, 'image/jpeg');
    assert.ok(mail.html.includes('&lt;script&gt;'));
    assert.ok(!mail.html.includes('<script>'));
  } finally {
    if (previous === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previous;
  }
});

test('inquiry and photos commit atomically; attachment failure rolls back and releases client', async () => {
  const previous = process.env.DATABASE_URL;
  process.env.DATABASE_URL = 'postgres://test-placeholder';
  try {
    for (const shouldFail of [false, true]) {
      const queries = [];
      let released = false;
      const client = { query: async (sql, params) => {
        queries.push([sql, params]);
        if (sql.includes('INSERT INTO inquiry_photos') && shouldFail) throw Error('photo insert failure');
        return { rows: sql.includes('INSERT INTO inquiries') ? [{ id: 42 }] : [] };
      }, release: () => { released = true; } };
      const db = loader({ pg: { Pool: class { query = async () => ({ rows: [] }); connect = async () => client; } } })('lib/db.ts');
      const input = { ...basics, photos: await validatePhotos([await photo()]) };
      if (shouldFail) await assert.rejects(db.insertInquiry(input)); else assert.equal(await db.insertInquiry(input), 42);
      assert.equal(queries[0][0], 'BEGIN');
      assert.equal(queries.at(-1)[0], shouldFail ? 'ROLLBACK' : 'COMMIT');
      assert.ok(released);
      assert.equal(queries.find(([sql]) => sql.includes('INSERT INTO inquiry_photos'))[1][0], 42);
    }
  } finally {
    if (previous === undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL = previous;
  }
});

test('photo endpoint blocks anonymous access, rejects bad IDs and uses private no-store delivery', async () => {
  let valid = false;
  let reads = 0;
  const route = loader({
    '@/lib/auth': { ADMIN_COOKIE: 'test-session', isValidSessionToken: async () => valid },
    '@/lib/db': { getInquiryPhoto: async () => { reads++; return { content: Buffer.from('photo'), filename: 'photo-1.jpg' }; } },
  })('app/api/admin/inquiries/[id]/photos/[photoId]/route.ts');
  const req = new NextRequest('http://localhost/api/admin/inquiries/1/photos/2?download=1');
  assert.equal((await route.GET(req, { params: Promise.resolve({ id: '1', photoId: '2' }) })).status, 401);
  assert.equal(reads, 0);
  valid = true;
  assert.equal((await route.GET(req, { params: Promise.resolve({ id: 'bad', photoId: '2' }) })).status, 404);
  const response = await route.GET(req, { params: Promise.resolve({ id: '1', photoId: '2' }) });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.ok(response.headers.get('content-disposition').startsWith('attachment;'));
});
