import {TxDataCreateCoin, coinToBuffer, TxData, TX_TYPE} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataCreateCoin', () => {
    const params = {
        name: Buffer.from('My coin', 'utf-8'),
        symbol: coinToBuffer('MYCOIN'),
        initialAmount: 10,
        initialReserve: 50,
        constantReserveRatio: 100,
        maxSupply: 100,
    };

    const serializedTxData = (new TxDataCreateCoin(params)).serialize();

    test('rlp encoded fields', () => {
        expect(serializedTxData)
            .toEqual(Buffer.from([215, 135, 77, 121, 32, 99, 111, 105, 110, 138, 77, 89, 67, 79, 73, 78, 0, 0, 0, 0, 10, 50, 100, 100]));

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 121, 32, 99, 111, 105, 110],
                [77, 89, 67, 79, 73, 78, 0, 0, 0, 0],
                [10],
                [50],
                [100],
                [100],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.CREATE_COIN).serialize()).toEqual(serializedTxData);
    });
});
