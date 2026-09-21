const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const NOTES_DIR = path.join(ROOT, 'notes');
const OUTPUT = path.join(ROOT, 'notes.json');

function parseFrontmatter(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { meta: {}, content: text };

  const meta = {};
  match[1].split('\n').forEach(function (line) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) {
      meta[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  });
  return { meta: meta, content: match[2] };
}

function main() {
  if (!fs.existsSync(NOTES_DIR)) {
    console.log('notes/ 目录不存在，生成空索引。');
    fs.writeFileSync(OUTPUT, '[]\n');
    return;
  }

  const files = fs.readdirSync(NOTES_DIR).filter(function (f) {
    return f.endsWith('.md') && !f.startsWith('.');
  });

  const notes = files.map(function (file) {
    const text = fs.readFileSync(path.join(NOTES_DIR, file), 'utf-8');
    const parsed = parseFrontmatter(text);
    const id = file.replace(/\.md$/, '');

    return {
      id: id,
      file: 'notes/' + file,
      title: parsed.meta.title || id,
      date: parsed.meta.date || '',
      tag: parsed.meta.tag || '',
      summary: parsed.meta.summary || ''
    };
  });

  notes.sort(function (a, b) {
    return (b.date || '').localeCompare(a.date || '');
  });

  fs.writeFileSync(OUTPUT, JSON.stringify(notes, null, 2) + '\n');
  console.log('已生成 notes.json，共 ' + notes.length + ' 篇。');
}

main();