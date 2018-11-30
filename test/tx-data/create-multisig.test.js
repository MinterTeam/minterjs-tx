import {Buffer} from 'safe-buffer';
import ethUtil from 'ethereumjs-util';
import {MinterTxDataCreateMultisig} from '~/src';
import decodeToArray from '../decode-to-array';

describe('MinterTxDataCreateMultisig', () => {
    test('rlp encoded fields', () => {
        const txData = new MinterTxDataCreateMultisig({
            addresses: ['0xee81347211c72524338f9680072af90744333146', '0xee81347211c72524338f9680072af90744333145', '0xee81347211c72524338f9680072af90744333144'],
            weights: [1, 3, 5],
            threshold: 7,
        });
        const serializedTxData = (txData).serialize();

        expect(serializedTxData)
            .toEqual(Buffer.from([248, 70, 7, 195, 1, 3, 5, 248, 63, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 70, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 69, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 68]));

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [7],
                [195, 1, 3, 5],
                [248, 63, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 70, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 69, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 68],
            ]);

        const txData2 = new MinterTxDataCreateMultisig({
            addresses: ['0xee81347211c72524338f9680072af90744333146', '0xee81347211c72524338f9680072af90744333145', '0xee81347211c72524338f9680072af90744333144'],
            weights: [33, 55, 557],
            threshold: 350,
        });
        const serializedTxData2 = (txData2).serialize();

        expect(serializedTxData2)
            .toEqual(Buffer.from([248, 74, 130, 1, 94, 197, 33, 55, 130, 2, 45, 248, 63, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 70, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 69, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 68]));

        expect(decodeToArray(serializedTxData2))
            .toEqual([
                [1, 94],
                [197, 33, 55, 130, 2, 45],
                [248, 63, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 70, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 69, 148, 238, 129, 52, 114, 17, 199, 37, 36, 51, 143, 150, 128, 7, 42, 249, 7, 68, 51, 49, 68],
            ]);
    });
});
