import {defineProperties} from 'ethereumjs-util/dist/object';

class MinterTxDataDelegate {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'pubKey',
                allowZero: true,
                default: Buffer.from([]),
            },
            {
                name: 'coin',
                length: 10,
                allowLess: true,
                default: Buffer.from([]),
            },
            {
                name: 'stake',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: Buffer.from([]),
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

export default MinterTxDataDelegate;
