import {TX_TYPE, txTypeList} from 'minterjs-util';
import {TxData} from '~/src';

const typeList = txTypeList.map((typeItem) => {
    return {
        ...typeItem,
        toString: () => `${typeItem.hex} ${typeItem.key}`,
    };
});

describe('TxData', () => {
    describe('every tx type has corresponding constructor', () => {
        test.each(typeList)('%s', ({hex: txType}) => {
            expect(new TxData(undefined, txType)).toEqual(expect.anything());
        });
    });

    describe('every tx type works with forceDefaultValues', () => {
        test.each(typeList)('%s', ({hex: txType}) => {
            const txData = new TxData(undefined, txType, {forceDefaultValues: true});
            console.log(txData);
            // every field has initialized value
            expect(txData.raw.length).toEqual(txData._fields.length);
        });
    });
});
