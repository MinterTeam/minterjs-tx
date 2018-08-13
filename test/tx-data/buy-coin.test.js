import MinterBuyCoinTxData from '../../src/tx-data/buy-coin';
import {formatCoin} from '../../src/helpers';
import decodeToArray from '../decode-to-array';

describe('MinterBuyCoinTxData', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterBuyCoinTxData({
            coin_to_buy: formatCoin('MNT'),
            value_to_buy: 10,
            coin_to_sell: formatCoin('BELTCOIN'),
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [10],
                [66, 69, 76, 84, 67, 79, 73, 78, 0, 0],
            ]);
    });
});
