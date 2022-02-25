import {TX_TYPE, toBuffer} from 'minterjs-util';
import {TxData, TxDataLock} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataLock', () => {
    const params = {
        dueBlock: 123,
        coin: 0,
        value: 10,
    };

    const serializedTxData = (new TxDataLock(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [123],
                [],
                [10],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.LOCK).serialize()).toEqual(serializedTxData);
    });
});
