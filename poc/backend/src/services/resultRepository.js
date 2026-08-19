const fs = require('fs/promises');
const path = require('path');

const file = path.join(__dirname, '../../data/results.json');

async function readAll() {
  try {
    const content = await fs.readFile(file, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeAll(results) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(results, null, 2));
}

module.exports = {
  async save(result) {
    const results = await readAll();
    const saved = { ...result, savedAt: new Date().toISOString() };
    results.push(saved);
    await writeAll(results);
    return saved;
  },

  async findById(id) {
    const results = await readAll();
    return results.find(result => result.id === id) || null;
  },

  readAll,
};
