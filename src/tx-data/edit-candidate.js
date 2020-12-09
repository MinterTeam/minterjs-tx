import defineProperties from '../define-properties.js';

export default class TxDataEditCandidate {
    constructor(data) {
        // Define Properties
        const fields = [
            {
                name: 'publicKey',
                length: 32,
            },
            {
                name: 'rewardAddress',
                length: 20,
            },
            {
                name: 'ownerAddress',
                length: 20,
            },
            {
                name: 'controlAddress',
                length: 20,
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
