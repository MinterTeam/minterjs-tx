import defineProperties from '../define-properties.js';

export default class TxDataBuy {
    constructor(data, options) {
        // Define Properties
        const fields = [
            {
                name: 'coinToBuy',
                length: 4,
                allowLess: true,
            },
            {
                name: 'valueToBuy',
                length: 32,
                allowLess: true,
            },
            {
                name: 'coinToSell',
                length: 4,
                allowLess: true,
            },
            {
                name: 'maximumValueToSell',
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
