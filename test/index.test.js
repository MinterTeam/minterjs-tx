import {Buffer} from 'safe-buffer';
import {mPrefixToHex} from 'minterjs-util';
import MinterSendTxData from '../src/tx-data/send';
import MinterTx from '../src/index';
import {TX_TYPE_SEND} from '../src/tx-types';
import converter from '../src/converter';
import {formatCoin} from '../src/helpers';
import decodeToArray from './decode-to-array';

const PRIVATE_KEY = new Buffer('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex');
const FORM_DATA = {
    address: 'Mx376615B9A3187747dC7c32e51723515Ee62e37Dc',
    amount: 1,
    coin: 'MNT',
    payload: 'custom text',
};

describe('tx', () => {
    const txData = (new MinterSendTxData({
        to: mPrefixToHex(FORM_DATA.address),
        coin: formatCoin(FORM_DATA.coin),
        value: `0x${converter.convert(FORM_DATA.amount, 'pip').toString(16)}`,
    })).serialize();

    const txParams = {
        nonce: '0x01',
        gasPrice: '0x01',
        gasCoin: formatCoin('MNT'),
        type: TX_TYPE_SEND,
        data: txData,
        payload: `0x${Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')}`,
    };
    const tx = new MinterTx(txParams);
    tx.sign(PRIVATE_KEY);
    const invalidTx = new MinterTx(txParams);
    // const serializedTx = tx.serialize();

    test('tx fields', () => {
        expect(decodeToArray(tx.serialize()))
            .toEqual([
                [1],
                [1],
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [1], [233, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 148, 55, 102, 21, 185, 163, 24, 119, 71, 220, 124, 50, 229, 23, 35, 81, 94, 230, 46, 55, 220, 136, 13, 224, 182, 179, 167, 100, 0, 0], [99, 117, 115, 116, 111, 109, 32, 116, 101, 120, 116], [], [27], [115, 183, 110, 160, 80, 22, 91, 151, 86, 2, 134, 97, 52, 116, 52, 255, 63, 172, 114, 251, 118, 73, 254, 231, 173, 69, 112, 179, 154, 64, 39, 52],
                [89, 100, 140, 19, 240, 87, 231, 195, 214, 98, 79, 109, 173, 21, 221, 206, 155, 181, 39, 84, 35, 137, 22, 80, 113, 63, 198, 113, 172, 155, 195, 228],
            ]);
    });

    test('tx hash', () => {
        expect(tx.hash().toString('hex')).toEqual('49ad95e73d92723cadd724406ed1568cd7aab73a38009d257ed4b1c5fdbbe751');
        expect(tx.hash(true).toString('hex')).toEqual('49ad95e73d92723cadd724406ed1568cd7aab73a38009d257ed4b1c5fdbbe751');
        expect(tx.hash(false).toString('hex')).toEqual('dd74f26a7be443d637220d560269cbbcf45e483023c46c19cec1d108101141fb');
    });

    test('tx verify signature', () => {
        expect(tx.verifySignature()).toEqual(true);
    });

    test('tx address', () => {
        expect(tx.getSenderAddress().toString('hex')).toEqual('7633980c000139dd3bd24a3f54e06474fa941e16');
        // improve coverage: getSenderAddress() second time takes value from cache
        expect(tx.getSenderAddress().toString('hex')).toEqual('7633980c000139dd3bd24a3f54e06474fa941e16');
    });

    test('tx public key', () => {
        expect(tx.getSenderPublicKey().toString('hex')).toEqual('f9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3cb8a015b8031d02e79456aedb361fa20ec1a119d6009e5c08e9d1eeb5b29ad92');
    });

    test('invalid tx public key', () => {
        expect(() => invalidTx.getSenderPublicKey()).toThrow();
    });

    test('tx validate boolean', () => {
        expect(tx.validate(false)).toEqual(true);
    });

    test('tx validate string', () => {
        expect(tx.validate(true)).toEqual('');
    });

    test('invalid tx', () => {
        expect(invalidTx.validate(false)).toEqual(false);
    });
});
