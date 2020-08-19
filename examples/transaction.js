import axios from 'axios';
import {walletFromMnemonic} from 'minterjs-wallet';
import {mPrefixToHex, convertToPip} from 'minterjs-util';
import config from './config.js';
import Tx from '../src/index.js';
import TxSignature from '../src/tx-signature.js';
import MinterSendTxData from '../src/tx-data/send.js';
import {TX_TYPE} from '../src/tx-types.js';

// mnemonic: exercise fantasy smooth enough arrive steak demise donkey true employ jealous decide blossom bind someone
// private: 5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da
// address: Mx7633980c000139dd3bd24a3f54e06474fa941e16

const WALLET = walletFromMnemonic('exercise fantasy smooth enough arrive steak demise donkey true employ jealous decide blossom bind someone')
const PRIVATE_KEY = WALLET.getPrivateKey();
const ADDRESS = WALLET.getAddressString();
const FORM_DATA = {
    address: 'Mx376615b9a3187747dc7c32e51723515ee62e37dc',
    amount: 1,
    coin: 0,
    payload: 'custom text',
};

function getNonce() {
    return axios.get(`${config.nodeUrl}/address/${ADDRESS}`)
        .then((response) => {
            return Number(response.data.transaction_count) + 1;
        });
}

export function postTx() {
    return getNonce()
        .then((nonce) => {
            const txData = new MinterSendTxData({
                to: mPrefixToHex(FORM_DATA.address),
                coin: FORM_DATA.coin,
                value: `0x${convertToPip(FORM_DATA.amount, 'hex')}`,
            });
            console.log('raw data', txData.raw);
            const txParams = {
                nonce: `0x${nonce.toString(16)}`,
                chainId: '0x01',
                gasPrice: '0x01',
                gasCoin: 0,
                type: TX_TYPE.SEND,
                data: txData.serialize(),
                signatureType: '0x01'
            };

            if (FORM_DATA.payload) {
                txParams.payload = `0x${Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')}`;
            }

            console.log({txParams});

            const tx = new Tx(txParams);
            console.log('raw tx', tx.raw);
            tx.signatureData = (new TxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();

            console.log('---Serialized TX----');
            console.log(tx.serialize().toString('hex'));
            console.log(`Senders Address: Mx${tx.getSenderAddress().toString('hex')}`);

            if (tx.verifySignature()) {
                console.log('Signature Checks out!');
            }

            return axios.get(`${config.nodeUrl}/send_transaction/0x${tx.serialize().toString('hex')}`)
                .then((response) => {
                    console.log('Tx send', response.data);
                })
                .catch((error) => {
                    console.log('send error', error.response ? error.response.data : error);
                    throw error;
                });
    });
}

// postTx();
