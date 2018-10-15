import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

export default function decodeToArray(serializedTxData) {
    if (Array.isArray(serializedTxData)) {
        serializedTxData = Buffer.from(serializedTxData);
    }
    return ethUtil.rlp.decode(serializedTxData).reduce((accumulator, item) => {
        accumulator.push([...item]);
        return accumulator;
    }, []);
}
