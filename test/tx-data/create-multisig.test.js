import {TX_TYPE} from 'minterjs-util';
import {TxData, TxDataCreateMultisig} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataCreateMultisig', () => {
    describe('default', () => {
        const params = {
            addresses: ['0xee81347211c72524338f9680072af90744333146', '0xee81347211c72524338f9680072af90744333145', '0xee81347211c72524338f9680072af90744333144'],
            weights: [1, 3, 5],
            threshold: 1023,
        };
        const serializedTxData = (new TxDataCreateMultisig(params)).serialize();

        test('rlp encoded fields', () => {
            expect(serializedTxData)
                .toEqual(Buffer.from([248, 72, 130, 3, 255, 195, 1, 3, 5, 248, 63, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 70, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 69, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 68]));

            expect(decodeToArray(serializedTxData))
                .toEqual([
                    [3, 255],
                    [195, 1, 3, 5],
                    [248, 63, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 70, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 69, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 68],
                ]);
        });

        test('TxData', () => {
            expect(TxData(params, TX_TYPE.CREATE_MULTISIG).serialize()).toEqual(serializedTxData);
        });
    });

    test('rlp encoded fields 2', () => {
        const txData = new TxDataCreateMultisig({
            addresses: ['0xee81347211c72524338f9680072af90744333146', '0xee81347211c72524338f9680072af90744333145', '0xee81347211c72524338f9680072af90744333144'],
            weights: [33, 55, 557],
            threshold: 350,
        });
        const serializedTxData = (txData).serialize();

        expect(serializedTxData)
            .toEqual(Buffer.from([248, 74, 130, 1, 94, 197, 33, 55, 130, 2, 45, 248, 63, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 70, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 69, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 68]));

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [1, 94],
                [197, 33, 55, 130, 2, 45],
                [248, 63, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 70, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 69, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 68],
            ]);
    });

    test('correct 0 weight', () => {
        const txData = new TxDataCreateMultisig({
            addresses: ['0xee81347211c72524338f9680072af90744333146', '0xee81347211c72524338f9680072af90744333145'],
            weights: [1, 0],
            threshold: 7,
        });
        const serializedTxData = (txData).serialize();

        expect(serializedTxData.toString('hex'))
            .toEqual('ef07c20180ea94ee81347211c72524338f9680072af9074433314694ee81347211c72524338f9680072af90744333145');

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [7],
                [194, 1, 128],
                [234, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 70, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 69],
            ]);
    });

    test('data from rlp', () => {
        const txData = new TxDataCreateMultisig({
            addresses: ['0xee81347211c72524338f9680072af90744333146', '0xee81347211c72524338f9680072af90744333145', '0xee81347211c72524338f9680072af90744333144'],
            weights: [1, 3, 5],
            threshold: 7,
        });
        const txDataFromRlp = new TxDataCreateMultisig(txData.serialize());

        expect(txData.list)
            .toEqual(txDataFromRlp.list);
    });

    test('array as default value for isNonBinaryArray fields', () => {
        const txData = new TxDataCreateMultisig(undefined, {forceDefaultValues: true});
        const serializedTxData = (txData).serialize();

        expect(serializedTxData.toString('hex')).toEqual('c380c0c0');

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [],
                [192],
                [192],
            ]);
    });
});
