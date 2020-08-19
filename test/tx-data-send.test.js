import {mPrefixToHex, convertToPip} from 'minterjs-util';
import {Tx, TxSignature, TxDataSend, TX_TYPE, coinToBuffer} from '~/src';

// exercise fantasy smooth enough arrive steak demise donkey true employ jealous decide blossom bind someone
const PRIVATE_KEY = new Buffer('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex');
const ADDRESS = 'Mx7633980c000139dd3bd24a3f54e06474fa941e16';
const FORM_DATA = {
    address: 'Mx376615B9A3187747dC7c32e51723515Ee62e37Dc',
    amount: 1,
    coin: 0,
    payload: 'custom text',
};

describe('tx send', () => {
    const txData = (new TxDataSend({
        to: mPrefixToHex(FORM_DATA.address),
        coin: FORM_DATA.coin,
        value: `0x${convertToPip(FORM_DATA.amount, 'hex')}`,
    })).serialize();

    test('tx signature', () => {
        const VALID_SIGNATURE = 'f87b0101018001a0df8094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ca0114adc1e60dc78b90b77b2d9a105cae71aa4facc21aaabc33d6f5c34b782547aa02eac4a0044b9c12375b9e8a22505cc3e58d1f8559be08385e49347be36139555';
        const txParams = {
            nonce: '0x01',
            chainId: '0x01',
            gasPrice: '0x01',
            gasCoin: 0,
            type: TX_TYPE.SEND,
            data: txData,
            payload: `0x${Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')}`,
            signatureType: '0x01',
        };
        const tx = new Tx(txParams);
        tx.signatureData = (new TxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE);
    });

    test('tx2 signature', () => {
        const VALID_SIGNED_TX = 'f8700801018001a0df8094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a7640000808080b845f8431ba0ffcd56fb14a4308cc26edced8ec06a13f57fae3251b04f57dbb5724ef4bbdccda0411f083dd5bc356daede53d5adee487b61d29a9e45157233a50df377942524c8';
        const txParams = {
            nonce: '0x08',
            chainId: '0x01',
            gasPrice: '0x01',
            gasCoin: 0,
            type: TX_TYPE.SEND,
            data: txData,
        };
        const tx = new Tx(txParams);
        tx.signatureData = (new TxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNED_TX);
    });
});

/** @see https://github.com/MinterTeam/minter-php-sdk/blob/master/tests/MinterSendCoinTxTest.php */
describe('tx send (php test)', () => {
    const PHP_PRIVATE_KEY = new Buffer('b574d2a7151fcf0df573feae58015f85f6ebf38ea4b38c49196c6aceee27e189', 'hex');
    const TO_ADDRESS = 'Mxfe60014a6e9ac91618f5d1cab3fd58cded61ee99';

    // to: '0xfe60014a6e9ac91618f5d1cab3fd58cded61ee99',
    // coin: <Buffer >,
    // value: '0x5f5e100'
    const txData = {
        to: mPrefixToHex(TO_ADDRESS),
        coin: 0,
        value: `0x${convertToPip(1, 'hex')}`,
    };
    const txParams = {
        nonce: '0x01',
        gasPrice: '0x01',
        gasCoin: 0,
        type: TX_TYPE.SEND,
        data: (new TxDataSend(txData)).serialize(),
        signatureType: '0x01',
    };

    const tx = new Tx(txParams);
    tx.signatureData = (new TxSignature()).sign(tx.hash(false), PHP_PRIVATE_KEY).serialize();

    test('tx signature', () => {
        const VALID_SIGNED_TX = 'f8700180018001a0df8094fe60014a6e9ac91618f5d1cab3fd58cded61ee99880de0b6b3a7640000808001b845f8431ca0162716f7786cec5ebe82bced83240fc159b57d01ae205ad4f1105fc7a1f75374a05079ef73cbb04cb43592d405067de2399d02ba6bdc180f95f698d2ba39f6e285';
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNED_TX);
    });
});
