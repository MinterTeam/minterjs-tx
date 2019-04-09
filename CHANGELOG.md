## 4.5.0 - 2019-04-09
- rename TX_TYPE_SELL_COIN -> TX_TYPE_SELL, TX_TYPE_SELL_ALL_COIN -> TX_TYPE_SELL_ALL, TX_TYPE_BUY_COIN -> TX_TYPE_BUY, previous values are now deprecated

## 4.4.0 - 2019-03-07
- add txTypeList

## 4.3.1 - 2019-02-28
- fix package.json "browser" field

## 4.3.0 - 2019-02-27
- add UMD and commonjs builds

## 4.2.2 - 2019-02-19
- expose `TX_TYPE_EDIT_CANDIDATE` in index.js
- update deps

## 4.2.1 - 2019-02-18
- update deps
- fix ethereumjs-util

## 4.2.0 - 2019-02-06
- add `MinterTxDataMultisend`

## 4.1.0 - 2019-01-15
- add new 0x0E `MinterTxDataEditCandidate` according to minter-go-node 0.10.0

## 4.0.0 - 2018-12-06
- **BREAKING** added new fields to convert data types to support new blockchain version "minter-test-network-27"
- add `minimumValueToBuy` to `MinterTxDataSell` and `MinterTxDataSellAll`
- add `maximumValueToSell` to `MinterTxDataBuy`

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
