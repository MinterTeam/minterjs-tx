import {Buffer} from 'safe-buffer'
import * as helpers from '../src/helpers'

test('mToBuffer() address', () => {
    const address = helpers.mToBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16')
    const buf = Buffer.from('7633980c000139dd3bd24a3f54e06474fa941e16', 'hex')
    expect(address).toEqual(buf)
})

test('mToBuffer() null', () => {
    const address = helpers.mToBuffer(null).toString('hex')
    const buf = new Buffer([]).toString('hex')
    expect(address).toEqual(buf)
})
