import defineProperties from '../define-properties.js';

export default class TxDataMintToken {
    constructor(data, options) {
        // Define Properties
        const fields = [
            {
                name: 'coin',
                length: 4,
                allowLess: true,
            },
            {
                name: 'value',
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
        defineProperties(this, fields, data, options);
    }
}
