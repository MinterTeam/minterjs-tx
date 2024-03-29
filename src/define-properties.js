import * as rlp from 'rlp';
import {baToJSON, unpadBuffer} from 'ethereumjs-util/dist/bytes.js';
import {stripHexPrefix} from 'ethjs-util';
import assert from 'assert';
import {toBuffer} from 'minterjs-util';

/**
 * @typedef {Object} FieldSettings
 * @property {string} name - the name of the properties
 * @property {string} [alias] - alias to the name
 * @property {*} [default] - default value
 * @property {number} [length] - the number of bytes the field can have
 * @property {boolean} [allowLess] - if the field can be less than the length
 * @property {boolean} [allowZero]
 * @property {boolean} [isNonBinaryArray] - if the field can be non binary array
 * @property {function} [nonBinaryArrayTransform] - function to transform each item of the non binary array
 * @property {boolean} [storeNullAsArray] - store falsy values as rlp array `0xc0` (to distinguish from `0x80` integer zero @see https://eth.wiki/en/fundamentals/rlp#examples)
 */

/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param {Object} self the `Object` to define properties on
 * @param {Array<FieldSettings>} fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowZero`
 * * `isNonBinaryArray` - if the field can be non binary array
 * * `nonBinaryArrayTransform` - function to transform each item of the non binary array
 * @param {*} [data] data to be validated against the definitions
 * @param {TxDataExtraOptions} [options]
 */
export default function definePropertiesNonBinary(self, fields, data, options = {}) {
    self.raw = [];
    self._fields = [];

    // attach the `toJSON`
    self.toJSON = function toJSON(label) {
        /* eslint-disable unicorn/prevent-abbreviations */
        if (label) {
            const obj = {};
            self._fields.forEach((field) => {
                obj[field] = `0x${self[field].toString('hex')}`;
            });
            return obj;
        }
        return baToJSON(this.raw);
    };

    self.serialize = function serialize() {
        return rlp.encode(self.raw);
    };

    self.serializeToString = function serialize() {
        return `0x${self.serialize().toString('hex')}`;
    };

    fields.forEach((field, i) => {
        self._fields.push(field.name);
        function getter() {
            return self.raw[i];
        }
        function setter(v) {
            if (typeof field.isNonBinaryArray === 'undefined' && field.allowNonBinaryArray) {
                field.isNonBinaryArray = field.allowNonBinaryArray;
                console.warn('allowNonBinaryArray is deprecated, use isNonBinaryArray instead');
            }
            if (field.isNonBinaryArray) {
                if (typeof v === 'undefined') {
                    v = [];
                }
                if (!Array.isArray(v)) {
                    throw new TypeError('Invalid value for isNonBinaryArray field');
                }
                if (field.nonBinaryArrayTransform && typeof field.nonBinaryArrayTransform === 'function') {
                    v = v.map((item) => field.nonBinaryArrayTransform(item));
                } else {
                    v = v.map((item) => toBuffer(item));
                }

                // cast 0x00 to 0x, to represent in RLP as 0x80 instead of 0x00
                v = v.map((item) => {
                    if (item.toString('hex') === '00' /* && !field.allowZero */) {
                        return Buffer.from([]);
                    }
                    return item;
                });
            } else if (typeof v === 'undefined' && options.forceDefaultValues && !field.allowLess && field.length > 0) {
                // fill with zeros
                v = Buffer.alloc(field.length, 0);
            } else if (field.storeNullAsArray && ((!v && v !== 0) || (Array.isArray(v) && v.length === 0))) {
                v = [];
            } else {
                v = toBuffer(v);

                if (v.toString('hex') === '00' && !field.allowZero) {
                    v = Buffer.from([]);
                }

                if (field.allowLess && field.length > 0) {
                    v = unpadBuffer(v);
                    assert(field.length >= v.length, `The field ${field.name} must not have more ${field.length} bytes`);
                } else if (!(field.allowZero && v.length === 0) && field.length > 0) {
                    // not allowedZero and not allowLess
                    assert(field.length === v.length, `The field ${field.name} must have byte length of ${field.length}`);
                }
            }

            self.raw[i] = v;
        }

        Object.defineProperty(self, field.name, {
            enumerable: true,
            configurable: true,
            get: getter,
            set: setter,
        });

        if (field.default) {
            self[field.name] = field.default;
        } else if (options.forceDefaultValues) {
            // trigger setter, even if no data passed
            self[field.name] = undefined;
        }

        // attach alias
        if (field.alias) {
            Object.defineProperty(self, field.alias, {
                enumerable: false,
                configurable: true,
                set: setter,
                get: getter,
            });
        }
    });

    // if the constructor is passed data
    if (data) {
        if (typeof data === 'string') {
            data = Buffer.from(stripHexPrefix(data), 'hex');
        }

        if (Buffer.isBuffer(data)) {
            data = rlp.decode(data);
        }

        if (Array.isArray(data)) {
            if (data.length > self._fields.length) {
                throw new Error('wrong number of fields in data');
            }

            // set fields from array
            data.forEach((d, i) => {
                self[self._fields[i]] = d;
            });
        } else if (typeof data === 'object') {
            const keys = Object.keys(data);
            fields.forEach((field) => {
                if (keys.indexOf(field.name) !== -1) self[field.name] = data[field.name];
                if (keys.indexOf(field.alias) !== -1) self[field.alias] = data[field.alias];
            });
        } else {
            throw new TypeError('invalid data');
        }
    }

    return self;
}

/**
 * @typedef {Object} TxDataExtraOptions
 * @property {boolean} [forceDefaultValues]
 */
