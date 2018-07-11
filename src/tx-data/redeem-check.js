import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

class RedeemCheckTransactionData {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'check',
                allowZero: true,
                default: new Buffer([]),
            },
            {
                name: 'proof',
                allowZero: true,
                length: 65,
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

export default RedeemCheckTransactionData;
