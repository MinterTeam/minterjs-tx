import {TX_TYPE} from 'minterjs-util';
import {TxDataBuySwapPool, TxData} from '~/src';
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

    test('array as default value for isNonBinaryArray fields', () => {
        const txData = new TxDataBuySwapPool(undefined, {forceDefaultValues: true});
        const emptySerializedTxData = (txData).serialize();

        expect(emptySerializedTxData.toString('hex')).toEqual('c3c08080');

        expect(decodeToArray(emptySerializedTxData))
            .toEqual([
                [192],
                [],
                [],
            ]);
    });
});
