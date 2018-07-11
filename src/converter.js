import {BigNumber} from 'bignumber.js';

const DECIMALS = 18;

export default {
    convert(num, to) {
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
    },
};
