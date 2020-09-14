import defineProperties from '../define-properties.js';

class TxDataSellAll {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coinToSell',
                length: 4,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'coinToBuy',
                length: 4,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'minimumValueToBuy',
                length: 32,
                allowLess: true,
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

export default TxDataSellAll;
