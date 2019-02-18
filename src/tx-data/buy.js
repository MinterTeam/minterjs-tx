import {Buffer} from 'safe-buffer';
import {defineProperties} from 'ethereumjs-util';

class MinterTxDataBuy {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coinToBuy',
                allowZero: true,
                length: 10,
                default: new Buffer([]),
            },
            {
                name: 'valueToBuy',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new Buffer([]),
            },
            {
                name: 'coinToSell',
                allowZero: true,
                length: 10,
                default: new Buffer([]),
            },
            {
                name: 'maximumValueToSell',
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
        defineProperties(this, fields, data);
    }
}

export default MinterTxDataBuy;
