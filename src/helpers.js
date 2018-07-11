export function formatCoin (coinSymbol) {
    let buf = new Buffer(10)
    Buffer.from(coinSymbol).copy(buf, 0, 0, 10)

    return buf
}

/**
 * Replace Minter prefixes with hex prefix
 * @param {string} value
 */
export function mPrefixToHex(value) {
    return value.replace(/^(Mx|Mp|Mt|Mc|Mh)/, '0x')
}

/**
 * Strip Minter prefixes
 * @param {string} value
 */
export function mPrefixStrip(value) {
    return value.replace(/^(Mx|Mp|Mt|Mc|Mh)/, '')
}
