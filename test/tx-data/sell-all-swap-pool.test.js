import {TxDataSellAllSwapPool} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSellAllSwapPool', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new TxDataSellAllSwapPool({
            coinToSell: 0,
            coinToBuy: 1,
            minimumValueToBuy: 5,
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [],
                [1],
                [5],
            ]);
    });
});
