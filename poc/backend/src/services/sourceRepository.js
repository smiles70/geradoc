const fs = require('fs/promises');
const path = require('path');

const directory = path.join(__dirname, '../../data/uploads');

function safeName(fileName) {
  return path.basename(fileName).replace(/[^a-zA-Z0-9._-]/g, '_');
}

module.exports = {
  async save({ id, buffer, fileName, mimeType }) {
    await fs.mkdir(directory, { recursive: true });
    const storedName = `${id}-${safeName(fileName)}`;
    const storedPath = path.join(directory, storedName);
    await fs.writeFile(storedPath, buffer);
    return { storedPath, fileName, mimeType, sourceUrl: `/api/process/${encodeURIComponent(id)}/source` };
  },

  async read(id, fileName) {
    const entries = await fs.readdir(directory);
    const prefix = `${id}-`;
    const storedName = entries.find(entry => entry.startsWith(prefix));
    if (!storedName) return null;
    return { buffer: await fs.readFile(path.join(directory, storedName)), fileName, storedName };
  },
};
