import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const skipE2E = process.argv.includes('--skip-e2e');
const results = [];

function record(name, passed, detail = '') {
  results.push({ name, passed, detail });
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
}

function run(name, command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', env: process.env, ...options });
  record(name, result.status === 0, result.status === 0 ? '' : `exit ${result.status ?? 'signal'}`);
}

function validateJson(file) {
  try {
    JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
    record(`JSON ${file}`, true);
  } catch (error) {
    record(`JSON ${file}`, false, error.message);
  }
}

function validateGraph() {
  try {
    const graph = JSON.parse(fs.readFileSync(path.join(root, '.ai/nelson/requirements-knowledge-graph.json'), 'utf8'));
    const ids = new Set();
    const errors = [];
    for (const node of graph.nodes) {
      if (ids.has(node.id)) errors.push(`duplicate node ${node.id}`);
      ids.add(node.id);
    }
    const edgeKeys = new Set();
    for (const edge of graph.edges) {
      const key = `${edge.from}::${edge.relation}::${edge.to}`;
      if (edgeKeys.has(key)) errors.push(`duplicate edge ${key}`);
      edgeKeys.add(key);
      if (!ids.has(edge.from) || !ids.has(edge.to)) errors.push(`dangling edge ${key}`);
    }
    record('Requirements graph integrity', errors.length === 0, errors.join('; '));
  } catch (error) {
    record('Requirements graph integrity', false, error.message);
  }
}

for (const file of ['.ai/nelson/requirements-knowledge-graph.json', '.ai/nelson/artifact-inventory.json']) validateJson(file);
validateGraph();
for (const file of [
  'PROCESS_V9.5_SPEC.md',
  '.ai/production-readiness/epic-exit-validation-verification-guide.md',
  'poc/frontend/e2e/senior-buttons.spec.js',
  'poc/frontend/e2e/site-buttons.spec.js',
]) record(`Required artifact ${file}`, fs.existsSync(path.join(root, file)));

run('Backend tests', 'npm', ['--prefix', 'poc/backend', 'test']);
run('Frontend build', 'npm', ['--prefix', 'poc/frontend', 'run', 'build']);
run('Frontend lint', 'npm', ['--prefix', 'poc/frontend', 'run', 'lint']);
run('POC API smoke', 'node', ['poc/scripts/pocGateSmokeTest.mjs']);
if (skipE2E) record('Playwright E2E', true, 'skipped by explicit flag');
else run('Playwright E2E', 'npm', ['--prefix', 'poc/frontend', 'run', 'test:e2e']);

const failed = results.filter(result => !result.passed);
console.log(`\nProcess v9.5 gate: ${failed.length ? 'BLOCKED' : 'PASS'}`);
if (failed.length) {
  console.log('Failed gates:', failed.map(result => result.name).join(', '));
  process.exitCode = 1;
}
