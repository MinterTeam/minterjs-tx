import {TxDataPriceVote} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataPriceVote', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new TxDataPriceVote({
            price: 123,
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [123],
            ]);
    });
});
