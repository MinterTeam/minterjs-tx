import {TxDataSell} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSell', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new TxDataSell({
            coinToSell: 0,
            valueToSell: 1000,
            coinToBuy: 1,
            minimumValueToBuy: 5,
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [],
                [3, 232],
                [1],
                [5],
            ]);
    });
});
