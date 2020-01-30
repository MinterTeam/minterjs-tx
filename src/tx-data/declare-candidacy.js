import {defineProperties} from 'ethereumjs-util/dist/object.js';

class TxDataDeclareCandidacy {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'address',
                allowZero: true,
                length: 20,
                default: Buffer.from([]),
            },
            {
                name: 'publicKey',
                allowZero: true,
                default: Buffer.from([]),
            },
            {
                name: 'commission',
                length: 1,
                allowZero: true,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'coin',
                length: 10,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'stake',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: Buffer.from([]),
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
}

export default TxDataDeclareCandidacy;
