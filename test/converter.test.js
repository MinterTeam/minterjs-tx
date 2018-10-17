import {convert, convertToPip, convertFromPip} from '~/src';

describe('converter', () => {
    test('convert to pip', () => {
        const bips = 1.234;
        expect(convert(bips, 'pip').toString()).toEqual('1234000000000000000');
    });

    test('bip to pip', () => {
        const bips = 1.234;
        expect(convertToPip(bips).toString()).toEqual('1234000000000000000');
    });

    test('convert to bip', () => {
        const pips = 1234;
        expect(convert(pips, 'bip').toString()).toEqual((0.000000000000001234).toString());
    });

    test('pip to bip', () => {
        const pips = 1234;
        expect(convertFromPip(pips).toString()).toEqual((0.000000000000001234).toString());
    });

    test('convert 0x', () => {
        const bips = '0x';

        expect(convert(bips, 'pip').toString()).toEqual('0');
    });

    test('convert to unknown type', () => {
        const bips = 12345;

        expect(() => convert(bips, 'mnb')).toThrow();
    });
});
