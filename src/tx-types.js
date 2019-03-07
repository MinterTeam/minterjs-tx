export const TX_TYPE_SEND = '0x01';
export const TX_TYPE_SELL_COIN = '0x02';
export const TX_TYPE_SELL_ALL_COIN = '0x03';
export const TX_TYPE_BUY_COIN = '0x04';
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


const txTypeList = [];

/**
 * @param hex
 * @param name
 * @return {str}
 * @constructor
 */
function fillList(hex, name) {
    const result = {};

    result.name = name;
    result.number = Number(hex);
    result.hex = hex;

    txTypeList[result.number] = result;

    return result;
}
fillList('0x01', 'send');
fillList('0x02', 'sell');
fillList('0x03', 'sell all');
fillList('0x04', 'buy');
fillList('0x05', 'create coin');
fillList('0x06', 'declare candidacy');
fillList('0x07', 'delegate');
fillList('0x08', 'unbond');
fillList('0x09', 'redeem check');
fillList('0x0A', 'set candidate on');
fillList('0x0B', 'set candidate off');
fillList('0x0C', 'create multisig');
fillList('0x0D', 'multisend');
fillList('0x0E', 'edit candidate');

export {txTypeList};
