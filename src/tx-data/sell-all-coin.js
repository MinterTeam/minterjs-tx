import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

class SellAllCoinTransactionData {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coin_to_sell',
                allowZero: true,
                length: 10,
                default: new Buffer([]),
            },
            {
                name: 'coin_to_buy',
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

export default SellAllCoinTransactionData;
