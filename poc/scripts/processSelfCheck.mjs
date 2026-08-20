import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const required = [
  'PROCESS_V9.51_SPEC.md',
  '.ai/process/PROCESS_CURRENT_STATE.md',
  '.ai/process/PROCESS_ROLLBACK.md',
  '.ai/process/PROCESS_CHANGELOG.md',
  '.ai/process/model-registry.json',
  '.ai/nelson/requirements-knowledge-graph.json',
  '.ai/nelson/artifact-inventory.json',
];
const errors = [];
for (const file of required) if (!fs.existsSync(path.join(root, file))) errors.push(`missing ${file}`);
const spec = fs.readFileSync(path.join(root, 'PROCESS_V9.51_SPEC.md'), 'utf8');
if (!spec.includes('Process v9.51') || !spec.includes('Unified score composition')) errors.push('v9.51 specification content incomplete');
for (const file of ['.ai/nelson/requirements-knowledge-graph.json', '.ai/nelson/artifact-inventory.json', '.ai/process/model-registry.json']) {
  try { JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')); }
  catch (error) { errors.push(`${file}: ${error.message}`); }
}
const graph = JSON.parse(fs.readFileSync(path.join(root, '.ai/nelson/requirements-knowledge-graph.json')));
const graphHash = crypto.createHash('sha256').update(JSON.stringify(graph)).digest('hex');
console.log(JSON.stringify({ status: errors.length ? 'fail' : 'pass', graphHash, requiredArtifacts: required.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
