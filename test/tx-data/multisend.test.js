import {TX_TYPE, toBuffer, convertToPip} from 'minterjs-util';
import {TxData, TxDataMultisend} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataMultisend', () => {
    describe('default', () => {
        const params = {
            list: [{
                coin: 0,
                to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
                value: 10,
            }],
        };

        const serializedTxData = (new TxDataMultisend(params)).serialize();

        test('rlp encoded fields', () => {
            const tx = decodeToArray(serializedTxData);
            const rlpList = tx[0];
            let list = decodeToArray(rlpList);
            list = list.map((listItem) => decodeToArray(listItem));
            tx[0] = list;
            expect(tx)
                .toEqual([
                    [
                        [[], [118, 51, 152, 12, 0, 1, 57, 221, 59, 210, 74, 63, 84, 224, 100, 116, 250, 148, 30, 22], [10]],
                    ],
                ]);
        });

        test('TxData', () => {
            expect(TxData(params, TX_TYPE.MULTISEND).serialize()).toEqual(serializedTxData);
        });
    });

    test('rlp encoded fields (from php sdk)', () => {
        const serializedTxData = (new TxDataMultisend({
            list: [
                {
                    coin: 0,
                    to: toBuffer('Mxfe60014a6e9ac91618f5d1cab3fd58cded61ee99'),
                    value: `0x${convertToPip(0.1, 'hex')}`,
                }, {
                    coin: 1,
                    to: toBuffer('Mxddab6281766ad86497741ff91b6b48fe85012e3c'),
                    value: `0x${convertToPip(0.2, 'hex')}`,
                },
            ],
        })).serialize();

        const tx = decodeToArray(serializedTxData);
        const rlpList = tx[0];
        let list = decodeToArray(rlpList);
        list = list.map((listItem) => decodeToArray(listItem));
        tx[0] = list;

        expect(tx)
            .toEqual([
                [
                    [
                        [],
                        [254, 96, 1, 74, 110, 154, 201, 22, 24, 245, 209, 202, 179, 253, 88, 205, 237, 97, 238, 153],
                        [1, 99, 69, 120, 93, 138, 0, 0],
                    ],
                    [
                        [1],
                        [221, 171, 98, 129, 118, 106, 216, 100, 151, 116, 31, 249, 27, 107, 72, 254, 133, 1, 46, 60],
                        [2, 198, 138, 240, 187, 20, 0, 0],
                    ],
                ],
            ]);
    });

    test('data from rlp', () => {
        const txData = new TxDataMultisend({
            list: [{
                coin: 0,
                to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
                value: 10,
            }, {
                coin: 1,
                to: toBuffer('Mx0000000000111111111122222222223333333333'),
                value: 55,
            }],
        });
        const txDataFromRlp = new TxDataMultisend(txData.serialize());

        expect(txData.list)
            .toEqual(txDataFromRlp.list);
    });
});
