import defineProperties from '../define-properties.js';

class TxDataDelegate {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'publicKey',
                allowZero: true,
                default: Buffer.from([]),
            },
            {
                name: 'coin',
                length: 4,
                allowLess: true,
                allowZero: true,
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

export default TxDataDelegate;
