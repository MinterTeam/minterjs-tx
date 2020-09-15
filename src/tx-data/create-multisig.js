import defineProperties from '../define-properties.js';

class TxDataCreateMultisig {
    constructor(data) {
        // Define Properties
        const fields = [
            {
                name: 'threshold',
            }, {
                name: 'weights',
                allowNonBinaryArray: true,
            }, {
                name: 'addresses',
                allowNonBinaryArray: true,
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

export default TxDataCreateMultisig;
