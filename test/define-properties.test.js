/**
 * copied from https://github.com/ethereumjs/ethereumjs-util/blob/master/test/defineFields.js
 */
import {zeros} from 'ethereumjs-util';
import {defineProperties} from '~/src';

const assert = require('assert');

describe('define', () => {
    const fields = [{
        name: 'aword',
        alias: 'blah',
        word: true,
        default: Buffer.allocUnsafe(0),
    }, {
        name: 'empty',
        allowZero: true,
        length: 20,
        default: Buffer.allocUnsafe(0),
    }, {
        name: 'cannotBeZero',
        allowZero: false,
        default: Buffer.from([0]),
    }, {
        name: 'value',
        default: Buffer.allocUnsafe(0),
    }, {
        name: 'r',
        length: 32,
        allowLess: true,
        default: zeros(32),
    }];

    it('should trim zeros', () => {
        const someOb = {};
        defineProperties(someOb, fields);
        // Define Properties
        someOb.r = '0x00004';
        expect(someOb.r.toString('hex')).toEqual('04');

        someOb.r = Buffer.from([0, 0, 0, 0, 4]);
        expect(someOb.r.toString('hex')).toEqual('04');
    });

    it('shouldn\'t allow wrong size for exact size requirements', () => {
        const someOb = {};
        defineProperties(someOb, fields);

        assert.throws(() => {
            const tmp = [{
                name: 'mustBeExactSize',
                allowZero: false,
                length: 20,
                default: Buffer.from([1, 2, 3, 4]),
            }];
            defineProperties(someOb, tmp);
        });
    });

    it('should accept rlp encoded initial data', () => {
        const someOb = {};
        const data = {
            aword: '0x01',
            cannotBeZero: '0x02',
            value: '0x03',
            r: '0x04',
        };

        const expected = {
            aword: '0x01',
            empty: '0x',
            cannotBeZero: '0x02',
            value: '0x03',
            r: '0x04',
        };

        const expectedArray = [
            '0x01', '0x', '0x02', '0x03', '0x04',
        ];

        defineProperties(someOb, fields, data);
        assert.deepEqual(someOb.toJSON(true), expected, 'should produce the correctly labeled object');

        const someOb2 = {};
        const rlpEncoded = someOb.serializeToString();
        defineProperties(someOb2, fields, rlpEncoded);
        assert.equal(someOb2.serializeToString(), rlpEncoded, 'the constuctor should accept rlp encoded buffers');

        const someOb3 = {};
        defineProperties(someOb3, fields, expectedArray);
        assert.deepEqual(someOb.toJSON(), expectedArray, 'should produce the correctly object');
    });

    it('should not accept invalid values in the constructor', () => {
        const someOb = {};
        assert.throws(() => {
            defineProperties(someOb, fields, 5);
        }, 'should throw on nonsensical data');

        assert.throws(() => {
            defineProperties(someOb, fields, new Array(6));
        }, 'should throw on invalid arrays');
    });

    it('alias should work', () => {
        const someOb = {};
        const data = {
            aword: '0x01',
            cannotBeZero: '0x02',
            value: '0x03',
            r: '0x04',
        };

        defineProperties(someOb, fields, data);
        expect(someOb.blah.toString('hex')).toEqual('01');
        someOb.blah = '0x09';
        expect(someOb.blah.toString('hex')).toEqual('09');
        expect(someOb.aword.toString('hex')).toEqual('09');
    });

    it('alias should work #2', () => {
        const someOb = {};
        const data = { blah: '0x1' };

        defineProperties(someOb, fields, data);
        expect(someOb.blah.toString('hex')).toEqual('01');
        expect(someOb.aword.toString('hex')).toEqual('01');
    });

    describe('storeNullAsArray', () => {
        it('works from undefined', () => {
            const someOb = defineProperties({}, [{
                name: 'test',
                storeNullAsArray: true,
            }], [undefined]);
            expect(someOb.serializeToString()).toEqual('0xc1c0');
        });

        it('works from empty array', () => {
            const someOb = defineProperties({}, [{
                name: 'test',
                storeNullAsArray: true,
            }], [[]]);
            expect(someOb.serializeToString()).toEqual('0xc1c0');
        });
    });

    it('not storeNullAsArray for undefined', () => {
        const someOb = defineProperties({}, [{
            name: 'test',
            storeNullAsArray: false,
        }], [undefined]);
        expect(someOb.serializeToString()).toEqual('0xc180');
    });

    it('not storeNullAsArray for empty array', () => {
        const someOb = defineProperties({}, [{
            name: 'test',
            storeNullAsArray: false,
        }], [[]]);
        expect(someOb.serializeToString()).toEqual('0xc180');
    });
});
