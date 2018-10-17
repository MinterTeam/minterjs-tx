import {Buffer} from 'safe-buffer';

/**
 * Make 10 bytes padded Buffer
 * @param {string} coinSymbol
 * @returns {Buffer}
 */
export function formatCoin(coinSymbol) {
    const buf = new Buffer(10);
    Buffer.from(coinSymbol.toUpperCase()).copy(buf, 0, 0, 10);

    return buf;
}
