import {TX_TYPE, TxData, TxDataSell, TxDataSellAll} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSellAll', () => {
    const params = {
        coinToSell: 0,
        coinToBuy: 1,
        minimumValueToBuy: 5,
    };

    const serializedTxData = (new TxDataSellAll(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [],
                [1],
                [5],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.SELL_ALL).serialize()).toEqual(serializedTxData);
    });
});
