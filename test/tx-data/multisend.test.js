import {toBuffer, convertToPip} from 'minterjs-util';
import {MinterTxDataMultisend, coinToBuffer} from '~/src';
import decodeToArray from '../decode-to-array';

describe('MinterTxDataMultisend', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterTxDataMultisend({
            list: [{
                coin: coinToBuffer('MNT'),
                to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
                value: 10,
            }],
        })).serialize();

        expect(serializedTxData)
            .toEqual(Buffer.from([227, 226, 225, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 148, 118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22, 10]));

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [226, 225, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 148, 118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22, 10],
            ]);
    });

    test('rlp encoded fields (from php sdk)', () => {
        const serializedTxData = (new MinterTxDataMultisend({
            list: [
                {
                    coin: coinToBuffer('MNT'),
                    to: toBuffer('Mxfe60014a6e9ac91618f5d1cab3fd58cded61ee99'),
                    value: `0x${convertToPip(0.1, 'hex')}`,
                }, {
                    coin: coinToBuffer('MNT'),
                    to: toBuffer('Mxddab6281766ad86497741ff91b6b48fe85012e3c'),
                    value: `0x${convertToPip(0.2, 'hex')}`,
                },
            ],
        })).serialize();

        expect(serializedTxData)
            .toEqual(Buffer.from('f856f854e98a4d4e540000000000000094fe60014a6e9ac91618f5d1cab3fd58cded61ee9988016345785d8a0000e98a4d4e540000000000000094ddab6281766ad86497741ff91b6b48fe85012e3c8802c68af0bb140000', 'hex'));

        expect(decodeToArray(serializedTxData))
            .toEqual([[248, 84, 233, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 148, 254, 96, 1, 74, 110, 154, 201, 22, 24, 245, 209, 202, 179, 253, 88, 205, 237, 97, 238, 153, 136, 1, 99, 69, 120, 93, 138, 0, 0, 233, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 148, 221, 171, 98, 129, 118, 106, 216, 100, 151, 116, 31, 249, 27, 107, 72, 254, 133, 1, 46, 60, 136, 2, 198, 138, 240, 187, 20, 0, 0]]);
    });

    test('data from rlp', () => {
        const txData = new MinterTxDataMultisend({
            list: [{
                coin: coinToBuffer('MNT'),
                to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
                value: 10,
            }, {
                coin: coinToBuffer('ASD'),
                to: toBuffer('Mx0000000000111111111122222222223333333333'),
                value: 55,
            }],
        });
        const txDataFromRlp = new MinterTxDataMultisend(txData.serialize());

        expect(txData.list)
            .toEqual(txDataFromRlp.list);
    });
});
