import {toBuffer} from 'minterjs-util';
import {TxDataEditCandidate} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataDeclareCandidacy', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new TxDataEditCandidate({
            publicKey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
            rewardAddress: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
            ownerAddress: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
            controlAddress: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [249, 224, 54, 131, 154, 41, 247, 251, 162, 213, 57, 75, 212, 137, 237, 169, 39, 204, 185, 90, 204, 153, 229, 6, 230, 136, 228, 136, 128, 130, 179, 163],
                [118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22],
                [118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22],
                [118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22],
            ]);
    });
});
