import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

class MinterTxDataDeclareCandidacy {
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
                name: 'rewardAddress',
                allowZero: true,
                length: 20,
                default: new Buffer([]),
            },
            {
                name: 'ownerAddress',
                allowZero: true,
                length: 20,
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

export default MinterTxDataDeclareCandidacy;
