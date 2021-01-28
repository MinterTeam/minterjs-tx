import {TxDataCreateSwapPool, TxData, TX_TYPE} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataCreateSwapPool', () => {
    const params = {
        coin0: 123,
        coin1: 0,
        volume0: 1000,
        volume1: 15,
    };

    const serializedTxData = (new TxDataCreateSwapPool(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [123],
                [],
                [3, 232],
                [15],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.CREATE_SWAP_POOL).serialize()).toEqual(serializedTxData);
    });
});
