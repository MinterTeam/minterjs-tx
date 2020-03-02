import defineProperties from '../define-properties.js';

class TxDataSend {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coin',
                length: 10,
                allowLess: true,
                default: Buffer.from([]),
            }, {
                name: 'to',
                allowZero: true,
                length: 20,
                default: Buffer.from([]),
            }, {
                name: 'value',
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

export default TxDataSend;
