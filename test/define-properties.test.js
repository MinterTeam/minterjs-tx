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
        assert.equal(someOb.r.toString('hex'), '04');

        someOb.r = Buffer.from([0, 0, 0, 0, 4]);
        assert.equal(someOb.r.toString('hex'), '04');
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

    it('it should accept rlp encoded intial data', () => {
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
        const rlpEncoded = someOb.serialize().toString('hex');
        defineProperties(someOb2, fields, rlpEncoded);
        assert.equal(someOb2.serialize().toString('hex'), rlpEncoded, 'the constuctor should accept rlp encoded buffers');

        const someOb3 = {};
        defineProperties(someOb3, fields, expectedArray);
        assert.deepEqual(someOb.toJSON(), expectedArray, 'should produce the correctly object');
    });

    it('it should not accept invalid values in the constuctor', () => {
        const someOb = {};
        assert.throws(() => {
            defineProperties(someOb, fields, 5);
        }, 'should throw on nonsensical data');

        assert.throws(() => {
            defineProperties(someOb, fields, Array(6));
        }, 'should throw on invalid arrays');
    });

    it('alias should work ', () => {
        const someOb = {};
        const data = {
            aword: '0x01',
            cannotBeZero: '0x02',
            value: '0x03',
            r: '0x04',
        };

        defineProperties(someOb, fields, data);
        assert.equal(someOb.blah.toString('hex'), '01');
        someOb.blah = '0x09';
        assert.equal(someOb.blah.toString('hex'), '09');
        assert.equal(someOb.aword.toString('hex'), '09');
    });

    it('alias should work #2', () => {
        const someOb = {};
        const data = { blah: '0x1' };

        defineProperties(someOb, fields, data);
        assert.equal(someOb.blah.toString('hex'), '01');
        assert.equal(someOb.aword.toString('hex'), '01');
    });
});
