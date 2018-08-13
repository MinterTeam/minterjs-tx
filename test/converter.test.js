import converter from '../src/converter';

describe('converter', () => {
    test('convert to pip', () => {
        const bips = 1.234;
        expect(converter.convert(bips, 'pip').toString()).toEqual('1234000000000000000');
    });

    test('convert to bip', () => {
        const pips = 1234;
        expect(converter.convert(pips, 'bip').toString()).toEqual((0.000000000000001234).toString());
    });

    test('convert 0x', () => {
        const bips = '0x';

        expect(converter.convert(bips, 'pip').toString()).toEqual('0');
    });

    test('convert to unknown type', () => {
        const bips = 12345;

        expect(() => converter.convert(bips, 'mnb')).toThrow();
    });
});
