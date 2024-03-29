import {TX_TYPE, toBuffer} from 'minterjs-util';
import {TxData, TxDataRedeemCheck} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataRedeemCheck', () => {
    const params = {
        check: toBuffer('Mcf8ab3101830f423f8a4d4e5400000000000000888ac7230489e800008a4d4e5400000000000000b841f69950a210196529f47df938f7af84958cdb336daf304616c37ef8bebca324910910f046e2ff999a7f2ab564bd690c1102ab65a20e0f27b57a93854339b60837011ba00a07cbf311148a6b62c1d1b34a5e0c2b6931a0547ede8b9dfb37aedff4480622a023ac93f7173ca41499624f06dfdd58c4e65d1279ea526777c194ddb623d57027'),
        proof: Buffer.from('7adcf6a62a66b177b266c767c5ebd906651fb66269401a8c66d053574dc29c67296b93af2e276fbdf5f606a98419ae69191450f67a2d273ee6c5d3016773c16d01', 'hex'),
    };

    const serializedTxData = (new TxDataRedeemCheck(params)).serialize();

    test('rlp encoded fields', () => {
        // console.log(JSON.stringify(Array.from(serializedTxData)));
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [248, 171, 49, 1, 131, 15, 66, 63, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 136, 138, 199, 35, 4, 137, 232, 0, 0, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 184, 65, 246, 153, 80, 162, 16, 25, 101, 41, 244, 125, 249, 56, 247, 175, 132, 149, 140, 219, 51, 109, 175, 48, 70, 22, 195, 126, 248, 190, 188, 163, 36, 145, 9, 16, 240, 70, 226, 255, 153, 154, 127, 42, 181, 100, 189, 105, 12, 17, 2, 171, 101, 162, 14, 15, 39, 181, 122, 147, 133, 67, 57, 182, 8, 55, 1, 27, 160, 10, 7, 203, 243, 17, 20, 138, 107, 98, 193, 209, 179, 74, 94, 12, 43, 105, 49, 160, 84, 126, 222, 139, 157, 251, 55, 174, 223, 244, 72, 6, 34, 160, 35, 172, 147, 247, 23, 60, 164, 20, 153, 98, 79, 6, 223, 221, 88, 196, 230, 93, 18, 121, 234, 82, 103, 119, 193, 148, 221, 182, 35, 213, 112, 39],
                [122, 220, 246, 166, 42, 102, 177, 119, 178, 102, 199, 103, 197, 235, 217, 6, 101, 31, 182, 98, 105, 64, 26, 140, 102, 208, 83, 87, 77, 194, 156, 103, 41, 107, 147, 175, 46, 39, 111, 189, 245, 246, 6, 169, 132, 25, 174, 105, 25, 20, 80, 246, 122, 45, 39, 62, 230, 197, 211, 1, 103, 115, 193, 109, 1],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.REDEEM_CHECK).serialize()).toEqual(serializedTxData);
    });
});
