import defineProperties from '../define-properties.js';

class TxDataDelegate {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'publicKey',
                length: 32,
                default: Buffer.from([]),
            },
            {
                name: 'coin',
                length: 4,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'stake',
                length: 32,
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
