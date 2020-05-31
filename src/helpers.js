import {coinToBuffer, bufferToCoin} from 'minterjs-util';

export {coinToBuffer, bufferToCoin};

/**
 * @deprecated
 * @type {function(string): Buffer}
 */
export const formatCoin = coinToBuffer;
