import defineProperties from '../define-properties.js';

class TxDataBuy {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coinToBuy',
                length: 4,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'valueToBuy',
                length: 32,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'coinToSell',
                length: 4,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'maximumValueToSell',
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

export default TxDataBuy;
