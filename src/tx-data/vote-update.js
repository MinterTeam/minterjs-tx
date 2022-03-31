import defineProperties from '../define-properties.js';

export default class TxDataVoteUpdate {
    constructor(data, options) {
        // Define Properties
        const fields = [
            {
                name: 'version',
            },
            {
                name: 'publicKey',
                length: 32,
            },
            {
                name: 'height',
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
