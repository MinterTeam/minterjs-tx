import {normalizeTxType, TX_TYPE} from '~/src';

describe('coinToBuffer', () => {
    test('from array', () => {
        expect(normalizeTxType([13])).toEqual(TX_TYPE.MULTISEND);
    });
    test('from number', () => {
        expect(normalizeTxType(13)).toEqual(TX_TYPE.MULTISEND);
    });
    test('from invalid string ', () => {
        expect(normalizeTxType('13')).toEqual(TX_TYPE.MULTISEND);
    });
    test('from lowercase string ', () => {
        expect(normalizeTxType('0x0d')).toEqual(TX_TYPE.MULTISEND);
    });
    test('from uppercase string ', () => {
        expect(normalizeTxType('0X0D')).toEqual(TX_TYPE.MULTISEND);
    });
});
