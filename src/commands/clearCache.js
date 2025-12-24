import { CACHE } from '../util.js';

import fs from 'node:fs';
import path from 'node:path';


export default async function ({ log }) {
  try {
    for (const file of fs.readdirSync(CACHE)) fs.rmSync(path.join(CACHE, file));
    fs.rmdirSync(CACHE);
  } catch {
    if (log === false) return;
    if (fs.existsSync(CACHE)) console.log('Ön bellek silinemedi.');
      else console.log('Ön bellek temizlendi.');
  }
}
