import {coinToBuffer, TX_TYPE} from 'minterjs-util';
import {TxDataEditTickerOwner, TxData} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataEditTickerOwner', () => {
    const params = {
        symbol: coinToBuffer('MYCOIN'),
        newOwner: 'Mx7633980c000139dd3bd24a3f54e06474fa941e16',
    };

    const serializedTxData = (new TxDataEditTickerOwner(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 89, 67, 79, 73, 78, 0, 0, 0, 0],
                [118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.EDIT_TICKER_OWNER).serialize()).toEqual(serializedTxData);
    });
});
