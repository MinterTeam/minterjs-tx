import ethUtil from 'ethereumjs-util';
import {Buffer} from 'safe-buffer';

export function formatCoin(coinSymbol) {
    const buf = new Buffer(10);
    Buffer.from(coinSymbol.toUpperCase()).copy(buf, 0, 0, 10);

    return buf;
}

/**
 * Replace Minter prefixes with hex prefix
 * @param {string} value
 */
export function mPrefixToHex(value) {
    return value.replace(/^(Mx|Mp|Mt|Mc|Mh)/, '0x');
}

/**
 * Strip Minter prefixes
 * @param {string} value
 */
export function mPrefixStrip(value) {
    return value.replace(/^(Mx|Mp|Mt|Mc|Mh)/, '');
}

/**
 * Converts Minter prefixed value to Buffer
 * @param value
 * @return {Buffer}
 */
export function mToBuffer(value) {
    if (typeof value === 'string') {
        value = mPrefixToHex(value);
    }

    return ethUtil.toBuffer(value);
}
