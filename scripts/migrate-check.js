#!/usr/bin/env node

var execSync = require('child_process').execSync;

function log(msg) { console.log(msg); }
function red(s)    { return '\x1b[31m' + s + '\x1b[0m'; }
function green(s) { return '\x1b[32m' + s + '\x1b[0m'; }
function yellow(s){ return '\x1b[33m' + s + '\x1b[0m'; }
function cyan(s)  { return '\x1b[36m' + s + '\x1b[0m'; }

try {
  var out = execSync('npm ls trim --all --parseable 2>/dev/null', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  var lines = out.trim().split('\n').filter(Boolean);

  if (lines.length === 0) {
    log('\n  ' + green('\u2713') + '  trim-safe OK — no vulnerable trim found in your dependency tree.');
    return;
  }

  log('\n  ' + red('\u26A0') + '  ' + red('VULNERABLE: trim (CVE-2020-7753) found in dependency tree'));
  log('  ' + lines.length + ' package' + (lines.length === 1 ? '' : 's') + ' still depend on the vulnerable trim package.\n');

  var unique = {};
  lines.forEach(function(l) {
    var parts = l.split('node_modules/');
    var pkg = parts[parts.length - 1];
    if (pkg && pkg !== 'trim') unique[pkg] = true;
  });
  var names = Object.keys(unique).filter(Boolean);

  if (names.length > 0 && names.length <= 20) {
    log('  Direct dependents: ' + names.join(', '));
    log('');
  }

  log('  ' + cyan('Migrate:'));
  log('    npm install trim-safe');
  log('    # in your code: require(\'trim-safe\') instead of require(\'trim\')');
  log('');
} catch (e) {
  try {
    var out2 = execSync('npm ls trim 2>/dev/null', { encoding: 'utf8' });
    if (out2 && out2.includes('trim@')) {
      log(yellow('\n  trim found in dependency tree — run "npm install trim-safe" to migrate.\n'));
    }
  } catch (e2) {}
}
