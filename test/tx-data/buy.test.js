import {Buffer} from 'safe-buffer';
import {MinterTxDataBuy, coinToBuffer} from '~/src';
import decodeToArray from '../decode-to-array';

describe('MinterTxDataBuy', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterTxDataBuy({
            coinToBuy: coinToBuffer('MNT'),
            valueToBuy: 1000,
            coinToSell: coinToBuffer('BELTCOIN'),
            maximumValueToSell: 5,
        })).serialize();

        expect(serializedTxData)
            .toEqual(Buffer.from([218, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 130, 3, 232, 138, 66, 69, 76, 84, 67, 79, 73, 78, 0, 0, 5]));

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [3, 232],
                [66, 69, 76, 84, 67, 79, 73, 78, 0, 0],
                [5],
            ]);
    });
});
