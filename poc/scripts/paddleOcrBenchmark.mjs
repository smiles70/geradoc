import { execFileSync } from 'node:child_process';

function commandAvailable(command, args = ['--version']) {
  try {
    return { available: true, version: execFileSync(command, args, { encoding: 'utf8', timeout: 5000, stdio: ['ignore', 'pipe', 'ignore'] }).trim().split('\n')[0] };
  } catch {
    return { available: false, version: null };
  }
}

function pythonImport(module) {
  try {
    execFileSync('python3', ['-c', `import ${module}`], { timeout: 5000, stdio: ['ignore', 'pipe', 'ignore'] });
    return true;
  } catch {
    return false;
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  fixture: process.env.OCR_BENCHMARK_FIXTURE || null,
  options: {
    paddleocr: { executable: commandAvailable('paddleocr'), pythonModule: pythonImport('paddleocr') },
    tesseract: commandAvailable('tesseract'),
    ocrmypdf: commandAvailable('ocrmypdf'),
  },
  recommendation: 'paddleocr-primary-local-experiment',
  userVisibleActivation: false,
  status: 'dependency-inventory-only',
};

if (!report.options.paddleocr.executable.available && !report.options.paddleocr.pythonModule) {
  report.reviewFlags = ['paddleocr-not-installed'];
}
console.log(JSON.stringify(report, null, 2));
