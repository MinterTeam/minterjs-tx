import defineProperties from '../define-properties.js';

class TxDataEditCandidatePublicKey {
    constructor(data) {
        // Define Properties
        const fields = [
            {
                name: 'publicKey',
                length: 32,
            },
            {
                name: 'newPublicKey',
                length: 32,
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
        defineProperties(this, fields, data);
    }
}

export default TxDataEditCandidatePublicKey;