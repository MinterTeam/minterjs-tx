import {Buffer} from 'safe-buffer';
import {defineProperties} from 'minterjs-util';
import MinterTxDataSend from './send';

class MinterTxDataMultisend {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'list',
                default: new Buffer([]),
                allowNonBinaryArray: true,
                nonBinaryArrayTransform(item) {
                    return (new MinterTxDataSend(item)).raw;
                },
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

export default MinterTxDataMultisend;
