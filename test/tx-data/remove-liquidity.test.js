import {TX_TYPE} from 'minterjs-util';
import {TxDataRemoveLiquidity, TxData} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataRemoveLiquidity', () => {
    const params = {
        coin0: 123,
        coin1: 0,
        liquidity: 5,
        minimumVolume0: 1000,
        minimumVolume1: 15,
    };

    const serializedTxData = (new TxDataRemoveLiquidity(params)).serialize();

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
        expect(TxData(params, TX_TYPE.REMOVE_LIQUIDITY).serialize()).toEqual(serializedTxData);
    });
});
