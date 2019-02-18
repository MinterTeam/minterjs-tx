import {Buffer} from 'safe-buffer';
import {defineProperties} from 'ethereumjs-util';

class MinterTxDataCreateCoin {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'name',
                allowZero: true,
                default: new Buffer([]),
            }, {
                name: 'symbol',
                allowZero: true,
                length: 10,
                default: new Buffer([]),
            }, {
                name: 'initialAmount',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new Buffer([]),
            }, {
                name: 'initialReserve',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new Buffer([]),
            }, {
                name: 'constantReserveRatio',
                length: 1,
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

export default MinterTxDataCreateCoin;
