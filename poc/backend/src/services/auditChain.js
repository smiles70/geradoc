const crypto = require('crypto');

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

function hash(value) {
  return crypto.createHash('sha256').update(canonical(value)).digest('hex');
}

class AuditChain {
  constructor() {
    this.previousHash = null;
    this.records = [];
  }

  append(record) {
    const entry = { ...record, previousHash: this.previousHash };
    const recordHash = hash(entry);
    const stored = { ...entry, recordHash };
    this.records.push(stored);
    this.previousHash = recordHash;
    return stored;
  }

  verify() {
    let previousHash = null;
    for (const record of this.records) {
      const { recordHash, ...entry } = record;
      if (entry.previousHash !== previousHash || hash(entry) !== recordHash) return false;
      previousHash = recordHash;
    }
    return true;
  }
}

module.exports = { canonical, hash, AuditChain };
