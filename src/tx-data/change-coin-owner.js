import defineProperties from '../define-properties.js';

class TxDataChangeCoinOwner {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'symbol',
                allowZero: true,
                length: 10,
                default: Buffer.from([]),
            }, {
                name: 'newOwner',
                allowZero: true,
                length: 20,
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

export default TxDataChangeCoinOwner;
