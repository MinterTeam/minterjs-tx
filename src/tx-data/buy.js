import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

class BuyTransactionData {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coin_to_buy',
                allowZero: true,
                length: 10,
                default: new Buffer([]),
            },
            {
                name: 'value_to_buy',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new Buffer([]),
            },
            {
                name: 'coin_to_sell',
                allowZero: true,
                length: 10,
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

export default BuyTransactionData;
