import {toBuffer} from 'minterjs-util';
import MinterDelegateTxData from '../../src/tx-data/delegate';
import {formatCoin} from '../../src/helpers';
import decodeToArray from '../decode-to-array';

describe('MinterDelegateTxData', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterDelegateTxData({
            pubKey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
            coin: formatCoin('MNT'),
            stake: 1000,
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [249, 224, 54, 131, 154, 41, 247, 251, 162, 213, 57, 75, 212, 137, 237, 169, 39, 204, 185, 90, 204, 153, 229, 6, 230, 136, 228, 136, 128, 130, 179, 163],
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [3, 232],
            ]);
    });
});
