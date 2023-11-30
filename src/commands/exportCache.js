module.exports = async ({ out }) => {
    if (!fs.existsSync(CACHE)) return console.log(`Önbellek bulunamadı.`)
    console.log(`${CACHE} konumundan ön bellek kaydedilecek.`)
    await tar.c({ gzip: true, file: out, cwd: CACHE }, fs.readdirSync(CACHE))
    console.log('Ön bellek kaydedildi.')
}
