import {Buffer} from 'safe-buffer';
import MinterSellTxData from '../../src/tx-data/sell';
import {formatCoin} from '../../src/helpers';
import decodeToArray from '../decode-to-array';

describe('MinterSellTxData', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterSellTxData({
            coinToSell: formatCoin('MNT'),
            valueToSell: 10,
            coinToBuy: formatCoin('BELTCOIN'),
        })).serialize();

        expect(serializedTxData)
            .toEqual(Buffer.from([215, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 10, 138, 66, 69, 76, 84, 67, 79, 73, 78, 0, 0]));

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [10],
                [66, 69, 76, 84, 67, 79, 73, 78, 0, 0],
            ]);
    });
});
