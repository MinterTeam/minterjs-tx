export const TX_TYPE_SEND = '0x01';
export const TX_TYPE_SELL = '0x02';
export const TX_TYPE_SELL_ALL = '0x03';
export const TX_TYPE_BUY = '0x04';
export const TX_TYPE_CREATE_COIN = '0x05';
export const TX_TYPE_DECLARE_CANDIDACY = '0x06';
export const TX_TYPE_DELEGATE = '0x07';
export const TX_TYPE_UNBOND = '0x08';
export const TX_TYPE_REDEEM_CHECK = '0x09';
export const TX_TYPE_SET_CANDIDATE_ON = '0x0A';
export const TX_TYPE_SET_CANDIDATE_OFF = '0x0B';
export const TX_TYPE_CREATE_MULTISIG = '0x0C';
export const TX_TYPE_MULTISEND = '0x0D';
export const TX_TYPE_EDIT_CANDIDATE = '0x0E';


/** @type {Array<{hex: string, name: string}>} */
const txTypeList = [];

/**
 * @param hex
 * @param name
 */
function fillList(hex, name) {
    const result = {};

    result.name = name;
    result.number = Number(hex);
    result.hex = hex;

    txTypeList[result.number] = result;

    return result;
}
fillList(TX_TYPE_SEND, 'send');
fillList(TX_TYPE_SELL, 'sell');
fillList(TX_TYPE_SELL_ALL, 'sell all');
fillList(TX_TYPE_BUY, 'buy');
fillList(TX_TYPE_CREATE_COIN, 'create coin');
fillList(TX_TYPE_DECLARE_CANDIDACY, 'declare candidacy');
fillList(TX_TYPE_DELEGATE, 'delegate');
fillList(TX_TYPE_UNBOND, 'unbond');
fillList(TX_TYPE_REDEEM_CHECK, 'redeem check');
fillList(TX_TYPE_SET_CANDIDATE_ON, 'set candidate on');
fillList(TX_TYPE_SET_CANDIDATE_OFF, 'set candidate off');
fillList(TX_TYPE_CREATE_MULTISIG, 'create multisig');
fillList(TX_TYPE_MULTISEND, 'multisend');
fillList(TX_TYPE_EDIT_CANDIDATE, 'edit candidate');

export {txTypeList};
