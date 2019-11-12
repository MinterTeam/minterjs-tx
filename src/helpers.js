
/**
 * Make 10 bytes padded Buffer from coin symbol string
 * @param {string} coinSymbol
 * @returns {Buffer}
 */
export function coinToBuffer(coinSymbol) {
    const buf = Buffer.alloc(10);
    Buffer.from(coinSymbol.toUpperCase()).copy(buf, 0, 0, 10);

    return buf;
}

/**
 * @deprecated
 * @type {function(string): Buffer}
 */
export const formatCoin = coinToBuffer;

/**
 * Convert 10 bytes padded Buffer to string of coin symbol
 * @param {Buffer} buf
 * @return {string}
 */
export function bufferToCoin(buf) {
    let sliceEnd = buf.length;
    while (buf[sliceEnd - 1] === 0) {
        sliceEnd -= 1;
    }
    buf = buf.subarray(0, sliceEnd);

    return buf.toString('utf-8');
}
