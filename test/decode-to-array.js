import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

export default function decodeToArray(serializedTxData) {
    if (Array.isArray(serializedTxData)) {
        serializedTxData = Buffer.from(serializedTxData);
    }
    return ethUtil.rlp.decode(serializedTxData).reduce((accumulator, item) => {
        // if underlying data is non binary array
        // for create-multisig.test.js
        if (Array.isArray(item)) {
            item = ethUtil.rlp.encode(item);
        }
        // convert underlying buffer to array
        accumulator.push([...item]);
        return accumulator;
    }, []);
}
