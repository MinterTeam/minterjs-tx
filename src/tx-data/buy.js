import {defineProperties} from 'ethereumjs-util/dist/object.js';

class TxDataBuy {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coinToBuy',
                allowZero: true,
                length: 10,
                default: Buffer.from([]),
            },
            {
                name: 'valueToBuy',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'coinToSell',
                allowZero: true,
                length: 10,
                default: Buffer.from([]),
            },
            {
                name: 'maximumValueToSell',
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

export default TxDataBuy;
