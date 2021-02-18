import defineProperties from '../define-properties.js';

export default class TxDataVoteCommission {
    constructor(data) {
        // Define Properties
        const fields = [
            {
                name: 'publicKey',
                length: 32,
            },
            {
                name: 'height',
                length: 32,
                allowLess: true,
            },
            {
                name: 'coin',
                length: 4,
                allowLess: true,
            },
            {
                name: 'payloadByte',
                length: 32,
                allowLess: true,
            },
            {
                name: 'send',
                length: 32,
                allowLess: true,
            },
            {
                name: 'buyBancor',
                length: 32,
                allowLess: true,
            },
            {
                name: 'sellBancor',
                length: 32,
                allowLess: true,
            },
            {
                name: 'sellAllBancor',
                length: 32,
                allowLess: true,
            },
            {
                name: 'buyPoolBase',
                length: 32,
                allowLess: true,
            },
            {
                name: 'buyPoolDelta',
                length: 32,
                allowLess: true,
            },
            {
                name: 'sellPoolBase',
                length: 32,
                allowLess: true,
            },
            {
                name: 'sellPoolDelta',
                length: 32,
                allowLess: true,
            },
            {
                name: 'sellAllPoolBase',
                length: 32,
                allowLess: true,
            },
            {
                name: 'sellAllPoolDelta',
                length: 32,
                allowLess: true,
            },
            {
                name: 'createTicker3',
                length: 32,
                allowLess: true,
            },
            {
                name: 'createTicker4',
                length: 32,
                allowLess: true,
            },
            {
                name: 'createTicker5',
                length: 32,
                allowLess: true,
            },
            {
                name: 'createTicker6',
                length: 32,
                allowLess: true,
            },
            {
                name: 'createTicker7to10',
                length: 32,
                allowLess: true,
            },
            {
                name: 'createCoin',
                length: 32,
                allowLess: true,
            },
            {
                name: 'createToken',
                length: 32,
                allowLess: true,
            },
            {
                name: 'recreateCoin',
                length: 32,
                allowLess: true,
            },
            {
                name: 'recreateToken',
                length: 32,
                allowLess: true,
            },
            {
                name: 'declareCandidacy',
                length: 32,
                allowLess: true,
            },
            {
                name: 'delegate',
                length: 32,
                allowLess: true,
            },
            {
                name: 'unbond',
                length: 32,
                allowLess: true,
            },
            {
                name: 'redeemCheck',
                length: 32,
                allowLess: true,
            },
            {
                name: 'setCandidateOn',
                length: 32,
                allowLess: true,
            },
            {
                name: 'setCandidateOff',
                length: 32,
                allowLess: true,
            },
            {
                name: 'createMultisig',
                length: 32,
                allowLess: true,
            },
            {
                name: 'multisendBase',
                length: 32,
                allowLess: true,
            },
            {
                name: 'multisendDelta',
                length: 32,
                allowLess: true,
            },
            {
                name: 'editCandidate',
                length: 32,
                allowLess: true,
            },
            {
                name: 'setHaltBlock',
                length: 32,
                allowLess: true,
            },
            {
                name: 'editTickerOwner',
                length: 32,
                allowLess: true,
            },
            {
                name: 'editMultisig',
                length: 32,
                allowLess: true,
            },
            {
                name: 'priceVote',
                length: 32,
                allowLess: true,
            },
            {
                name: 'editCandidatePublicKey',
                length: 32,
                allowLess: true,
            },
            {
                name: 'addLiquidity',
                length: 32,
                allowLess: true,
            },
            {
                name: 'removeLiquidity',
                length: 32,
                allowLess: true,
            },
            {
                name: 'editCandidateCommission',
                length: 32,
                allowLess: true,
            },
            {
                name: 'moveStake',
                length: 32,
                allowLess: true,
            },
            {
                name: 'burnToken',
                length: 32,
                allowLess: true,
            },
            {
                name: 'mintToken',
                length: 32,
                allowLess: true,
            },
            {
                name: 'voteCommission',
                length: 32,
                allowLess: true,
            },
            {
                name: 'voteUpdate',
                length: 32,
                allowLess: true,
            },
            {
                name: 'createSwapPool',
                length: 32,
                allowLess: true,
            },
        ];

        /**
         * Returns the rlp encoding of the transaction
         * @method serialize
         * @return {Buffer}
         * @memberof Transaction
         * @name serialize
         */
        // attached serialize
        defineProperties(this, fields, data);
    }
}
