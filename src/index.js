Object.assign(global, { 
    tdk: require('./fetch-raw-data.js'),
    fs: require('fs'), os: require('os'), path: require('path')
})
const argv = require('minimist')(process.argv.slice(2))
require('./util.js')(global)

const COMMANDS = {
    'veri': {
        description: 'TDK sözlükteki ham verileri indirir.',
        args: { 
            out: { tr: ['çıktı', 'ç'], description: 'Çıktı klasörünün konumu.', default: 'tdk' },
            tar: { tr: ['tar', 't'], description: 'Çıktı klasörünü tar arşivine çevirir.', default: false }
        },
        function: 'save' 
    },
    'ön-belleği-temizle': {
        description: 'Geçici dosyalar klasöründeki ön belleği temizler.',
        function: 'clearCache' 
    } 
}


function help() {
    console.log('tdk-sozluk\n\n')
    
    console.log('İŞLEVLER')
    for (const [name, data] of Object.entries(COMMANDS)) {
        console.log(`  ${name}\n    ${data.description}`)
        if (data.args) {
            for (const [arg, { tr, description, default: _default }] of Object.entries(data.args)) {
                console.log(`    ${tr.map(a => a.length == 1 ? `-${a}` : `--${a}`).join(', ')}`) 
                console.log(`      ${description} (Varsayılan: ${_default})`) 
            }
        }
        console.log('')
    }
}


const COMMAND = argv._[0]

/* Eğer bir komut girilmişse onu tespit eder.
 * Türkçe girdileri İngilizceye çevirir. Argümanları gerekirse varsayılan değerlerine atar, uygun fonksiyonu commands/ klasöründen yürütür.
 */
test: {
    for (const [name, opt] of Object.entries(COMMANDS)) {
        if (name.toLowerCase() == COMMAND?.toLowerCase()) {
            const args = {}

            if (opt.args) {
                const mapper = {}
                // Bağlayıcı için ön bellek. Hashmap fonksiyonu yazmak yerine JavaScript'inkini kullandım.
                for (const [arg, argOpt] of Object.entries(opt.args))
                    Object.assign(mapper, Object.fromEntries(argOpt.tr.map(t => [t, arg]))), args[arg] = argOpt.default

                for (const [arg, value] of Object.entries(argv)) { 
                    if (arg == '_') continue
                    const argName = mapper[arg]
                    if (!argName) throw `Bilinmeyen argüman: ${arg}`
                    args[argName] = value
                }
            }

            require(`./commands/${opt.function}.js`).bind(global)(args)
            break test
        }
    }
    help()
}
