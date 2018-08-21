import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

class DelegateData {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'pubKey',
                allowZero: true,
                default: new Buffer([]),
            },
            {
                name: 'coin',
                length: 10,
                allowLess: true,
                default: new Buffer([]),
            },
            {
                name: 'stake',
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

export default DelegateData;
