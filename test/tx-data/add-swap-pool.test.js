import {TxDataAddSwapPool, TxData, TX_TYPE} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataAddSwapPool', () => {
    const params = {
        coin0: 123,
        coin1: 0,
        volume0: 1000,
        maximumVolume1: 15,
    };

    const serializedTxData = (new TxDataAddSwapPool(params)).serialize();

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
        expect(TxData(params, TX_TYPE.ADD_SWAP_POOL).serialize()).toEqual(serializedTxData);
    });
});
