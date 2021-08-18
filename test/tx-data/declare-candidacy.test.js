import {toBuffer, TX_TYPE} from 'minterjs-util';
import {TxData, TxDataDeclareCandidacy} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataDeclareCandidacy', () => {
    const params = {
        address: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
        publicKey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
        commission: 10,
        coin: 0,
        stake: 1000,
    };

    const serializedTxData = (new TxDataDeclareCandidacy(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22],
                [249, 224, 54, 131, 154, 41, 247, 251, 162, 213, 57, 75, 212, 137, 237, 169, 39, 204, 185, 90, 204, 153, 229, 6, 230, 136, 228, 136, 128, 130, 179, 163],
                [10],
                [],
                [3, 232],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.DECLARE_CANDIDACY).serialize()).toEqual(serializedTxData);
    });
});
