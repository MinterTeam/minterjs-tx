import {Buffer} from 'safe-buffer';
import defineProperties from 'minterjs-util/src/define-properties';

class MinterTxDataCreateMultisig {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'threshold',
                default: new Buffer([]),
            }, {
                name: 'weights',
                default: new Buffer([]),
                allowNonBinaryArray: true,
            }, {
                name: 'addresses',
                default: new Buffer([]),
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
