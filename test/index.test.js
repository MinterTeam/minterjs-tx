import {Buffer} from 'safe-buffer';
import {mPrefixToHex, convertToPip} from 'minterjs-util';
import {MinterTx, MinterTxSignature, MinterTxDataSend, TX_TYPE_SEND, formatCoin} from '~/src';
import decodeToArray from './decode-to-array';

const PRIVATE_KEY = new Buffer('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex');
const FORM_DATA = {
    address: 'Mx376615B9A3187747dC7c32e51723515Ee62e37Dc',
    amount: 1,
    coin: 'MNT',
    payload: 'custom text',
};

describe('tx', () => {
    const txData = (new MinterTxDataSend({
        to: mPrefixToHex(FORM_DATA.address),
        coin: formatCoin(FORM_DATA.coin),
        value: `0x${convertToPip(FORM_DATA.amount, 'hex')}`,
    })).serialize();

    const txParams = {
        nonce: '0x01',
        gasPrice: '0x01',
        gasCoin: formatCoin('MNT'),
        type: TX_TYPE_SEND,
        data: txData,
        payload: `0x${Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')}`,
        signatureType: '0x01',
    };
    const tx = new MinterTx(txParams);
    tx.signatureData = (new MinterTxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();
    const invalidTx = new MinterTx(txParams);
    // const serializedTx = tx.serialize();

    test('tx fields', () => {
        expect(tx.serialize().toString('hex'))
            .toEqual('f88e01018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ba0dfd42ab59e68e6494d4e29f12520e7cd5a90c6d11b25599e868c2aac52440028a069f5f4085e1fe20b3e04701377a6d0320bb21f3162819ae3311318432aa332ea');
        expect(decodeToArray(tx.serialize()))
            .toEqual([
                [1],
                [1],
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [1],
                [233, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 148, 55, 102, 21, 185, 163, 24, 119, 71, 220, 124, 50, 229, 23, 35, 81, 94, 230, 46, 55, 220, 136, 13, 224, 182, 179, 167, 100, 0, 0],
                [99, 117, 115, 116, 111, 109, 32, 116, 101, 120, 116],
                [],
                [1],
                [248, 67, 27, 160, 223, 212, 42, 181, 158, 104, 230, 73, 77, 78, 41, 241, 37, 32, 231, 205, 90, 144, 198, 209, 27, 37, 89, 158, 134, 140, 42, 172, 82, 68, 0, 40, 160, 105, 245, 244, 8, 94, 31, 226, 11, 62, 4, 112, 19, 119, 166, 208, 50, 11, 178, 31, 49, 98, 129, 154, 227, 49, 19, 24, 67, 42, 163, 50, 234],
            ]);
    });
    test('tx signature fields', () => {
        expect(decodeToArray(decodeToArray(tx.serialize())[8]))
            .toEqual([
                [27],
                [223, 212, 42, 181, 158, 104, 230, 73, 77, 78, 41, 241, 37, 32, 231, 205, 90, 144, 198, 209, 27, 37, 89, 158, 134, 140, 42, 172, 82, 68, 0, 40],
                [105, 245, 244, 8, 94, 31, 226, 11, 62, 4, 112, 19, 119, 166, 208, 50, 11, 178, 31, 49, 98, 129, 154, 227, 49, 19, 24, 67, 42, 163, 50, 234],
            ]);
    });

    test('tx hash', () => {
        expect(tx.hash().toString('hex')).toEqual('c26347727aead2275a701c062f820e861fff343b3c0745e5b19fb758a5bac0d8');
        expect(tx.hash(true).toString('hex')).toEqual('c26347727aead2275a701c062f820e861fff343b3c0745e5b19fb758a5bac0d8');
        expect(tx.hash(false).toString('hex')).toEqual('cfa2584a2010352afeb68d1341fdbf5d0f1fd83a24abbabae1f59ff663988223');
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
