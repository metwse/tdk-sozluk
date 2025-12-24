import clearCache from './clearCache.js';
import { CACHE, clearLine } from '../util.js';

import fs from 'fs';
import tar from 'tar';


export default async function ({ input }) {
  clearCache({ log: false });
  if (!fs.existsSync(CACHE)) fs.mkdirSync(CACHE);
  if (!fs.existsSync(input)) return console.log(`Dosya ${input} bulunamadı.`);
  console.log(`${CACHE} konumuna ön bellek yüklenecek.\n\n`);
  await tar.extract({ file: input, cwd: CACHE, onentry: file => { clearLine(); console.log(file.path); } });
  console.log('Ön bellek yüklendi.');
}
