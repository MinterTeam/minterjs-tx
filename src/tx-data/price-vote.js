import defineProperties from '../define-properties.js';

class TxDataPriceVote {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'price',
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

export default TxDataPriceVote;
