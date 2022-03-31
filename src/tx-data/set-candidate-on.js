import defineProperties from '../define-properties.js';

export default class TxDataSetCandidateOn {
    constructor(data, options) {
        // Define Properties
        const fields = [
            {
                name: 'publicKey',
                length: 32,
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
