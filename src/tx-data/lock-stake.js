import defineProperties from '../define-properties.js';

export default class TxDataLockStake {
    constructor(data) {
        // Define Properties
        const fields = [];

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
