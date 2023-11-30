# TDK Sözlük
Sözlüğün 12. baskısının dijital versiyonunu TDK API'sinden \([/gts](https://sozluk.gov.tr/gts)\) çeker. API'de kelimeleri numaralarıyla doğrudan çekmek mümkün olmadığından [/autocomplete.json](https://sozluk.gov.tr/autocomplete.json)'u kullanır.

```sh
# Örnek kullanım (src/ klasöründe):
node . ön-bellek -e 16 # Aynı anda 16 kelime indirerek TDK sözlüğü ön belleğe alır. Aynı anda 16'dan fazla kelime indirmenizi tavsiye etmem, sozluk.gov.tr IP'nizi engeller.

# Tar dosyası şeklinde kaydedilmiş bir ön belleği yüklemek için:
node . ön-belleği-yükle -g /path/to/tdk.tar.gz
```
Komutlar hakkında daha fazla bilgi için `node .` yazabilirsiniz.

Veri indirici TDK'nin web sitesini epey yoruyor. Tavsiyem, indirilmiş ön bellek dosyasını kullanmak olacaktır.
