import defineProperties from '../define-properties.js';

class TxDataDeclareCandidacy {
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
                name: 'rewardAddress',
                allowZero: true,
                length: 20,
                default: Buffer.from([]),
            },
            {
                name: 'ownerAddress',
                allowZero: true,
                length: 20,
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

export default TxDataDeclareCandidacy;
