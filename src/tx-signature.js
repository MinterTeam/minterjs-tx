import {ecsign} from 'ethereumjs-util/dist/signature.js';
import defineProperties from './define-properties.js';

class TxSignature {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'v',
                default: Buffer.from([0x1c]),
            }, {
                name: 'r',
                length: 32,
                allowLess: true,
            }, {
                name: 's',
                length: 32,
                allowLess: true,
            }];

        /**
         * Returns the rlp encoding of the transaction
         * @method serialize
         * @return {Buffer}
         * @memberof Transaction
         * @name serialize
         */
        // attached serialize
        defineProperties(this, fields, data);
    }

    /**
     * sign a transaction with a given a private key
     * @param messageHash
     * @param {Buffer} privateKey
     */
    sign(messageHash, privateKey) {
        const rsvSig = ecsign(messageHash, privateKey);
        Object.assign(this, rsvSig);

        return this;
    }
}

export default TxSignature;
