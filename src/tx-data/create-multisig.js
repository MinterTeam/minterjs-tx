import defineProperties from '../define-properties';

class MinterTxDataCreateMultisig {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'threshold',
                default: Buffer.from([]),
            }, {
                name: 'weights',
                default: Buffer.from([]),
                allowNonBinaryArray: true,
            }, {
                name: 'addresses',
                default: Buffer.from([]),
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

export default MinterTxDataCreateMultisig;
