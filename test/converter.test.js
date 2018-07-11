import converter from '../src/converter'

describe('converter', () => {
    test('convert to pip', () => {
        const bips = 1.234

        expect(converter.convert(bips, 'pip').toString()).toEqual('123400000')
    })

    test('convert to bip', () => {
        const pips = 1234

        expect(converter.convert(pips, 'bip').toString()).toEqual('0.00001234')
    })
})
