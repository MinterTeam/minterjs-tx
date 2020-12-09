import {TxDataRemoveSwapPool, TxData, TX_TYPE} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataRemoveSwapPool', () => {
    const params = {
        coin0: 123,
        coin1: 0,
        liquidity: 5,
        minimumVolume0: 1000,
        minimumVolume1: 15,
    };

    const serializedTxData = (new TxDataRemoveSwapPool(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [123],
                [],
                [5],
                [3, 232],
                [15],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.REMOVE_SWAP_POOL).serialize()).toEqual(serializedTxData);
    });
});
