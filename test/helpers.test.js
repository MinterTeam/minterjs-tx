import {Buffer} from 'safe-buffer';
import {coinToBuffer, bufferToCoin} from '~/src';

describe('coinToBuffer', () => {
    const mntBuffer = Buffer.from([77, 78, 84, 0, 0, 0, 0, 0, 0, 0]);

    test('from MNT', () => {
        expect(coinToBuffer('MNT')).toEqual(mntBuffer);
    });

    test('from mnt', () => {
        expect(coinToBuffer('mnt')).toEqual(mntBuffer);
    });

    test('from empty', () => {
        expect(coinToBuffer('')).toEqual(Buffer.alloc(10));
    });

    test('to MNT', () => {
        expect(bufferToCoin(mntBuffer)).toEqual('MNT');
    });

    test('to empty', () => {
        expect(bufferToCoin(Buffer.from([]))).toEqual('');
        expect(bufferToCoin(Buffer.alloc(10))).toEqual('');
    });
});
