import defineProperties from '../define-properties.js';

export default class TxDataCreateMultisig {
    constructor(data) {
        // Define Properties
        const fields = [
            {
                name: 'threshold',
                // length: 2,
                // allowLess: true,
            }, {
                name: 'weights',
                isNonBinaryArray: true,
            }, {
                name: 'addresses',
                isNonBinaryArray: true,
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
