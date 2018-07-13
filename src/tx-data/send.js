import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

class SendTransactionData {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coin',
                length: 10,
                allowLess: true,
                default: new Buffer([]),
            }, {
                name: 'to',
                allowZero: true,
                length: 20,
                default: new Buffer([]),
            }, {
                name: 'value',
                length: 32,
                allowZero: true,
                allowLess: true,
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

export default SendTransactionData;
