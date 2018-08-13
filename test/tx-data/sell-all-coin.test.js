import MinterSellAllCoinTxData from '../../src/tx-data/sell-all-coin';
import {formatCoin} from '../../src/helpers';
import decodeToArray from '../decode-to-array';

describe('MinterBuyCoinTxData', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterSellAllCoinTxData({
            coin_to_sell: formatCoin('MNT'),
            coin_to_buy: formatCoin('BELTCOIN'),
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [66, 69, 76, 84, 67, 79, 73, 78, 0, 0],
            ]);
    });
});
