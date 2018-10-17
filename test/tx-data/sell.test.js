import {Buffer} from 'safe-buffer';
import {MinterTxDataSell, formatCoin} from '~/src';
import decodeToArray from '../decode-to-array';

describe('MinterTxDataSell', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterTxDataSell({
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
