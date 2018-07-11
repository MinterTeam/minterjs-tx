# Minter JS TX

[![NPM Package](https://img.shields.io/npm/v/minterjs-tx.svg?style=flat-square)](https://www.npmjs.org/package/minterjs-tx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/MinterTeam/minterjs-tx/blob/master/LICENSE)

A simple module for creating, manipulating and signing Minter transactions.

It is complemented by the following packages:
- [minter-js-sdk](https://github.com/MinterTeam/minter-js-sdk) complete JS solution to work with Minter
- [minterjs-wallet](https://github.com/MinterTeam/minterjs-wallet) to create wallet

## Install

`npm install ethereumjs-tx`

## Usage

  - [example](https://github.com/MinterTeam/minterjs-tx/blob/master/examples/transaction.js)

```javascript
import MinterTx from 'minterjs-tx';
import MinterSendTxData from 'minterjs-tx/src/data/send';
import {TX_TYPE_SEND} from 'minterjs-tx/src/tx-types';
const privateKey = Buffer.from('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex');

const txData = new MinterSendTxData({
    to: '0x0000000000000000000000000000000000000000',
    coin: '4d4e5400000000000000',
    value: `0x01`,
});
const txParams = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000', 
    type: TX_TYPE_SEND,
    data: txData.serialize(),
};

const tx = new MinterTx(txParams);
tx.sign(privateKey);
const serializedTx = tx.serialize();
```

## License

MIT License
