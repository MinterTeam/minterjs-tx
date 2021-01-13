import {TX_TYPE, TxData, TxDataBurnToken} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataBurnToken', () => {
    const params = {
        coin: 0,
        value: 1000,
    };

    const serializedTxData = (new TxDataBurnToken(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [],
                [3, 232],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.BURN_TOKEN).serialize()).toEqual(serializedTxData);
    });
});
