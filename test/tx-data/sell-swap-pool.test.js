import {TX_TYPE, TxData, TxDataSellSwapPool} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSellSwapPool', () => {
    const params = {
        coinToSell: 0,
        valueToSell: 1000,
        coinToBuy: 1,
        minimumValueToBuy: 5,
    };

    const serializedTxData = (new TxDataSellSwapPool(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [],
                [3, 232],
                [1],
                [5],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.SELL_SWAP_POOL).serialize()).toEqual(serializedTxData);
    });
});
