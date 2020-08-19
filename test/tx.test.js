import {mPrefixToHex, convertToPip} from 'minterjs-util';
import {Tx, TxSignature, TxDataSend, TxMultisignature, TX_TYPE, coinToBuffer} from '~/src';
import decodeToArray from './decode-to-array';

const PRIVATE_KEY = Buffer.from('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex');
const FORM_DATA = {
    address: 'Mx376615B9A3187747dC7c32e51723515Ee62e37Dc',
    amount: 1,
    coin: 0,
    payload: 'custom text',
};

describe('tx', () => {
    const txData = (new TxDataSend({
        to: mPrefixToHex(FORM_DATA.address),
        coin: FORM_DATA.coin,
        value: `0x${convertToPip(FORM_DATA.amount, 'hex')}`,
    })).serialize();

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
    const unsignedTx = new Tx(txParams);
    // const serializedTx = tx.serialize();

    test('tx fields', () => {
        expect(tx.serialize().toString('hex'))
            .toEqual('f87b0101018001a0df8094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ca0114adc1e60dc78b90b77b2d9a105cae71aa4facc21aaabc33d6f5c34b782547aa02eac4a0044b9c12375b9e8a22505cc3e58d1f8559be08385e49347be36139555');

        const decodedTx = decodeToArray(tx.serialize());
        decodedTx[5] = decodeToArray(decodedTx[5]);
        expect(decodedTx)
            .toEqual([
                [1],
                [1],
                [1],
                [],
                [1],
                [
                    [],
                    [55, 102, 21, 185, 163, 24, 119, 71, 220, 124, 50, 229, 23, 35, 81, 94, 230, 46, 55, 220],
                    [13, 224, 182, 179, 167, 100, 0, 0],
                ],
                [99, 117, 115, 116, 111, 109, 32, 116, 101, 120, 116],
                [],
                [1],
                [248, 67, 28, 160, 17, 74, 220, 30, 96, 220, 120, 185, 11, 119, 178, 217, 161, 5, 202, 231, 26, 164, 250, 204, 33, 170, 171, 195, 61, 111, 92, 52, 183, 130, 84, 122, 160, 46, 172, 74, 0, 68, 185, 193, 35, 117, 185, 232, 162, 37, 5, 204, 62, 88, 209, 248, 85, 155, 224, 131, 133, 228, 147, 71, 190, 54, 19, 149, 85],
            ]);
    });

    test('tx from string', () => {
        const txFromString = new Tx('f87b0101018001a0df8094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ca0114adc1e60dc78b90b77b2d9a105cae71aa4facc21aaabc33d6f5c34b782547aa02eac4a0044b9c12375b9e8a22505cc3e58d1f8559be08385e49347be36139555');
        expect(txFromString.raw).toEqual(tx.raw);
    });

    test('tx signature fields', () => {
        expect(decodeToArray(decodeToArray(tx.serialize())[tx.raw.length - 1]))
            .toEqual([
                [28],
                [17, 74, 220, 30, 96, 220, 120, 185, 11, 119, 178, 217, 161, 5, 202, 231, 26, 164, 250, 204, 33, 170, 171, 195, 61, 111, 92, 52, 183, 130, 84, 122],
                [46, 172, 74, 0, 68, 185, 193, 35, 117, 185, 232, 162, 37, 5, 204, 62, 88, 209, 248, 85, 155, 224, 131, 133, 228, 147, 71, 190, 54, 19, 149, 85],
            ]);
    });

    test('tx hash', () => {
        expect(tx.hash().toString('hex')).toEqual('c35e2be48d546148c75d08abfa1ed9be724ed6017c923587cb3c227ad071968e');
        expect(tx.hash(true).toString('hex')).toEqual('c35e2be48d546148c75d08abfa1ed9be724ed6017c923587cb3c227ad071968e');
        expect(tx.hash(false).toString('hex')).toEqual('a32aceacc24c44ffe573700dbac7b57148e250a614b2adfaa588613f470c020d');
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

describe('multisig', () => {
    const txData = (new TxDataSend({
        to: mPrefixToHex(FORM_DATA.address),
        coin: FORM_DATA.coin,
        value: `0x${convertToPip(FORM_DATA.amount, 'hex')}`,
    })).serialize();

    const txParams = {
        nonce: '0x01',
        chainId: '0x01',
        gasPrice: '0x01',
        gasCoin: 0,
        type: TX_TYPE.SEND,
        data: txData,
        payload: `0x${Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')}`,
        signatureType: '0x02',
    };
    const tx = new Tx(txParams);
    const signature = (new TxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();
    tx.signatureData = new TxMultisignature({
        multisig: 'Mx036525e438f62c1444c12c379e0249778a59542a',
        signatures: [signature, signature],
    }).serialize();

    test('tx construction', () => {
        expect(tx.serialize().toString('hex'))
            .toEqual('f8d90101018001a0df8094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748002b8a3f8a194036525e438f62c1444c12c379e0249778a59542af88af8431ba0a19138b0622e6188d1105abb536637935048a2c5c743a3decb158038cdb478fca0465edd4258ef612e3b6c50fb238031470b4f1afc16fd7ac005f8a14430dc2a86f8431ba0a19138b0622e6188d1105abb536637935048a2c5c743a3decb158038cdb478fca0465edd4258ef612e3b6c50fb238031470b4f1afc16fd7ac005f8a14430dc2a86');
    });
});
