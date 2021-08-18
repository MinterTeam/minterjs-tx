import * as rlp from 'rlp';
import BN from 'bn.js';
import {rlphash} from 'ethereumjs-util/dist/hash.js';
import {publicToAddress} from 'ethereumjs-util/dist/account.js';
import {ecrecover} from 'ethereumjs-util/dist/signature.js';
import {bufferToInt} from 'ethereumjs-util/dist/bytes.js';
import defineProperties from './define-properties.js';

// secp256k1n/2
const N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16);

class Tx {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [{
            name: 'nonce',
            length: 32,
            allowLess: true,
        }, {
            name: 'chainId',
            length: 1,
        }, {
            name: 'gasPrice',
            length: 32,
            allowLess: true,
        }, {
            name: 'gasCoin',
            length: 4,
            allowLess: true,
        }, {
            name: 'type',
            length: 1,
        }, {
            name: 'data',
            alias: 'input',
        }, {
            name: 'payload',
            allowZero: true,
            default: Buffer.from([]),
        }, {
            name: 'serviceData',
            allowZero: true,
            default: Buffer.from([]),
        }, {
            name: 'signatureType',
            length: 1,
            allowLess: true,
            default: Buffer.from([]),
        }, {
            name: 'signatureData',
            default: Buffer.from([]),
        }];

        /**
         * @TODO deprecated @see https://github.com/ethereumjs/ethereumjs-account/issues/29 @see https://github.com/ethereumjs/ethereumjs-tx/issues/151
         * Returns the rlp encoding of the transaction
         * @method serialize
         * @return {Buffer}
         * @memberof Transaction
         * @name serialize
         */
        // attached serialize
        defineProperties(this, fields, data);

        /**
         * @property {Buffer} from (read only) sender address of this transaction, mathematically derived from other parameters.
         * @name from
         * @memberof Transaction
         */
        Object.defineProperty(this, 'from', {
            enumerable: true,
            configurable: true,
            get: this.getSenderAddress.bind(this),
        });
    }

    /**
     * Computes a sha3-256 hash of the serialized tx
     * @param {Boolean} [includeSignature=true] whether or not to include the signature
     * @return {Buffer}
     */
    hash(includeSignature) {
        if (includeSignature === undefined) {
            includeSignature = true;
        }

        // EIP155 spec:
        // when computing the hash of a transaction for purposes of signing or recovering,
        // instead of hashing only the first six elements (ie. nonce, gasprice, startgas, to, value, data),
        // hash nine elements, with v replaced by CHAIN_ID, r = 0 and s = 0

        let items;
        if (includeSignature) {
            items = this.raw;
        } else {
            // hash everything except signatureData
            items = this.raw.slice(0, -1);
        }

        // create hash
        return rlphash(items);
    }

    isSignatureTypeSingle() {
        return bufferToInt(this.signatureType) === 1;
    }

    isSignatureTypeMulti() {
        return bufferToInt(this.signatureType) === 2;
    }

    /**
     * returns the sender's address
     * @return {Buffer}
     */
    getSenderAddress() {
        if (this._from) {
            return this._from;
        }
        if (this.isSignatureTypeMulti()) {
            const multiSignature = rlp.decode(this.signatureData);
            this._from = multiSignature[0];
            return this._from;
        }
        const publicKey = this.getSenderPublicKey();
        this._from = publicToAddress(publicKey);
        return this._from;
    }

    /**
     * returns the public key of the sender
     * @return {Buffer}
     */
    getSenderPublicKey() {
        // eslint-disable-next-line unicorn/explicit-length-check
        if (!this._senderPublicKey || !this._senderPublicKey.length) {
            // eslint-disable-next-line unicorn/no-lonely-if
            if (!this.verifySignature()) {
                throw new Error('Invalid Signature');
            }
        }
        return this._senderPublicKey;
    }

    /**
     * Determines if the signature is valid
     * @return {Boolean}
     */
    verifySignature() {
        if (this.isSignatureTypeSingle()) {
            // Single signature
            const vrs = rlp.decode(this.signatureData);
            const messageHash = this.hash(false);

            return this._verifySignature(messageHash, vrs);
        } else {
            // Multi signature
            const multiSignature = rlp.decode(this.signatureData);
            const messageHash = this.hash(false);
            const hasErrors = multiSignature[1].some((item) => {
                return !this._verifySignature(messageHash, item);
            });
            return !hasErrors;
        }
    }

    _verifySignature(messageHash, vrs) {
        // All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
        if (new BN(vrs[2]).cmp(N_DIV_2) === 1) {
            return false;
        }

        try {
            const v = bufferToInt(vrs[0]);
            const senderPublicKey = ecrecover(messageHash, v, vrs[1], vrs[2]);
            if (this.isSignatureTypeSingle()) {
                this._senderPublicKey = senderPublicKey;
            }

            return !!senderPublicKey;
        } catch (error) {
            return false;
        }
    }

    /**
     * validates the signature and checks to see if it has enough gas
     * @param {Boolean} [stringError=false] whether to return a string with a description of why the validation failed or return a Bloolean
     * @return {Boolean|String}
     */
    validate(stringError) {
        const errors = [];
        if (!this.verifySignature()) {
            errors.push('Invalid Signature');
        }

        if (stringError === undefined || stringError === false) {
            return errors.length === 0;
        } else {
            return errors.join(' ');
        }
    }
}

export default Tx;
