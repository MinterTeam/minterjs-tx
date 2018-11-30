## 3.1.0 - 2018-11-30
- fix `MinterTxDataCreateMultisig` to make it work
- provide exports to index.js

## 3.0.0 - 2018-11-29
- **BREAKING** remove converter (moved to `minterjs-util` package)
- add `MinterTxDataCreateMultisig`
- add tx types constants

## 2.0.0 - 2018-10-15
- **BREAKING** change tx structure to support MultiSig
- update dependencies

## 1.5.0 - 2018-08-21
- **BREAKING** rename tx-data fields according to [minter-go-node docs](https://minter-go-node.readthedocs.io/en/dev/transactions.html) 

## 1.4.0 - 2018-08-14
- **BREAKING** rename tx-data files: `sell-coin` -> `sell`, `sell-all-coin` -> `sell-all`, `buy-coin` -> `buy` 
- add `converter.bipToPip` and `converter.pipToBip` alias methods

## 1.3.0 - 2018-08-11
- **BREAKING** rename `unbound` to `unbond`, tx data and tx type are affected

## 1.2.0 - 2018-07-23
- add `gasCoin` field to the transaction


## 1.1.0 - 2018-07-20
- add `SellAllCoin` tx type
- update other tx type values
