import {formatCoin} from '../src/helpers';
import {Buffer} from 'safe-buffer';

describe('formatCoin', () => {
    test('MNT', () => {
        expect(formatCoin('MNT')).toEqual(Buffer.from([77, 78, 84, 0, 0, 0, 0, 0, 0, 0]));
    });

    test('mnt', () => {
        expect(formatCoin('mnt')).toEqual(Buffer.from([77, 78, 84, 0, 0, 0, 0, 0, 0, 0]));
    });

    test('empty', () => {
        expect(formatCoin('')).toEqual(Buffer.alloc(10));
    });
});
