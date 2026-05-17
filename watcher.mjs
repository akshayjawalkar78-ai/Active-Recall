import { execSync } from 'child_process';

const cwd = process.cwd();
const INTERVAL = 3000; // check every 3 seconds
let dirty = false;

// check for changes periodically
setInterval(() => {
  try {
    const status = execSync('git status --porcelain', { cwd, encoding: 'utf8' });
    if (status.trim()) {
      dirty = true;
    }
  } catch (_) { /* not a git repo */ }
}, 1000);

// commit + push when changes are detected (debounced)
setInterval(() => {
  if (!dirty) return;
  dirty = false;
  try {
    execSync('git add -A', { cwd, stdio: 'pipe' });
    execSync('git commit -m "auto-sync"', { cwd, stdio: 'pipe' });
    execSync('git push', { cwd, stdio: 'pipe' });
    console.log(`[${new Date().toLocaleTimeString()}] auto-synced`);
  } catch (_) { /* nothing to commit or push failed */ }
}, INTERVAL);

console.log('Watching for changes every 3s... (Ctrl+C to stop)');
