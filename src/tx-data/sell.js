import defineProperties from '../define-properties.js';

class TxDataSell {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coinToSell',
                length: 4,
                allowZero: true,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'valueToSell',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'coinToBuy',
                length: 4,
                allowZero: true,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'minimumValueToBuy',
                length: 32,
                allowZero: true,
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

export default TxDataSell;
