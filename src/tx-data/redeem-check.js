import defineProperties from '../define-properties.js';

export default class TxDataRedeemCheck {
    constructor(data) {
        // Define Properties
        const fields = [
            {
                name: 'check',
            },
            {
                name: 'proof',
                // allow DataRedeemCheck without proof (it will be filled later from password)
                allowZero: true,
                length: 65,
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
