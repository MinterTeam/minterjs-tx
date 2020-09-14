import defineProperties from '../define-properties.js';

class TxDataRedeemCheck {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'check',
                default: Buffer.from([]),
            },
            {
                name: 'proof',
                length: 65,
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

export default TxDataRedeemCheck;
