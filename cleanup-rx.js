/**
 * Cleanup script — remove all SVG rx="..." attributes from v2 pages
 * Run: node cleanup-rx.js
 */
const fs = require('fs');
const path = require('path');

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const fp = path.join(dir, f);
    let html = fs.readFileSync(fp, 'utf8');
    const before = html;
    // Remove rx="..." from SVG rect elements
    html = html.replace(/ rx="[^"]*"/g, '');
    if (html !== before) {
      fs.writeFileSync(fp, html);
      count++;
      const removed = (before.match(/ rx="[^"]*"/g) || []).length;
      console.log('  ' + f + ' (' + removed + ' rx removed)');
    }
  });
  return count;
}

console.log('--- pages-v2/gestionnaire ---');
const g = cleanDir(path.join(__dirname, 'pages-v2', 'gestionnaire'));
console.log('--- pages-v2/prestataire ---');
const p = cleanDir(path.join(__dirname, 'pages-v2', 'prestataire'));
console.log('--- pages-v2/societe ---');
const s = cleanDir(path.join(__dirname, 'pages-v2', 'societe'));
console.log('--- pages-v2/medecin ---');
const m = cleanDir(path.join(__dirname, 'pages-v2', 'medecin'));

console.log('\nCleaned ' + (g + p + s + m) + ' files — all rx attributes removed');
