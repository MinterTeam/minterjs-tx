import {Buffer} from 'safe-buffer';

/**
 * Make 10 bytes padded Buffer
 * @param {string} coinSymbol
 * @returns {Buffer}
 */
export function coinToBuffer(coinSymbol) {
    const buf = new Buffer(10);
    Buffer.from(coinSymbol.toUpperCase()).copy(buf, 0, 0, 10);

    return buf;
}

export const formatCoin = coinToBuffer;

export function bufferToCoin(buf) {
    let sliceEnd = buf.length;
    while (buf[sliceEnd - 1] === 0) {
        sliceEnd -= 1;
    }
    buf = buf.subarray(0, sliceEnd);

    return buf.toString('utf-8');
}
