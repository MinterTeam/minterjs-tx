import {TX_TYPE, toBuffer} from 'minterjs-util';
import {TxData, TxDataMoveStake} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataMoveStake', () => {
    const params = {
        from: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
        to: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a4'),
        coin: 0,
        stake: 1000,
    };

    const serializedTxData = (new TxDataMoveStake(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [249, 224, 54, 131, 154, 41, 247, 251, 162, 213, 57, 75, 212, 137, 237, 169, 39, 204, 185, 90, 204, 153, 229, 6, 230, 136, 228, 136, 128, 130, 179, 163],
                [249, 224, 54, 131, 154, 41, 247, 251, 162, 213, 57, 75, 212, 137, 237, 169, 39, 204, 185, 90, 204, 153, 229, 6, 230, 136, 228, 136, 128, 130, 179, 164],
                [],
                [3, 232],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.MOVE_STAKE).serialize()).toEqual(serializedTxData);
    });
});
