import {TX_TYPE, TxData, TxDataPriceVote} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataPriceVote', () => {
    const params = {
        price: 123,
    };

    const serializedTxData = (new TxDataPriceVote(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [123],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.PRICE_VOTE).serialize()).toEqual(serializedTxData);
    });
});
