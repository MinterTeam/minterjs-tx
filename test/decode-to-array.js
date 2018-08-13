import ethUtil from 'ethereumjs-util';

export default function decodeToArray(serializedTxData) {
    return ethUtil.rlp.decode(serializedTxData).reduce((accumulator, item) => {
        accumulator.push([...item]);
        return accumulator;
    }, []);
}
