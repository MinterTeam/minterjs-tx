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
        chainID: '0x01',
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
            .toEqual('f88f0101018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ba0f224517a55adf0bb751ce2e6b2eb4acfb89feb8a8b6b76ffd22ef417d923dc51a03ccf201383cf45f2d779e0c4250992c24b4775a5cd2050b7bc8542f7f73ba545');
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
                [248, 67, 27, 160, 242, 36, 81, 122, 85, 173, 240, 187, 117, 28, 226, 230, 178, 235, 74, 207, 184, 159, 235, 138, 139, 107, 118, 255, 210, 46, 244, 23, 217, 35, 220, 81, 160, 60, 207, 32, 19, 131, 207, 69, 242, 215, 121, 224, 196, 37, 9, 146, 194, 75, 71, 117, 165, 205, 32, 80, 183, 188, 133, 66, 247, 247, 59, 165, 69],
            ]);
    });
    test('tx signature fields', () => {
        expect(decodeToArray(decodeToArray(tx.serialize())[9]))
            .toEqual([
                [27],
                [242, 36, 81, 122, 85, 173, 240, 187, 117, 28, 226, 230, 178, 235, 74, 207, 184, 159, 235, 138, 139, 107, 118, 255, 210, 46, 244, 23, 217, 35, 220, 81],
                [60, 207, 32, 19, 131, 207, 69, 242, 215, 121, 224, 196, 37, 9, 146, 194, 75, 71, 117, 165, 205, 32, 80, 183, 188, 133, 66, 247, 247, 59, 165, 69],
            ]);
    });

    test('tx hash', () => {
        expect(tx.hash().toString('hex')).toEqual('42a158f70c22cc668a64c7786956ab1715aac4e347423b4767dea22bbce65785');
        expect(tx.hash(true).toString('hex')).toEqual('42a158f70c22cc668a64c7786956ab1715aac4e347423b4767dea22bbce65785');
        expect(tx.hash(false).toString('hex')).toEqual('ebf35eefe91f1d0297e373ec51b71b76b22c62e0d89c00c32f04da6e3ca86b9e');
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
