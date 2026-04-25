import fs from 'fs';
import path from 'path';
let content = fs.readFileSync('lint_err.json', 'utf16le');
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.slice(1);
}
const data = JSON.parse(content);
for (const res of data) {
  if (res.errorCount > 0 || res.warningCount > 0) {
    console.log(res.filePath);
    res.messages.forEach(m => console.log(`  ${m.line}:${m.column} ${m.message}`));
  }
}
