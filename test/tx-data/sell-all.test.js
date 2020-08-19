import {TxDataSellAll} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSellAll', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new TxDataSellAll({
            coinToSell: 0,
            coinToBuy: 1,
            minimumValueToBuy: 5,
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [],
                [1],
                [5],
            ]);
    });
});
