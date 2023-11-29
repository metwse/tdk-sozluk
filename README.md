# TDK Sözlük
Sözlüğün 12. baskısının dijital versiyonunu TDK API'sinden \([/gts](https://sozluk.gov.tr/gts)\) çeker. API'de kelimeleri numaralarıyla doğrudan çekmek mümkün olmadığından [/autocomplete.json](https://sozluk.gov.tr/autocomplete.json)'u kullanır.

Örnek kullanım (src/ klasöründe):
```sh
node . ön-bellek -e 3 # Aynı anda 3 kelime indirerek TDK sözlüğü ön belleğe alır.
```
