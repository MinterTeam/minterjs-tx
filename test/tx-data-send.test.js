import {mPrefixToHex, convertToPip} from 'minterjs-util';
import {MinterTx, MinterTxSignature, MinterTxDataSend, TX_TYPE, coinToBuffer} from '~/src';

// exercise fantasy smooth enough arrive steak demise donkey true employ jealous decide blossom bind someone
const PRIVATE_KEY = new Buffer('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex');
const ADDRESS = 'Mx7633980c000139dd3bd24a3f54e06474fa941e16';
const FORM_DATA = {
    address: 'Mx376615B9A3187747dC7c32e51723515Ee62e37Dc',
    amount: 1,
    coin: 'MNT',
    payload: 'custom text',
};

describe('tx send', () => {
    const txData = (new MinterTxDataSend({
        to: mPrefixToHex(FORM_DATA.address),
        coin: coinToBuffer(FORM_DATA.coin),
        value: `0x${convertToPip(FORM_DATA.amount, 'hex')}`,
    })).serialize();

    test('tx signature', () => {
        const VALID_SIGNATURE = 'f88f0101018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ca086992c5456750ec04ffa070cd520bee9a1e208aab773884a6f29935576b9aecda0661435efaf2bb6d8cc00969b77739de4f19e4f02680c235365f3d59af8036fa6';
        const txParams = {
            nonce: '0x01',
            chainId: '0x01',
            gasPrice: '0x01',
            gasCoin: coinToBuffer('MNT'),
            type: TX_TYPE.SEND,
            data: txData,
            payload: `0x${Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')}`,
            signatureType: '0x01',
        };
        const tx = new MinterTx(txParams);
        tx.signatureData = (new MinterTxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE);
    });

    test('tx2 signature', () => {
        const VALID_SIGNED_TX = 'f8840801018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a7640000808080b845f8431ba00744d2e5dc8abf6b1f5b5ce3540f3552721ced15308da1459fe7b279f3146603a035d9d02a22e5d3f2e591878a3b5350aa6568ade848bde2ccf9a77f81c5ef38fe';
        const txParams = {
            nonce: '0x08',
            chainId: '0x01',
            gasPrice: '0x01',
            gasCoin: coinToBuffer('MNT'),
            type: TX_TYPE.SEND,
            data: txData,
        };
        const tx = new MinterTx(txParams);
        tx.signatureData = (new MinterTxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNED_TX);
    });
});

/** @see https://github.com/MinterTeam/minter-php-sdk/blob/master/tests/MinterSendCoinTxTest.php */
describe('tx send (php test)', () => {
    const PHP_PRIVATE_KEY = new Buffer('b574d2a7151fcf0df573feae58015f85f6ebf38ea4b38c49196c6aceee27e189', 'hex');
    const TO_ADDRESS = 'Mxfe60014a6e9ac91618f5d1cab3fd58cded61ee99';

    // to: '0xfe60014a6e9ac91618f5d1cab3fd58cded61ee99',
    // coin: <Buffer 4d 4e 54 00 00 00 00 00 00 00>,
    // value: '0x5f5e100'
    const txData = {
        to: mPrefixToHex(TO_ADDRESS),
        coin: coinToBuffer('MNT'),
        value: `0x${convertToPip(1, 'hex')}`,
    };
    // nonce: '0x01',
    // gasPrice: '0x01',
    // type: '0x01',
    // data: <Buffer e5 8a 4d 4e 54 00 00 00 00 00 00 00 94 fe 60 01 4a 6e 9a c9 16 18 f5 d1 ca b3 fd 58 cd ed 61 ee 99 84 05 f5 e1 00>
    const txParams = {
        nonce: '0x01',
        gasPrice: '0x01',
        gasCoin: coinToBuffer('MNT'),
        type: TX_TYPE.SEND,
        data: (new MinterTxDataSend(txData)).serialize(),
        signatureType: '0x01',
    };

    const tx = new MinterTx(txParams);
    tx.signatureData = (new MinterTxSignature()).sign(tx.hash(false), PHP_PRIVATE_KEY).serialize();

    test('tx signature', () => {
        const VALID_SIGNED_TX = 'f8840180018a4d4e540000000000000001aae98a4d4e540000000000000094fe60014a6e9ac91618f5d1cab3fd58cded61ee99880de0b6b3a7640000808001b845f8431ca0d4e4bca60bce8ebc50f0a13720550b59c4fcd891044dd688576ee56cd409a8a1a016e2c89754e9c01c7b1390797d56a812e76ef6a0e0ed64d1334c1d48f645f4fd';
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNED_TX);
    });
});
