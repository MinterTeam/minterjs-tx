import Tx from './tx.js';
import TxSignature from './tx-signature.js';
import TxMultisignature from './tx-multisignature.js';
import TxData from './tx-data/index.js';
import TxDataSend from './tx-data/send.js';
import TxDataMultisend from './tx-data/multisend.js';
import TxDataSell from './tx-data/sell.js';
import TxDataBuy from './tx-data/buy.js';
import TxDataSellAll from './tx-data/sell-all.js';
import TxDataCreateCoin from './tx-data/create-coin.js';
import TxDataRecreateCoin from './tx-data/recreate-coin.js';
import TxDataEditCoinOwner from './tx-data/edit-coin-owner.js';
import TxDataDeclareCandidacy from './tx-data/declare-candidacy.js';
import TxDataEditCandidate from './tx-data/edit-candidate.js';
import TxDataEditCandidatePublicKey from './tx-data/edit-candidate-public-key.js';
import TxDataSetCandidateOn from './tx-data/set-candidate-on.js';
import TxDataSetCandidateOff from './tx-data/set-candidate-off.js';
import TxDataDelegate from './tx-data/delegate.js';
import TxDataUnbond from './tx-data/unbond.js';
import TxDataRedeemCheck from './tx-data/redeem-check.js';
import TxDataCreateMultisig from './tx-data/create-multisig.js';
import TxDataEditMultisigOwners from './tx-data/edit-multisig-owners.js';
import TxDataSetHaltBlock from './tx-data/set-halt-block.js';
import TxDataPriceVote from './tx-data/price-vote.js';
import {coinToBuffer, bufferToCoin} from './helpers.js';
import defineProperties from './define-properties.js';
import {TX_TYPE, txTypeList, normalizeTxType} from './tx-types.js';

/** @deprecated use Tx instead */
const MinterTx = Tx;
/** @deprecated use TxSignature instead */
const MinterTxSignature = TxSignature;
/** @deprecated use TxMultisignature instead */
const MinterTxMultisignature = TxMultisignature;
/** @deprecated use TxDataSend instead */
const MinterTxDataSend = TxDataSend;
/** @deprecated use TxDataMultisend instead */
const MinterTxDataMultisend = TxDataMultisend;
/** @deprecated use TxDataSell instead */
const MinterTxDataSell = TxDataSell;
/** @deprecated use TxDataSellAll instead */
const MinterTxDataSellAll = TxDataSellAll;
/** @deprecated use TxDataBuy instead */
const MinterTxDataBuy = TxDataBuy;
/** @deprecated use TxDataCreateCoin instead */
const MinterTxDataCreateCoin = TxDataCreateCoin;
/** @deprecated use TxDataDeclareCandidacy instead */
const MinterTxDataDeclareCandidacy = TxDataDeclareCandidacy;
/** @deprecated use TxDataEditCandidate instead */
const MinterTxDataEditCandidate = TxDataEditCandidate;
/** @deprecated use TxDataSetCandidateOn instead */
const MinterTxDataSetCandidateOn = TxDataSetCandidateOn;
/** @deprecated use TxDataSetCandidateOff instead */
const MinterTxDataSetCandidateOff = TxDataSetCandidateOff;
/** @deprecated use TxDataDelegate instead */
const MinterTxDataDelegate = TxDataDelegate;
/** @deprecated use TxDataUnbond instead */
const MinterTxDataUnbond = TxDataUnbond;
/** @deprecated use TxDataRedeemCheck instead */
const MinterTxDataRedeemCheck = TxDataRedeemCheck;
/** @deprecated use TxDataCreateMultisig instead */
const MinterTxDataCreateMultisig = TxDataCreateMultisig;

export default Tx;
export {
    Tx,
    TxSignature,
    TxMultisignature,
    TxData,
    TxDataSend,
    TxDataMultisend,
    TxDataSell,
    TxDataSellAll,
    TxDataBuy,
    TxDataCreateCoin,
    TxDataRecreateCoin,
    TxDataEditCoinOwner,
    TxDataDeclareCandidacy,
    TxDataEditCandidate,
    TxDataEditCandidatePublicKey,
    TxDataSetCandidateOn,
    TxDataSetCandidateOff,
    TxDataDelegate,
    TxDataUnbond,
    TxDataRedeemCheck,
    TxDataCreateMultisig,
    TxDataEditMultisigOwners,
    TxDataSetHaltBlock,
    TxDataPriceVote,
    MinterTx,
    MinterTxSignature,
    MinterTxMultisignature,
    MinterTxDataSend,
    MinterTxDataMultisend,
    MinterTxDataSell,
    MinterTxDataSellAll,
    MinterTxDataBuy,
    MinterTxDataCreateCoin,
    MinterTxDataDeclareCandidacy,
    MinterTxDataEditCandidate,
    MinterTxDataSetCandidateOn,
    MinterTxDataSetCandidateOff,
    MinterTxDataDelegate,
    MinterTxDataUnbond,
    MinterTxDataRedeemCheck,
    MinterTxDataCreateMultisig,
    coinToBuffer,
    bufferToCoin,
    defineProperties,
    TX_TYPE,
    txTypeList,
    normalizeTxType,
};
