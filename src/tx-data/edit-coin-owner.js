import defineProperties from '../define-properties.js';

export default class TxDataEditCoinOwner {
    constructor(data) {
        // Define Properties
        const fields = [
            {
                name: 'symbol',
                length: 10,
            }, {
                name: 'newOwner',
                length: 20,
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
