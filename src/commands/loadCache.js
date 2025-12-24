module.exports = async ({ input }) => {
  require('./clearCache.js')({ log: false })
  try { fs.mkdirSync(CACHE) } catch { }
  if (!fs.existsSync(input)) return console.log(`Dosya ${input} bulunamadı.`)
  console.log(`${CACHE} konumuna ön bellek yüklenecek.\n\n`)
  await tar.extract({ file: input, cwd: CACHE, onentry: file => { clearLine(); console.log(file.path) } })
  console.log('Ön bellek yüklendi.')
}
