import TxDataSend from './send.js';
import TxDataMultisend from './multisend.js';
import TxDataSell from './sell.js';
import TxDataBuy from './buy.js';
import TxDataSellAll from './sell-all.js';
import TxDataCreateCoin from './create-coin.js';
import TxDataRecreateCoin from './recreate-coin.js';
import TxDataEditCoinOwner from './edit-coin-owner.js';
import TxDataCreateToken from './create-token.js';
import TxDataRecreateToken from './recreate-token.js';
import TxDataMintToken from './mint-token.js';
import TxDataBurnToken from './burn-token.js';
import TxDataDeclareCandidacy from './declare-candidacy.js';
import TxDataEditCandidate from './edit-candidate.js';
import TxDataEditCandidatePublicKey from './edit-candidate-public-key.js';
import TxDataEditCandidateCommission from './edit-candidate-commission.js';
import TxDataSetHaltBlock from './set-halt-block.js';
import TxDataSetCandidateOn from './set-candidate-on.js';
import TxDataSetCandidateOff from './set-candidate-off.js';
import TxDataDelegate from './delegate.js';
import TxDataUnbond from './unbond.js';
import TxDataMoveStake from './move-stake.js';
import TxDataRedeemCheck from './redeem-check.js';
import TxDataCreateMultisig from './create-multisig.js';
import TxDataEditMultisig from './edit-multisig.js';
import TxDataPriceVote from './price-vote.js';
import TxDataAddSwapPool from './add-swap-pool.js';
import TxDataRemoveSwapPool from './remove-swap-pool.js';
import TxDataBuySwapPool from './buy-swap-pool.js';
import TxDataSellSwapPool from './sell-swap-pool.js';
import TxDataSellAllSwapPool from './sell-all-swap-pool.js';

import {TX_TYPE, normalizeTxType} from '../tx-types.js';

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
    [TX_TYPE.SET_HALT_BLOCK]: TxDataSetHaltBlock,
    [TX_TYPE.RECREATE_COIN]: TxDataRecreateCoin,
    [TX_TYPE.EDIT_COIN_OWNER]: TxDataEditCoinOwner,
    [TX_TYPE.EDIT_MULTISIG]: TxDataEditMultisig,
    [TX_TYPE.PRICE_VOTE]: TxDataPriceVote,
    [TX_TYPE.EDIT_CANDIDATE_PUBLIC_KEY]: TxDataEditCandidatePublicKey,
    [TX_TYPE.ADD_SWAP_POOL]: TxDataAddSwapPool,
    [TX_TYPE.REMOVE_SWAP_POOL]: TxDataRemoveSwapPool,
    [TX_TYPE.BUY_SWAP_POOL]: TxDataBuySwapPool,
    [TX_TYPE.SELL_SWAP_POOL]: TxDataSellSwapPool,
    [TX_TYPE.SELL_ALL_SWAP_POOL]: TxDataSellAllSwapPool,
    [TX_TYPE.EDIT_CANDIDATE_COMMISSION]: TxDataEditCandidateCommission,
    [TX_TYPE.MOVE_STAKE]: TxDataMoveStake,
    [TX_TYPE.MINT_TOKEN]: TxDataMintToken,
    [TX_TYPE.BURN_TOKEN]: TxDataBurnToken,
    [TX_TYPE.CREATE_TOKEN]: TxDataCreateToken,
    [TX_TYPE.RECREATE_TOKEN]: TxDataRecreateToken,
};

/**
 *
 * @param data
 * @param {TX_TYPE|number|string|Buffer|Uint8Array} txType
 * @constructor
 * @return {TxDataSend|TxDataMultisend|TxDataSell|TxDataSellAll|TxDataBuy|TxDataCreateCoin|TxDataDeclareCandidacy|TxDataEditCandidate|TxDataSetCandidateOn|TxDataSetCandidateOff|TxDataDelegate|TxDataUnbond|TxDataRedeemCheck|TxDataCreateMultisig|TxDataSetHaltBlock|TxDataRecreateCoin|TxDataEditCoinOwner|TxDataEditMultisig|TxDataPriceVote|TxDataEditCandidatePublicKey|TxDataAddSwapPool|TxDataRemoveSwapPool|TxDataBuySwapPool|TxDataSellSwapPool|TxDataSellAllSwapPool}
 */
export default function TxData(data, txType) {
    txType = normalizeTxType(txType);
    const TxDataConstructor = TX_DATA_CONSTRUCTOR[txType];

    return new TxDataConstructor(data);
}
