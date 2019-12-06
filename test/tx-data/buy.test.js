import {MinterTxDataBuy, coinToBuffer, TxData, TX_TYPE} from '~/src';
import decodeToArray from '../decode-to-array';

describe('MinterTxDataBuy', () => {
    const params = {
        coinToBuy: coinToBuffer('MNT'),
        valueToBuy: 1000,
        coinToSell: coinToBuffer('BELTCOIN'),
        maximumValueToSell: 5,
    };

    const serializedTxData = (new MinterTxDataBuy(params)).serialize();

    test('rlp encoded fields', () => {
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

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.BUY).serialize()).toEqual(serializedTxData);
    });
});
