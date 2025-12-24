import { clearLine, clearLines } from '../util.js';
import { getWordList, getWord } from '../fetch-raw-data.js';


export default async function (args) {
  console.log('Kelime listesi indiriliyor...');
  const data = await getWordList();
  clearLine();

  console.log(`${data.length} kelime indirilecek.\n`);

  for (let i = 0; i < data.length; i += args.multi) {
    let clear = 0;
    await Promise.all(new Array(args.multi).fill(0).map(async (_, o) => {
      if (i + o <= data.length) {
        console.log(`${i + o + 1} / ${data.length}: ${data[i + o]}`);
        await getWord(data[i + o]);
        clear++;
      }
      else return;
    }));
    clearLines(clear);
  }

  console.log('Veriler ön belleğe alındı.');
}
