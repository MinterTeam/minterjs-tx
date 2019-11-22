/**
 * @enum {string}
 */
export const TX_TYPE = {
    SEND: '0x01',
    SELL: '0x02',
    SELL_ALL: '0x03',
    BUY: '0x04',
    CREATE_COIN: '0x05',
    DECLARE_CANDIDACY: '0x06',
    DELEGATE: '0x07',
    UNBOND: '0x08',
    REDEEM_CHECK: '0x09',
    SET_CANDIDATE_ON: '0x0A',
    SET_CANDIDATE_OFF: '0x0B',
    CREATE_MULTISIG: '0x0C',
    MULTISEND: '0x0D',
    EDIT_CANDIDATE: '0x0E',
};

/** @deprecated use TX_TYPE instead */
export const TX_TYPE_SEND = TX_TYPE.SEND;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_SELL = TX_TYPE.SELL;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_SELL_ALL = TX_TYPE.SELL_ALL;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_BUY = TX_TYPE.BUY;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_CREATE_COIN = TX_TYPE.CREATE_COIN;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_DECLARE_CANDIDACY = TX_TYPE.DECLARE_CANDIDACY;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_DELEGATE = TX_TYPE.DELEGATE;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_UNBOND = TX_TYPE.UNBOND;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_REDEEM_CHECK = TX_TYPE.REDEEM_CHECK;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_SET_CANDIDATE_ON = TX_TYPE.SET_CANDIDATE_ON;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_SET_CANDIDATE_OFF = TX_TYPE.SET_CANDIDATE_OFF;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_CREATE_MULTISIG = TX_TYPE.CREATE_MULTISIG;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_MULTISEND = TX_TYPE.MULTISEND;
/** @deprecated use TX_TYPE instead */
export const TX_TYPE_EDIT_CANDIDATE = TX_TYPE.EDIT_CANDIDATE;


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
fillList(TX_TYPE.SEND, 'send');
fillList(TX_TYPE.SELL, 'sell');
fillList(TX_TYPE.SELL_ALL, 'sell all');
fillList(TX_TYPE.BUY, 'buy');
fillList(TX_TYPE.CREATE_COIN, 'create coin');
fillList(TX_TYPE.DECLARE_CANDIDACY, 'declare candidacy');
fillList(TX_TYPE.DELEGATE, 'delegate');
fillList(TX_TYPE.UNBOND, 'unbond');
fillList(TX_TYPE.REDEEM_CHECK, 'redeem check');
fillList(TX_TYPE.SET_CANDIDATE_ON, 'set candidate on');
fillList(TX_TYPE.SET_CANDIDATE_OFF, 'set candidate off');
fillList(TX_TYPE.CREATE_MULTISIG, 'create multisig');
fillList(TX_TYPE.MULTISEND, 'multisend');
fillList(TX_TYPE.EDIT_CANDIDATE, 'edit candidate');

export {txTypeList};
