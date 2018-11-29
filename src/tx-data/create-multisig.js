import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

class MinterTxDataCreateMultisig {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'weights',
                default: new Buffer([]),
            }, {
                name: 'threshold',
                default: new Buffer([]),
            }, {
                name: 'addresses',
                default: new Buffer([]),
            }];

        /**
         * Returns the rlp encoding of the transaction
         * @method serialize
         * @return {Buffer}
         * @memberof Transaction
         * @name serialize
         */
        // attached serialize
        ethUtil.defineProperties(this, fields, data);
    }
}

export default MinterTxDataCreateMultisig;
