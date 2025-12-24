import crypto from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';


export const CACHE = `${os.tmpdir()}/tdk-cache/`;


if (!fs.existsSync(CACHE))
  fs.mkdirSync(CACHE);


export function hash(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

export function cfile(f) {
  return path.join(CACHE, hash(f));
}

export function clearLine() {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(1);
}

export function clearLines(count) {
  for (let i = 0; i < count; i++)
    clearLine();
}
