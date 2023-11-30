const TMP = path.join(CACHE, 'rofi-tdk')

const escape = t => t.replace(/\n/, '\\n')
function serializeWord(word) {
    var data = '', hasAlternative = {}, alternativeId = {}
    for (const { madde } of word) {
        if (hasAlternative[madde] == undefined) hasAlternative[madde] = false
        else { hasAlternative[madde] = true; alternativeId[madde] = 1 }
    }
    for (const madde of word) {
        if (hasAlternative[madde.madde]) { data += `k${alternativeId[madde.madde]}\n`; alternativeId[madde.madde] ++ }
        data +=  `t${madde.taki ?? ''}\nm${madde.madde}\nl${madde.lisan ?? ''}\nb${madde.birlesikler ?? ''}\n`
        if (madde.atasozu) data += `s${madde.atasozu.map(m => m.madde).join('|')}\n`
        if (!madde.anlamlarListe) continue
        for (const anlam of madde.anlamlarListe) {
            if (!anlam.ozelliklerListe) anlam.ozelliklerListe = []
            if (+anlam.fiil) anlam.ozelliklerListe.push({ tam_adi: 'fiil' })
            if (anlam.ozelliklerListe.length) data += `z${anlam.ozelliklerListe.map(v => v.tam_adi).join(', ')}\n`
            data += `a${escape(anlam.anlam)}\n` 

            if (anlam.orneklerListe) { 
                for (const ornek of anlam.orneklerListe) {
                    if (ornek.yazar) data += `y${ornek.yazar[0].tam_adi}\n`
                    data += `o${ornek.ornek}\n` 
                }
            }
        }
        data += '\n'
    }
    return data
}

function rmtemp() {
    if (!fs.existsSync(TMP)) return
    for (const file of fs.readdirSync(TMP)) fs.rmSync(path.join(TMP, file))
    fs.rmdirSync(TMP)
}

module.exports = async ({ out }) => {
    try { rmtemp(); fs.mkdirSync(TMP) } catch { return console.log('Geçici klasör oluşturulamadı.') }

    console.log('Kelime listesi indiriliyor...')
    const data = await tdk.wordList()
    fs.writeFileSync(path.join(TMP, 'list'), data.join('\n'), 'utf-8')
    clearLine()
    console.log(`${data.length} kelime işlenecek.\n\n`)

    for (let i = 0; i < data.length; i++) {
        let word = data[i]
        clearLine()
        console.log(`${i + 1} / ${data.length}: ${word}`)
        const raw = await tdk.word(word)
        if (!raw) continue
        fs.writeFileSync(path.join(TMP, hash(word)), serializeWord(raw), 'utf-8')
    }
    clearLine()
    console.log('Veri işlendi.')
    console.log('Tar arşivi oluşturuluyor...')
    await tar.c({ gzip: true, file: out, cwd: TMP }, fs.readdirSync(TMP))
    clearLine()
    console.log('Tar arşivi oluşturuldu.')
    rmtemp()
}
