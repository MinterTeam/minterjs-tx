import defineProperties from './define-properties.js';
import TxSignature from './tx-signature.js';

class TxMultisignature {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'multisig',
                length: 20,
            }, {
                name: 'signatures',
                isNonBinaryArray: true,
                nonBinaryArrayTransform(item) {
                    return (new TxSignature(item)).raw;
                },
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

export default TxMultisignature;
