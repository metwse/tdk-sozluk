module.exports = async args => {
    console.log('Kelime listesi indiriliyor...')
    const data = await tdk.wordList()
    clearLine()
    console.log(`${data.length} kelime indirilecek.\n`)

    for (const [index, word] of Object.entries(data)) {
        clearLine()
        console.log(`${+index + 1} / ${data.length}: ${word}`)
        await tdk.word(word)
    }
}
