const crypto = require('crypto')
const fs = require('fs'), os = require('os'), path = require('path')

const CACHE = `${os.tmpdir()}/tdk-cache/`
const hash = data => crypto.createHash('md5').update(data).digest('hex');

try { fs.mkdirSync(CACHE) } catch { }

module.exports = g => {
    g.CACHE = CACHE
    g.hash = data => crypto.createHash('md5').update(data).digest('hex');
    g.cfile = f => path.join(CACHE, hash(f))
    g.clearLine = () => (process.stdout.moveCursor(0, -1), process.stdout.clearLine(1))
    g.clearLines = count => {
        for (let i = 0; i < count; i++) g.clearLine()
    }
}
