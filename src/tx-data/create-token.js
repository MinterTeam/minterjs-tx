import defineProperties from '../define-properties.js';

export default class TxDataCreateCoin {
    constructor(data) {
        // Define Properties
        const fields = [
            {
                name: 'name',
                default: Buffer.from([]),
            }, {
                name: 'symbol',
                length: 10,
            }, {
                name: 'initialAmount',
                length: 32,
                allowLess: true,
            }, {
                name: 'maxSupply',
                length: 32,
                allowLess: true,
            }, {
                name: 'mintable',
                length: 1,
                allowLess: true,
            }, {
                name: 'burnable',
                length: 1,
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
        defineProperties(this, fields, data);
    }
}
