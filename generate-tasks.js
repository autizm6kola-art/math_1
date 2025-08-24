const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, 'public', 'audio');
const outputFile = path.join(__dirname, 'public', 'tasks.json');

const pattern = /z_(\d+)(?:-(\d+))?\.mp3$/;

const files = fs.readdirSync(audioDir);

const tasks = files
  .filter(file => pattern.test(file))
  .map(file => {
    const match = file.match(pattern);
    const id = parseInt(match[1]);
    const correctAnswer = match[2] || "";
    return {
      id,
      audio: `/audio/${file}`,
      correctAnswer
    };
  });

fs.writeFileSync(outputFile, JSON.stringify(tasks, null, 2), 'utf-8');

console.log(`✅ tasks.json создан! Найдено ${tasks.length} файлов.`);
