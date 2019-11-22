import * as rlp from 'rlp';
import BN from 'bn.js';
import {defineProperties} from 'ethereumjs-util/dist/object';
import {rlphash} from 'ethereumjs-util/dist/hash';
import {publicToAddress} from 'ethereumjs-util/dist/account';
import {ecrecover} from 'ethereumjs-util/dist/signature';
import {bufferToInt} from 'ethereumjs-util/dist/bytes';

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
            default: Buffer.from([]),
        }, {
            name: 'chainId',
            length: 1,
            allowLess: true,
            default: Buffer.from([]),
        }, {
            name: 'gasPrice',
            length: 32,
            allowLess: true,
            default: Buffer.from([]),
        }, {
            name: 'gasCoin',
            length: 10,
            allowLess: true,
            default: Buffer.from([]),
        }, {
            name: 'type',
            length: 1,
            allowLess: true,
            default: Buffer.from([]),
        }, {
            name: 'data',
            alias: 'input',
            allowZero: true,
            default: Buffer.from([]),
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
            allowZero: true,
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
            items = this.raw.slice(0, this.raw.length - 1);
        }

        // create hash
        return rlphash(items);
    }

    /**
     * returns the sender's address
     * @return {Buffer}
     */
    getSenderAddress() {
        if (this._from) {
            return this._from;
        }
        const pubkey = this.getSenderPublicKey();
        this._from = publicToAddress(pubkey);
        return this._from;
    }

    /**
     * returns the public key of the sender
     * @return {Buffer}
     */
    getSenderPublicKey() {
        if (!this._senderPubKey || !this._senderPubKey.length) {
            if (!this.verifySignature()) {
                throw new Error('Invalid Signature');
            }
        }
        return this._senderPubKey;
    }

    /**
     * Determines if the signature is valid
     * @return {Boolean}
     */
    verifySignature() {
        const vrs = rlp.decode(this.signatureData);
        const msgHash = this.hash(false);
        // All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
        if (new BN(vrs[2]).cmp(N_DIV_2) === 1) {
            return false;
        }

        try {
            const v = bufferToInt(vrs[0]);
            this._senderPubKey = ecrecover(msgHash, v, vrs[1], vrs[2]);
        } catch (e) {
            return false;
        }

        return !!this._senderPubKey;
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
