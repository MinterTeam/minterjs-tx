import {mPrefixToHex, convertToPip} from 'minterjs-util';
import {MinterTx, MinterTxSignature, MinterTxDataSend, TX_TYPE_SEND, coinToBuffer} from '~/src';
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
        coin: coinToBuffer(FORM_DATA.coin),
        value: `0x${convertToPip(FORM_DATA.amount, 'hex')}`,
    })).serialize();

    const txParams = {
        nonce: '0x01',
        chainId: '0x01',
        gasPrice: '0x01',
        gasCoin: coinToBuffer('MNT'),
        type: TX_TYPE_SEND,
        data: txData,
        payload: `0x${Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')}`,
        signatureType: '0x01',
    };
    const tx = new MinterTx(txParams);
    tx.signatureData = (new MinterTxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();
    const unsignedTx = new MinterTx(txParams);
    // const serializedTx = tx.serialize();

    test('tx fields', () => {
        expect(tx.serialize().toString('hex'))
            .toEqual('f88f0101018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ca086992c5456750ec04ffa070cd520bee9a1e208aab773884a6f29935576b9aecda0661435efaf2bb6d8cc00969b77739de4f19e4f02680c235365f3d59af8036fa6');
        expect(decodeToArray(tx.serialize()))
            .toEqual([
                [1],
                [1],
                [1],
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [1],
                [233, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 148, 55, 102, 21, 185, 163, 24, 119, 71, 220, 124, 50, 229, 23, 35, 81, 94, 230, 46, 55, 220, 136, 13, 224, 182, 179, 167, 100, 0, 0],
                [99, 117, 115, 116, 111, 109, 32, 116, 101, 120, 116],
                [],
                [1],
                [248, 67, 28, 160, 134, 153, 44, 84, 86, 117, 14, 192, 79, 250, 7, 12, 213, 32, 190, 233, 161, 226, 8, 170, 183, 115, 136, 74, 111, 41, 147, 85, 118, 185, 174, 205, 160, 102, 20, 53, 239, 175, 43, 182, 216, 204, 0, 150, 155, 119, 115, 157, 228, 241, 158, 79, 2, 104, 12, 35, 83, 101, 243, 213, 154, 248, 3, 111, 166],
            ]);
    });

    test('tx from string', () => {
        const txFromString = new MinterTx('f88f0101018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ca086992c5456750ec04ffa070cd520bee9a1e208aab773884a6f29935576b9aecda0661435efaf2bb6d8cc00969b77739de4f19e4f02680c235365f3d59af8036fa6');
        expect(txFromString.raw).toEqual(tx.raw);
    });

    test('tx signature fields', () => {
        expect(decodeToArray(decodeToArray(tx.serialize())[tx.raw.length - 1]))
            .toEqual([
                [28],
                [134, 153, 44, 84, 86, 117, 14, 192, 79, 250, 7, 12, 213, 32, 190, 233, 161, 226, 8, 170, 183, 115, 136, 74, 111, 41, 147, 85, 118, 185, 174, 205],
                [102, 20, 53, 239, 175, 43, 182, 216, 204, 0, 150, 155, 119, 115, 157, 228, 241, 158, 79, 2, 104, 12, 35, 83, 101, 243, 213, 154, 248, 3, 111, 166],
            ]);
    });

    test('tx hash', () => {
        expect(tx.hash().toString('hex')).toEqual('e1988b97e8d1b54d83efc3436a6d26173bb6dc10bea89c6a775011ed6ac81937');
        expect(tx.hash(true).toString('hex')).toEqual('e1988b97e8d1b54d83efc3436a6d26173bb6dc10bea89c6a775011ed6ac81937');
        expect(tx.hash(false).toString('hex')).toEqual('ff7cb12e6b111a0fe7c53b6b07805707bd3efc9f48e0aa293bdb95c6d5c58226');
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
        expect(() => unsignedTx.getSenderPublicKey()).toThrow();
    });

    test('tx validate boolean', () => {
        expect(tx.validate(false)).toEqual(true);
    });

    test('tx validate string', () => {
        expect(tx.validate(true)).toEqual('');
    });

    test('invalid tx', () => {
        expect(unsignedTx.validate(false)).toEqual(false);
    });
});
