import {TX_TYPE, TxData, TxDataVoteCommission} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataVoteCommission', () => {
    const params = {
        publicKey: 'Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3',
        height: 1000,
        coin: 0,
        payloadByte: 12,
        send: 12,
        buyBancor: 12,
        sellBancor: 12,
        sellAllBancor: 12,
        buyPoolBase: 12,
        sellPoolBase: 12,
        sellAllPoolBase: 12,
        buyPoolDelta: 12,
        sellPoolDelta: 12,
        sellAllPoolDelta: 12,
        createTicker3: 12,
        createTicker4: 12,
        createTicker5: 12,
        createTicker6: 12,
        createTicker7to10: 12,
        createCoin: 12,
        createToken: 12,
        recreateCoin: 12,
        recreateToken: 12,
        declareCandidacy: 12,
        delegate: 12,
        unbond: 12,
        redeemCheck: 12,
        setCandidateOn: 12,
        setCandidateOff: 12,
        createMultisig: 12,
        multisendBase: 12,
        multisendDelta: 12,
        editCandidate: 12,
        setHaltBlock: 12,
        editTickerOwner: 12,
        editMultisig: 12,
        priceVote: 12,
        editCandidatePublicKey: 12,
        addLiquidity: 12,
        removeLiquidity: 12,
        editCandidateCommission: 12,
        moveStake: 12,
        burnToken: 12,
        mintToken: 12,
        voteCommission: 12,
        voteUpdate: 12,
        createSwapPool: 12,
    };

    const serializedTxData = (new TxDataVoteCommission(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [249, 224, 54, 131, 154, 41, 247, 251, 162, 213, 57, 75, 212, 137, 237, 169, 39, 204, 185, 90, 204, 153, 229, 6, 230, 136, 228, 136, 128, 130, 179, 163],
                [3, 232],
                [],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
                [12],
            ]);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.VOTE_COMMISSION).serialize()).toEqual(serializedTxData);
    });
});
