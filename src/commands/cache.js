module.exports = async args => {
    console.log('Kelime listesi indiriliyor...')
    const data = await tdk.wordList()
    clearLine()
    console.log(`${data.length} kelime indirilecek.\n`)
    
    for (let i = 0; i < data.length; i += args.multi) {
        clear = 0
        await Promise.all(new Array(args.multi).fill(0).map(async (_, o) => { 
            if (i + o <= data.length) { 
                console.log(`${i + o + 1} / ${data.length}: ${data[i + o]}`)
                await tdk.word(data[i + o])
                clear++
            }
            else return
        }))
        clearLines(clear)
    }

    console.log('Veriler ön belleğe alındı.')
}
