import { watch } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

const cwd = resolve('.');
let timer = null;

watch(cwd, { recursive: true }, (event, filename) => {
  if (filename && filename.startsWith('.git')) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    try {
      execSync('git add -A', { cwd, stdio: 'pipe' });
      execSync('git commit -m "auto-sync"', { cwd, stdio: 'pipe' });
      execSync('git push', { cwd, stdio: 'pipe' });
      console.log(`[${new Date().toLocaleTimeString()}] auto-synced`);
    } catch (_) { /* no changes to commit */ }
  }, 2000);
});

console.log('Watching for changes... (Ctrl+C to stop)');
