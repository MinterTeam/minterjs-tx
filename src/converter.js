import {BigNumber} from 'bignumber.js';

const DECIMALS = 18;


/**
 * @param {number,string,BigNumber} num
 * @param to
 * @return {BigNumber}
 */
function convert(num, to) {
    if (num === '0x') {
        num = '0x0';
    }

    const pow = new BigNumber(10).pow(DECIMALS);

    if (to === 'pip') {
        return new BigNumber(num).multipliedBy(pow).integerValue();
    } else if (to === 'bip') {
        return new BigNumber(num).dividedBy(pow);
    }

    throw String('Unknown type');
}

/**
 * Multiply value by 10^18
 * @param {number,string,BigNumber} num
 * @return {BigNumber}
 */
function convertToPip(num) {
    return convert(num, 'pip');
}

/**
 * Multiply value by 10^-18
 * @param {number,string,BigNumber} num
 * @return {BigNumber}
 */
function convertFromPip(num) {
    return convert(num, 'bip');
}

export default {
    convert,
    bipToPip: convertToPip,
    pipToBip: convertFromPip,
};

export {convert, convertToPip, convertFromPip};
