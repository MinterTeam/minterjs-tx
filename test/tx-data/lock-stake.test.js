import {TX_TYPE, toBuffer} from 'minterjs-util';
import {TxData, TxDataLockStake} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataLockStake', () => {
    const params = {
    };

    const serializedTxData = (new TxDataLockStake(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.LOCK_STAKE).serialize()).toEqual(serializedTxData);
    });

    test('TxData without arguments', () => {
        expect(TxData(undefined, TX_TYPE.LOCK_STAKE).serialize()).toEqual(serializedTxData);
    });
});
