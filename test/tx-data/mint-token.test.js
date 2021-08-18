import {TX_TYPE} from 'minterjs-util';
import {TxData, TxDataMintToken} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataSend', () => {
    const params = {
        coin: 12,
        value: 10,
    };

    const serializedTxData = (new TxDataMintToken(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [12],
                [10],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.MINT_TOKEN).serialize()).toEqual(serializedTxData);
    });
});
