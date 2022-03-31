import {TX_TYPE} from 'minterjs-util';
import {TxData, TxDataSellSwapPool} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSellSwapPool', () => {
    const params = {
        coins: [0, 1],
        valueToSell: 1000,
        minimumValueToBuy: 5,
    };

    const serializedTxData = (new TxDataSellSwapPool(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [194, 128, 1],
                [3, 232],
                [5],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.SELL_SWAP_POOL).serialize()).toEqual(serializedTxData);
    });

    test('empty data', () => {
        const txData = new TxDataSellSwapPool();
        const emptySerializedTxData = (txData).serialize();

        expect(emptySerializedTxData.toString('hex')).toEqual('c1c0');

        expect(decodeToArray(emptySerializedTxData))
            .toEqual([
                [192],
            ]);
    });
});
