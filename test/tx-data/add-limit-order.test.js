import {TX_TYPE} from 'minterjs-util';
import {TxDataAddLimitOrder, TxData} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataAddLimitOrder', () => {
    const params = {
        coinToSell: 0,
        valueToSell: 5,
        coinToBuy: 1,
        valueToBuy: 1000,
    };

    const serializedTxData = (new TxDataAddLimitOrder(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [],
                [5],
                [1],
                [3, 232],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.ADD_LIMIT_ORDER).serialize()).toEqual(serializedTxData);
    });
});
