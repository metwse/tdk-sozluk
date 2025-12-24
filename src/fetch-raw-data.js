import { cfile } from './util.js';

import fs from 'node:fs';


// İsteklerin kaydı ön bellek klasöründe varsa internetten indirmek yerine oradaki dosyaları kullanır.
async function get(url) {
  return new Promise(r => {
    // İsteklerdeki eğik çizgileri klasörlere çevirmektense URI'leri hashlemeyi mantıklı buldum.
    fs.readFile(cfile(url), 'utf8', async (err, data) => {
      if (err) {
        const text = await fetch(url)
          .then(r => r.text());
        try {
          r(JSON.parse(text));
          fs.writeFile(cfile(url), text, () => null);
        } catch {
          return r({ error: 'JSON' });
        }
      }
      else r(JSON.parse(data));
    });
  });
}

export async function getWord(word) {
  const data = await get(`https://sozluk.gov.tr/gts?ara=${encodeURI(word)}`);
  return data.error ? false : data;
};

export async function getWordList() {
  const data = new Set();
  for (let word of await get(`https://sozluk.gov.tr/autocomplete.json`)) if (word.madde) data.add(word.madde);
  return Array.from(data);
};
