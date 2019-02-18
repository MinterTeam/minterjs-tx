import {Buffer} from 'safe-buffer';
import {defineProperties} from 'ethereumjs-util';

class MinterTxDataSetCandidateOn {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'pubKey',
                allowZero: true,
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

export default MinterTxDataSetCandidateOn;
