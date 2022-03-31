import defineProperties from '../define-properties.js';

export default class TxDataRemoveLimitOrder {
    constructor(data, options) {
        // Define Properties
        const fields = [
            {
                name: 'id',
                length: 32,
                allowLess: true,
            },
        ];

        /**
         * Returns the rlp encoding of the transaction
         * @method serialize
         * @return {Buffer}
         * @memberof Transaction
         * @name serialize
         */
        // attached serialize
        defineProperties(this, fields, data, options);
    }
}
