Object.assign(global, { 
    tdk: require('./fetch-raw-data.js'),
    fs: require('fs'), os: require('os'), path: require('path')
})
const argv = require('minimist')(process.argv.slice(2))
require('./util.js')(global)

const COMMANDS = {
    'ön-bellek': {
        description: 'TDK sözlükteki ham verileri ön belleğe alır. Hızlı indirdiği için database kaydetme komutlarından önce kullanılması tavsiye edilir.',
        args: { 
            multi: { tr: ['eşzamanlı', 'e'], description: 'Aynı anda kaç kelimenin indirileceğini belirtir.', default: 5 } 
        },
        function: 'save' 
    },
    'json': {
        description: 'JSON veri tabanı olarak kaydeder. Daha fazla bilgi için README.md dosyasını okuyun.',
        args: { 
            out: { tr: ['çıktı', 'ç'], description: 'Çıktı dosyasının konumu.', default: 'tdk.tar.gz' }
        },
        function: 'json' 
    },
    'ön-belleği-temizle': {
        description: 'Geçici dosyalar klasöründeki ön belleği temizler.',
        function: 'clearCache' 
    }, 
    'lisans': {
        description: 'Lisans hakkında bilgi verir.',
        function: 'license'
    }
}


function help() {
    console.log('  TDK Sözlük Veri İndirici  Copyright (C) 2023  Metehan Selvi\nThis program comes with ABSOLUTELY NO WARRANTY.\nThis is free software, and you are welcome to redistribute it under certain conditions; visit\nhttps://github.com/metwse/tdk-sozluk/blob/main/LICENSE for details.\n\n')
    
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

//!async function () { console.log(await tdk.word('test')); process.exit() }()

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
