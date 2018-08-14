import MinterSellTxData from '../../src/tx-data/sell';
import {formatCoin} from '../../src/helpers';
import decodeToArray from '../decode-to-array';

describe('MinterSellTxData', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterSellTxData({
            coin_to_sell: formatCoin('MNT'),
            value_to_sell: 10,
            coin_to_buy: formatCoin('BELTCOIN'),
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [10],
                [66, 69, 76, 84, 67, 79, 73, 78, 0, 0],
            ]);
    });
});
