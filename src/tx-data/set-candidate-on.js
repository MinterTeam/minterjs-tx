import defineProperties from '../define-properties.js';

class TxDataSetCandidateOn {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'publicKey',
                allowZero: true,
                length: 32,
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

export default TxDataSetCandidateOn;
