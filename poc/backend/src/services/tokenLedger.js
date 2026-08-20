const fs = require('fs/promises');
const path = require('path');

const file = path.join(__dirname, '../../data/token-ledger.json');

async function readAll() {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
}

async function writeAll(events) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(events, null, 2));
  await fs.rename(temporary, file);
}

async function record(event) {
  const events = await readAll();
  const existing = events.find(item => item.idempotencyKey === event.idempotencyKey);
  if (existing) return { ...existing, replay: true };
  events.push({ ...event, recordedAt: new Date().toISOString() });
  await writeAll(events);
  return { ...event, replay: false };
}

async function totals() {
  const events = await readAll();
  return { events: events.length, totalTokens: events.reduce((sum, item) => sum + item.totalTokens, 0) };
}

module.exports = { readAll, record, totals };
