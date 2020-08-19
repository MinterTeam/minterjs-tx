import {toBuffer} from 'minterjs-util';
import {TxDataSend} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSend', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new TxDataSend({
            coin: 0,
            to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
            value: 10,
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [],
                [118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22],
                [10],
            ]);
    });
});
