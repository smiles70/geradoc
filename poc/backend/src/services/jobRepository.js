const fs = require('fs/promises');
const path = require('path');

const file = path.join(__dirname, '../../data/jobs.json');

async function readAll() {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeAll(jobs) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(jobs, null, 2));
  await fs.rename(temporary, file);
}

module.exports = {
  async save(job) {
    const jobs = await readAll();
    jobs.push(job);
    await writeAll(jobs);
    return job;
  },
  async findById(id) {
    const jobs = await readAll();
    return jobs.find(job => job.id === id) || null;
  },
  async findByIdempotencyKey(key) {
    if (!key) return null;
    const jobs = await readAll();
    return jobs.find(job => job.idempotencyKey === key) || null;
  },
  async update(id, patch) {
    const jobs = await readAll();
    const index = jobs.findIndex(job => job.id === id);
    if (index < 0) return null;
    jobs[index] = { ...jobs[index], ...patch, updatedAt: new Date().toISOString() };
    await writeAll(jobs);
    return jobs[index];
  },
  readAll,
};
