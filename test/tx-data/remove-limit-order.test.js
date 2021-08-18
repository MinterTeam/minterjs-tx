import {TX_TYPE} from 'minterjs-util';
import {TxData, TxDataRemoveLimitOrder} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataRemoveLimitOrder', () => {
    const params = {
        id: 1000,
    };

    const serializedTxData = (new TxDataRemoveLimitOrder(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [3, 232],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.REMOVE_LIMIT_ORDER).serialize()).toEqual(serializedTxData);
    });
});
