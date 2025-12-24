const fetch = require('node-fetch')
const fs = require('fs')
require('./util.js')(global)

const API_HEADERS = { 'User-Agent': 'APIs-Google (+https://developers.google.com/webmasters/APIs-Google.html)' }

// İsteklerin kaydı ön bellek klasöründe varsa internetten indirmek yerine oradaki dosyaları kullanır.
const get = async url => {
  return new Promise(r => {
    // İsteklerdeki eğik çizgileri klasörlere çevirmektense URI'leri hashlemeyi mantıklı buldum.
    fs.readFile(cfile(url), 'utf8', async (err, data) => {
      if (err) {
        const text = await fetch(url, { headers: API_HEADERS }).then(r => r.text())
        try {
          r(JSON.parse(text))
          fs.writeFile(cfile(url), text, () => null)
        } catch { return r({ error: 'JSON' }) }
      }
      else r(JSON.parse(data))
    })
  })

}

async function word(word) {
  const data = await get(`https://sozluk.gov.tr/gts?ara=${encodeURI(word)}`)
  return data.error ? false : data
}

async function wordList() {
  const data = []
  for (let word of await get(`https://sozluk.gov.tr/autocomplete.json`)) if (word.madde) data.push(word.madde)
  return data
}


module.exports = { wordList, word }
