import assert from 'node:assert/strict';
import { test } from 'node:test';

const base = process.env.TEST_BASE_URL ?? 'http://localhost:3001';

for (const route of ['/', '/docs']) {
  test(`${route} serves an accessible document with working local links and assets`, async () => {
    const response = await fetch(new URL(route, base));
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /<html[^>]*lang="en"/);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
    assert.match(html, /<title>[^<]*Vaeltrix/);
    const targets = [...html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)]
      .map(match => match[1]).filter(target => !target.startsWith('//'));
    for (const target of new Set(targets)) {
      const asset = await fetch(new URL(target, base));
      assert.equal(asset.status, 200, `${route} has a broken resource: ${target}`);
    }
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(ids.has(fragment), `Missing anchor #${fragment} on ${route}`);
    }
  });
}

test('technical specification is a PDF', async () => {
  const response = await fetch(new URL('/vaeltrix-specification.pdf', base));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/pdf/);
  assert.equal(Buffer.from(await response.arrayBuffer()).subarray(0, 5).toString(), '%PDF-');
});

test('unknown routes return 404', async () => {
  assert.equal((await fetch(new URL('/nonexistent-audit-route', base))).status, 404);
});
