import {TX_TYPE, coinToBuffer} from 'minterjs-util';
import {TxDataRecreateToken, TxData} from '~/src';
import decodeToArray from '../decode-to-array.js';

describe('TxDataRecreateToken', () => {
    const params = {
        name: Buffer.from('My coin', 'utf-8'),
        symbol: coinToBuffer('MYCOIN'),
        initialAmount: 10,
        maxSupply: 100,
        mintable: 0,
        burnable: 1,
    };

    const serializedTxData = (new TxDataRecreateToken(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 121, 32, 99, 111, 105, 110],
                [77, 89, 67, 79, 73, 78, 0, 0, 0, 0],
                [10],
                [100],
                [],
                [1],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.RECREATE_TOKEN).serialize()).toEqual(serializedTxData);
    });
});
