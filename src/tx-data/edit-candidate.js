import defineProperties from '../define-properties.js';

class TxDataDeclareCandidacy {
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
                name: 'newPublicKey',
                allowLess: true,
                length: 32,
                default: Buffer.from([]),
            },
            {
                name: 'rewardAddress',
                length: 20,
                default: Buffer.from([]),
            },
            {
                name: 'ownerAddress',
                length: 20,
                default: Buffer.from([]),
            },
            {
                name: 'controlAddress',
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
