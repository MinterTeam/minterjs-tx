import MinterSellAllTxData from '../../src/tx-data/sell-all';
import {formatCoin} from '../../src/helpers';
import decodeToArray from '../decode-to-array';

describe('MinterSellAllTxData', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterSellAllTxData({
            coinToSell: formatCoin('MNT'),
            coinToBuy: formatCoin('BELTCOIN'),
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [66, 69, 76, 84, 67, 79, 73, 78, 0, 0],
            ]);
    });
});
