import {Buffer} from 'safe-buffer';
import {defineProperties} from 'ethereumjs-util';

class MinterTxDataRedeemCheck {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'rawCheck',
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
        defineProperties(this, fields, data);
    }
}

export default MinterTxDataRedeemCheck;
