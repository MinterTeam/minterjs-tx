import defineProperties from '../define-properties.js';

export default class TxDataSell {
    constructor(data, options) {
        // Define Properties
        const fields = [
            {
                name: 'coinToSell',
                length: 4,
                allowLess: true,
            },
            {
                name: 'valueToSell',
                length: 32,
                allowLess: true,
            },
            {
                name: 'coinToBuy',
                length: 4,
                allowLess: true,
            },
            {
                name: 'minimumValueToBuy',
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
