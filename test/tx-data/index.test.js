import {TxData, TX_TYPE} from '~/src';

describe('TxData', () => {
    test('every tx type has corresponding constructor', () => {
        Object.values(TX_TYPE).forEach((txType) => {
            try {
                expect(new TxData(undefined, txType)).toEqual(expect.anything());
            } catch (e) {
                const entry = Object.entries(TX_TYPE).find(([key, value]) => value === txType);
                console.log(entry[0], entry[1]);
                throw e;
            }
        });
    });
});
