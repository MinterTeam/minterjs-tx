import {defineProperties, ecsign} from 'ethereumjs-util';

class MinterTxSignature {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'v',
                allowZero: true,
                default: new Buffer([0x1c]),
            }, {
                name: 'r',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new Buffer([]),
            }, {
                name: 's',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new Buffer([]),
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
     * @param msgHash
     * @param {Buffer} privateKey
     */
    sign(msgHash, privateKey) {
        const sig = ecsign(msgHash, privateKey);
        Object.assign(this, sig);

        return this;
    }
}

export default MinterTxSignature;
