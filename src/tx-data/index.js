import {padToEven} from 'ethjs-util';
import TxDataSend from './send';
import TxDataMultisend from './multisend';
import TxDataSell from './sell';
import TxDataBuy from './buy';
import TxDataSellAll from './sell-all';
import TxDataCreateCoin from './create-coin';
import TxDataDeclareCandidacy from './declare-candidacy';
import TxDataEditCandidate from './edit-candidate';
import TxDataSetCandidateOn from './set-candidate-on';
import TxDataSetCandidateOff from './set-candidate-off';
import TxDataDelegate from './delegate';
import TxDataUnbond from './unbond';
import TxDataRedeemCheck from './redeem-check';
import TxDataCreateMultisig from './create-multisig';

import {TX_TYPE} from '../tx-types';

const TX_DATA_CONSTRUCTOR = {
    [TX_TYPE.SEND]: TxDataSend,
    [TX_TYPE.MULTISEND]: TxDataMultisend,
    [TX_TYPE.SELL]: TxDataSell,
    [TX_TYPE.BUY]: TxDataBuy,
    [TX_TYPE.SELL_ALL]: TxDataSellAll,
    [TX_TYPE.CREATE_COIN]: TxDataCreateCoin,
    [TX_TYPE.DECLARE_CANDIDACY]: TxDataDeclareCandidacy,
    [TX_TYPE.EDIT_CANDIDATE]: TxDataEditCandidate,
    [TX_TYPE.SET_CANDIDATE_ON]: TxDataSetCandidateOn,
    [TX_TYPE.SET_CANDIDATE_OFF]: TxDataSetCandidateOff,
    [TX_TYPE.DELEGATE]: TxDataDelegate,
    [TX_TYPE.UNBOND]: TxDataUnbond,
    [TX_TYPE.REDEEM_CHECK]: TxDataRedeemCheck,
    [TX_TYPE.CREATE_MULTISIG]: TxDataCreateMultisig,
};

/**
 *
 * @param data
 * @param {TX_TYPE|number|string|Buffer|Uint8Array} txType
 * @constructor
 * @return {TxDataSend|TxDataMultisend|TxDataSell|TxDataSellAll|TxDataBuy|TxDataCreateCoin|TxDataDeclareCandidacy|TxDataEditCandidate|TxDataSetCandidateOn|TxDataSetCandidateOff|TxDataDelegate|TxDataUnbond|TxDataRedeemCheck|TxDataCreateMultisig}
 */
export default function TxData(data, txType) {
    // Buffer or Uint8Array to TX_TYPE
    if (txType.length && typeof txType !== 'string') {
        txType = Buffer.from(txType).toString('hex');
        txType = `0x${txType}`;
    }
    // invalid string to number
    if (typeof txType === 'string' && txType.indexOf('0x') !== 0) {
        txType = parseInt(txType, 10);
    }
    // number to TX_TYPE
    if (typeof txType === 'number') {
        txType = padToEven(txType.toString(16)).toUpperCase();
        txType = `0x${txType}`;
    }

    const TxDataConstructor = TX_DATA_CONSTRUCTOR[txType];
    if (!TxDataConstructor) {
        throw new Error('Invalid tx type');
    }

    return new TxDataConstructor(data);
}
