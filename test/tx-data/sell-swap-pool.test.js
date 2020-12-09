import {TxDataSellSwapPool} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSellSwapPool', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new TxDataSellSwapPool({
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
