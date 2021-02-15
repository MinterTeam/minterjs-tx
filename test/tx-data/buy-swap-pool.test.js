import {TxDataBuySwapPool, TxData, TX_TYPE} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataBuySwapPool', () => {
    const params = {
        coins: [1, 0],
        valueToBuy: 1000,
        maximumValueToSell: 5,
    };

    const serializedTxData = (new TxDataBuySwapPool(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [194, 1, 128],
                [3, 232],
                [5],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.BUY_SWAP_POOL).serialize()).toEqual(serializedTxData);
    });
});
