import defineProperties from '../define-properties.js';

export default class TxDataVotePrice {
    constructor(data) {
        // Define Properties
        const fields = [
            {
                name: 'price',
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
}
