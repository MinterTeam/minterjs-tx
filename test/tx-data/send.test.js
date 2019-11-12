import {toBuffer} from 'minterjs-util';
import {MinterTxDataSend, coinToBuffer} from '~/src';
import decodeToArray from '../decode-to-array';

describe('MinterTxDataSend', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterTxDataSend({
            coin: coinToBuffer('MNT'),
            to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
            value: 10,
        })).serialize();

        expect(serializedTxData)
            .toEqual(Buffer.from([225, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 148, 118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22, 10]));

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22],
                [10],
            ]);
    });
});
