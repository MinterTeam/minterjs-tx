# minterjs-tx

[![NPM Package](https://img.shields.io/npm/v/minterjs-tx.svg?style=flat-square)](https://www.npmjs.org/package/minterjs-tx)
[![Build Status](https://img.shields.io/travis/MinterTeam/minterjs-tx.svg?style=flat-square)](https://travis-ci.org/MinterTeam/minterjs-tx)
[![Coverage Status](https://img.shields.io/coveralls/github/MinterTeam/minterjs-tx/master.svg?style=flat-square)](https://coveralls.io/github/MinterTeam/minterjs-tx?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/MinterTeam/minterjs-tx/blob/master/LICENSE)

## Warning
This module is LOW LEVEL and not supposed to be used by regular developers. It is supposed to be used inside SDKs or for advanced use cases.

Consider using [minter-js-sdk](https://github.com/MinterTeam/minter-js-sdk) to have full-featured solution.

## About
A low level module for creating, manipulating and signing Minter transactions.

It is complemented by the following packages:
- [minter-js-sdk](https://github.com/MinterTeam/minter-js-sdk) complete JS solution to work with Minter
- [minterjs-wallet](https://github.com/MinterTeam/minterjs-wallet) to create wallet
- [minterjs-util](https://github.com/MinterTeam/minterjs-util) utility functions

## Install

```npm install minterjs-tx```

or from browser

```html
<script src="https://unpkg.com/minterjs-tx"></script>
<script>
const txData = minterTx.MinterTxDataSend(...);
const tx = minterTx.MinterTx(...);
</script>
```

## Usage

### Full example

[example](https://github.com/MinterTeam/minterjs-tx/blob/master/examples/transaction.js)

```js
import Tx from 'minterjs-tx';
import TxSignature from 'minterjs-tx/src/tx-signature';
import TxDataSend from 'minterjs-tx/src/tx-data/send';
import {TX_TYPE} from 'minterjs-tx/src/tx-types';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

// make tx data
const txData = new TxDataSend({
    to: '0x0000000000000000000000000000000000000000',
    coin: coinToBuffer('BIP'),
    value: `0x01`,
});

// make tx
const tx = new Tx({
    nonce: '0x01',
    chainId: '0x01',
    gasPrice: '0x01',
    gasCoin: coinToBuffer('BIP'), 
    type: TX_TYPE.SEND,
    data: txData.serialize(),
    signatureType: '0x01',
});

// sign tx
const privateKey = Buffer.from('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex');
tx.signatureData = (new TxSignature()).sign(tx.hash(false), privateKey).serialize();

// get signed tx string
const serializedTx = tx.serialize().toString('hex');

// post tx to blockchain
fetch(`https://minter-node-1.testnet.minter.network/send_transaction?tx=0x${serializedTx}`)
    .then((response) => {
        console.log('Success!', response.json());
    });

```


### Initialization
```js
import Tx from 'minterjs-tx';

const tx = new Tx(txParams);
```

### Tx params
All tx params can be passed as Buffer or Hex string

- `nonce` - int, used for prevent transaction reply (count of txs for this private key + 1)
- `chainId' - int, identify network type, 0x01 - mainnet, 0x02 - testnet
- `gasPrice` - big int, used for managing transaction fees
- `gasCoin` - symbol of a coin to pay fee
- `type` - type of transaction (see below).
- `data` - data of transaction (depends on transaction type, see below).
- `payload` (arbitrary bytes) - arbitrary user-defined bytes, e.g. tx message
- `serviceData` - reserved field.
- ECDSA fields (`r`, `s` and `v`) - digital signature of transaction


### Methods

#### `.sign(privateKey)`
Sign a transaction with a given private key.
`privateKey` - 32 bytes Buffer.

```js
tx.sign(privateKey);
```

#### `.verifySignature()`
Determines if the signature is valid.
Returns boolean.

```js
const isValid = tx.verifySignature();
```

#### `.validate(stringError)`
Validates the signature.
`stringError` - whether to return a string with a description of why the validation failed.
Return boolean or string with errors.

```js
const isValid = tx.validate();
const validationErrors = tx.validate(true);
```

#### `.hash(includeSignature)`
Computes a sha3-256 hash of the serialized tx.
`includeSignature` - whether or not to include the signature, default true.
Returns Buffer.

```js
// hash of tx with signature
const hash = tx.hash();
// hash of tx without signature
const hashWithoutSignature = tx.hash(false);
```

#### `.getSenderAddress()`
Returns the sender's address.
Returns Buffer.

```js
const address = tx.getSenderAddress();
```

#### `.getSenderPublicKey()`
Returns the sender's public key.
Returns Buffer.

```js
const publicKey = tx.getSenderPublicKey();
```


### Tx types
`TX_TYPE.SEND`:              `'0x01'`
`TX_TYPE.SELL`:              `'0x02'`
`TX_TYPE.SELL_ALL`:          `'0x03'`
`TX_TYPE.BUY`:               `'0x04'`
`TX_TYPE.CREATE_COIN`:       `'0x05'`
`TX_TYPE.DECLARE_CANDIDACY`: `'0x06'`
`TX_TYPE.DELEGATE`:          `'0x07'`
`TX_TYPE.UNBOND`:            `'0x08'`
`TX_TYPE.REDEEM_CHECK`:      `'0x09'`
`TX_TYPE.SET_CANDIDATE_ON`:  `'0x0A'`
`TX_TYPE.SET_CANDIDATE_OFF`: `'0x0B'`
`TX_TYPE.CREATE_MULTISIG`:   `'0x0C'`
`TX_TYPE.MULTISEND`:         `'0x0D'`
`TX_TYPE.EDIT_CANDIDATE`:    `'0x0E'`

### Tx data

#### common
Select right `TxData...` constructor depending on `TX_TYPE`

```js
import {toBuffer, convertToPip} from 'minterjs-util';
import TxData from 'minterjs-tx/src/tx-data';
import {TX_TYPE} from 'minterjs-tx/src/tx-types';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxData({
   coin: coinToBuffer('MNT'),
   to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
   value: `0x${convertToPip(10, 'hex')}`,
}, TX_TYPE.SEND);
```

#### Send
```js
import {toBuffer, convertToPip} from 'minterjs-util';
import TxDataSend from 'minterjs-tx/src/tx-data/send';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataSend({
   coin: coinToBuffer('MNT'),
   to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
   value: `0x${convertToPip(10, 'hex')}`,
});
```

#### Multisend
```js
import {toBuffer, convertToPip} from 'minterjs-util';
import TxDataMultisend from 'minterjs-tx/src/tx-data/send';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataMultisend({
    list: [
        {
           coin: coinToBuffer('MNT'),
           to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
           value: `0x${convertToPip(10, 'hex')}`,
        },
        {
           coin: coinToBuffer('MNT'),
           to: toBuffer('Mxddab6281766ad86497741ff91b6b48fe85012e3c'),
           value: `0x${convertToPip(2, 'hex')}`,
        },
    ]
});
```

#### Sell
```js
import {convertToPip} from 'minterjs-util';
import TxDataSell from 'minterjs-tx/src/tx-data/sell';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataSell({
   coinToSell: coinToBuffer('MNT'),
   valueToSell: `0x${convertToPip(10, 'hex')}`,
   coinToBuy: coinToBuffer('BELTCOIN'),
   minimumValueToBuy: `0x${convertToPip(1, 'hex')}`,
});

// minimumValueToBuy define minimum amount of coins to get, e.g. BELTCOIN in code above
```

#### Sell All
```js
import {convertToPip} from 'minterjs-util';
import TxDataSellAll from 'minterjs-tx/src/tx-data/sell-all';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataSellAll({
   coinToSell: coinToBuffer('MNT'),
   coinToBuy: coinToBuffer('BELTCOIN'),
   minimumValueToBuy: `0x${convertToPip(1, 'hex')}`,
});

// minimumValueToBuy define minimum amount of coins to get, e.g. BELTCOIN in code above
```

#### Buy
```js
import {convertToPip} from 'minterjs-util';
import TxDataBuy from 'minterjs-tx/src/tx-data/buy';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataBuy({
   coinToBuy: coinToBuffer('MNT'),
   valueToBuy: `0x${convertToPip(10, 'hex')}`,
   coinToSell: coinToBuffer('BELTCOIN'),
   maximumValueToSell: `0x${convertToPip(100, 'hex')}`,
});
 
// maximumValueToSell define maximum amount of coins to sell, e.g. BELTCOIN in code above
```

#### Create Coin
```js
import {convertToPip} from 'minterjs-util';
import TxDataCreateCoin from 'minterjs-tx/src/tx-data/create-coin';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataCreateCoin({
   name: 'My coin',
   symbol: coinToBuffer('MYCOIN'),
   initialAmount: `0x${convertToPip(10, 'hex')}`,
   initialReserve: `0x${convertToPip(50, 'hex')}`,
   constantReserveRatio: 100,
});
```

#### Declare Candidacy
```js
import {toBuffer, convertToPip} from 'minterjs-util';
import TxDataDeclareCandidacy from 'minterjs-tx/src/tx-data/declare-candidacy';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataDeclareCandidacy({
   address: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
   publicKey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
   commission: 10,
   coin: coinToBuffer('MNT'),
   stake: `0x${convertToPip(1000, 'hex')}`,
});
```

#### Edit Candidacy
```js
import {toBuffer} from 'minterjs-util';
import TxDataEditCandidate from 'minterjs-tx/src/tx-data/declare-candidacy';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataEditCandidate({
   ownerAddress: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
   rewardAddress: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
   publicKey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
});
```

#### Delegate
```js
import {toBuffer, convertToPip} from 'minterjs-util';
import TxDataDelegate from 'minterjs-tx/src/tx-data/delegate';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataDelegate({
   publicKey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
   coin: coinToBuffer('MNT'),
   stake: `0x${convertToPip(1000, 'hex')}`,
});
```

#### Unbond
```js
import {toBuffer, convertToPip} from 'minterjs-util';
import TxDataUnbond from 'minterjs-tx/src/tx-data/unbond';
import {coinToBuffer} from 'minterjs-tx/src/helpers';

const txData = new TxDataUnbond({
   publicKey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
   coin: coinToBuffer('MNT'),
   stake: `0x${convertToPip(1000, 'hex')}`,
});
```

#### Redeem Check
```js
import {toBuffer} from 'minterjs-util';
import TxDataRedeemCheck from 'minterjs-tx/src/tx-data/redeem-check';

const txData = new TxDataRedeemCheck({
   check: toBuffer('Mcf89f01830f423f8a4d4e5400000000000000888ac7230489e80000b841ada7ad273bef8a1d22f3e314fdfad1e19b90b1fe8dc7eeb30bd1d391e89af8642af029c138c2e379b95d6bc71b26c531ea155d9435e156a3d113a14c912dfebf001ca0781a7b7d781634bcf632579b99d583887ab093dfbd50b65de5c0e5813028a277a071272d8e1be721f5307f40f87daa4ab632781640f18fd424839396442cc7ff17'),
   proof: Buffer.from('7f8b6d3ed18d2fe131bbdc9f9bce3b96724ac354ce2cfb49b4ffc4bd71aabf580a8dfed407a34122e45d290941d855d744a62110fa1c11448078b13d3117bdfc01', 'hex'),
});
```

#### Set Candidate On
```js
import {toBuffer} from 'minterjs-util';
import TxDataSetCandidateOn from 'minterjs-tx/src/tx-data/set-candidate-on';

const txData = new TxDataSetCandidateOn({
   publicKey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
});
```

#### Set Candidate Off
```js
import {toBuffer} from 'minterjs-util';
import TxDataSetCandidateOff from 'minterjs-tx/src/tx-data/set-candidate-off';

const txData = new TxDataSetCandidateOff({
   publicKey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
});
```

#### Create Multisig Address
```js
import {toBuffer} from 'minterjs-util';
import TxDataCreateMultisig from 'minterjs-tx/src/tx-data/create-multisig';

const txData = new TxDataCreateMultisig({
   addresses: [toBuffer('Mxee81347211c72524338f9680072af90744333146'), toBuffer('Mxee81347211c72524338f9680072af90744333145'), toBuffer('Mxee81347211c72524338f9680072af90744333144')],
   weights: [1, 3, 5],
   threshold: 7,
});
```


## License

MIT License
