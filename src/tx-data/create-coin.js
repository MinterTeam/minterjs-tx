import defineProperties from '../define-properties.js';

class TxDataCreateCoin {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'name',
                allowZero: true,
                default: Buffer.from([]),
            }, {
                name: 'symbol',
                allowZero: true,
                length: 10,
                default: Buffer.from([]),
            }, {
                name: 'initialAmount',
                length: 32,
                allowLess: true,
                default: Buffer.from([]),
            }, {
                name: 'initialReserve',
                length: 32,
                allowLess: true,
                default: Buffer.from([]),
            }, {
                name: 'constantReserveRatio',
                length: 1,
                allowLess: true,
                default: Buffer.from([]),
            }, {
                name: 'maxSupply',
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

export default TxDataCreateCoin;
