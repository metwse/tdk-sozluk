module.exports = () => {
    try {
        for (const file of fs.readdirSync(CACHE)) fs.rmSync(path.join(CACHE, file))
        fs.rmdirSync(CACHE)
    } catch {}
    if (fs.existsSync(CACHE)) console.log('Ön bellek silinemedi.')
    else console.log('Ön bellek temizlendi.')
}
