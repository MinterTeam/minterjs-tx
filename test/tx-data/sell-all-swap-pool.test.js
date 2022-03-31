import {TX_TYPE} from 'minterjs-util';
import {TxData, TxDataSellAllSwapPool} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSellAllSwapPool', () => {
    const params = {
        coins: [0, 1],
        minimumValueToBuy: 5,
    };

    const serializedTxData = (new TxDataSellAllSwapPool(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [194, 128, 1],
                [5],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.SELL_ALL_SWAP_POOL).serialize()).toEqual(serializedTxData);
    });

    test('array as default value for isNonBinaryArray fields', () => {
        const txData = new TxDataSellAllSwapPool(undefined, {forceDefaultValues: true});
        const emptySerializedTxData = (txData).serialize();

        expect(emptySerializedTxData.toString('hex')).toEqual('c2c080');

        expect(decodeToArray(emptySerializedTxData))
            .toEqual([
                [192],
                [],
            ]);
    });
});
