const fs = require('fs/promises');
const path = require('path');
const repository = require('./resultRepository');

const dataFile = path.join(__dirname, '../../data/results.json');

beforeEach(async () => {
  await fs.rm(dataFile, { force: true });
});

describe('resultRepository', () => {
  it('saves and retrieves a processing result', async () => {
    const saved = await repository.save({ id: 'poc-test-001', title: 'Synthetic document' });
    const found = await repository.findById('poc-test-001');
    expect(saved.savedAt).toEqual(expect.any(String));
    expect(found).toEqual(saved);
  });

  it('returns null for an unknown result', async () => {
    await expect(repository.findById('missing')).resolves.toBeNull();
  });
});
