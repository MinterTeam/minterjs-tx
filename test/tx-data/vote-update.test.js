import {TX_TYPE, TxData, TxDataVoteUpdate} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataVoteUpdate', () => {
    const params = {
        version: Buffer.from('0.0.1', 'utf-8'),
        publicKey: 'Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3',
        height: 1000,
    };

    const serializedTxData = (new TxDataVoteUpdate(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [48, 46, 48, 46, 49],
                [249, 224, 54, 131, 154, 41, 247, 251, 162, 213, 57, 75, 212, 137, 237, 169, 39, 204, 185, 90, 204, 153, 229, 6, 230, 136, 228, 136, 128, 130, 179, 163],
                [3, 232],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.VOTE_UPDATE).serialize()).toEqual(serializedTxData);
    });
});
