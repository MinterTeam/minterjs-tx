## 12.0.0 - 2022.04.12
- add `Lock` and `LockStake` tx data
- rename and deprecate `allowNonBinaryArray` field setting in favor of `isNonBinaryArray`
- add `storeNullAsArray` field setting in case if `allowNonBinaryArray` was used only for falsy values and truthy values was not stored as array
- add `forceDefaultValues` option to TxData constructor
- **BREAKING** add fields to VoteCommission tx data

## 11.1.0 - 2021.12.24
- Tx: add `getSenderAddressString` method

## 11.0.0 - 2021.12.01
- fix `tx.verifySignature()` for multi-signatures
- add `AddLimitOrder` and `RemoveLimitOrder` tx data
- **BREAKING** add fields to VoteCommission tx data

## 10.0.1 - 2021.04.13
- Fix VoteCommission tx data

## 10.0.0 - 2021.04.09
- add pool, token, vote and other v2 tx data types
- **BREAKING** remove deprecated aliases
- **BREAKING** rename `TxDataEditCoinOwner` to `TxDataEditTickerOwner` 
- Deprecate reexport of `TX_TYPE`, `txTypeList`, `normalizeTxType`, `coinToBuffer`, `bufferToCoin`. Instead, use minterjs-util directly.

## 9.0.0
Support of minter-go-node v1.2 aka Chili
- **BREAKING** change coin tickers to coin id. Affected: Tx, Buy, DeclareCandidacy, Delegate, Sell, SellAll, Send, Multisend, Unbond
- **BREAKING** add `controlAddress` field to EditCandidateData
- **BREAKING** remove `TX_TYPE_...` types, use `TX_TYPE` instead. E.g. replace `TX_TYPE_SEND` with `TX_TYPE.SEND`
- **BREAKING** remove `formatCoin`, use `coinToBuffer` instead 
- Deprecate `Minter` prefixed classes. E.g. use TxDataSend instead of MinterTxDataSend 
- Add `TxDataEditMultisig`, `TxDataSetHaltBlock`, `TxDataRecreateCoin`, `TxDataEditCoinOwner`, `TxDataPriceVote`, `TxDataEditCandidatePublicKey`
- Add `serializeToString()` method to Tx and TxData
- `TxData...` now can be initialized empty

## 8.2.1 - 2020-08-11
- cleanup deps

## 8.2.0 - 2020-08-07
- update deps

## 8.1.0 - 2020-05-31
- move tx-types and helpers to minterjs-util and reexport them back, it fixes cyclic dependency

## 8.0.0 - 2020-03-06
Support of minter-go-node v1.1 aka Texas
- fix `Tx` fields when multisignature is used 
- accept Mx prefixed besides 0x prefixed strings in `defineProperties`
- **BREAKING** rename data's `pubKey` fields to `publicKey`
- **BREAKING** rename data's `rawCheck` field to `check`
- add `maxSupply` field to `TxDataCreateCoin`

## 7.5.1
- export `TxMultisignature`

## 7.5.0
- revert `signatureData` as array of signatures
- add `TxMultisignature`

## 7.4.0
- support `signatureData` as array of signatures

## 7.3.0
- fix miltisig zero weights

## 7.2.2
- update deps
- minor refactoring

## 7.2.1
- fix `normalizeTxType` to work case insensitive

## 7.2.0
- add `normalizeTxType` method

## 7.1.2
- fix `defineProperties` with `allowNonBinaryArray` option 

## 7.1.1
- fix helper `bufferToCoin` returning UintArray instead of Buffer

## 7.1.0
- add `TxData` constructor, it can choose right `TxData...` depending on second argument `TX_TYPE`

## 7.0.2
- deprecate separate `TX_TYPE_...` in favor of `TX_TYPE` enum
- add `Tx...` named exports as alias to `MinterTx...`

## 7.0.1 - 2019-11-12
- deprecate `formatCoin`

## 7.0.0 - 2019-11-12
- **BREAKING** tx and tx-data string params can only be `0x` prefixed now, you have to use `Buffer.from(str, 'utf-8')` if you want pass arbitrary string
- update deps
- drop safe-buffer dependency

## 6.1.0 - 2019-08-01
- rename `formatCoin` to `coinToBuffer`, save old name as alias
- add `bufferToCoin` method

## 6.0.0 - 2019-07-30
- **BREAKING** rename UMD module from `minterJsTx` to `minterTx`
- fix browser usage of UMD module
- fix bundle tests

## 5.1.3 - 2019-07-08
- update deps

## 5.1.2 - 2019-06-05
- update deps

## 5.1.1 - 2019-05-14
- update deps

# 5.1.0 - 2019-05-14
- Moved: `defineProperties` from [minterjs-tx](https://github.com/MinterTeam/minterjs-tx) package

## 5.0.3 - 2019-05-14
- update deps

## 5.0.2 - 2019-04-17
- **BREAKING** rename `chainID` into `chainId`

## 5.0.1 - 2019-04-16
- fix tx hash

## 5.0.0 - 2019-04-12
- **BREAKING** add `chainID` tx param to support minter-go-node [0.19.0](https://github.com/MinterTeam/minter-go-node/releases/tag/v0.19.0)
- remove deprecated tx types

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
- add new 0x0E `MinterTxDataEditCandidate` according to minter-go-node [0.10.0](https://github.com/MinterTeam/minter-go-node/releases/tag/v0.10.0)

## 4.0.0 - 2018-12-06
- **BREAKING** added new fields to convert data types to support minter-go-node [0.8.0](https://github.com/MinterTeam/minter-go-node/releases/tag/v0.8.0)
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
- **BREAKING** rename tx-data fields

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
