import {MinterTxDataBuy, formatCoin} from '~/src';
import decodeToArray from '../decode-to-array';

describe('MinterTxDataBuy', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterTxDataBuy({
            coinToBuy: formatCoin('MNT'),
            valueToBuy: 10,
            coinToSell: formatCoin('BELTCOIN'),
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [10],
                [66, 69, 76, 84, 67, 79, 73, 78, 0, 0],
            ]);
    });
});
