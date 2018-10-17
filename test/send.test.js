import {Buffer} from 'safe-buffer';
import {mPrefixToHex} from 'minterjs-util';
import {MinterTx, MinterTxSignature, MinterTxDataSend, TX_TYPE_SEND, formatCoin, convertToPip} from '~/src';

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
        coin: formatCoin(FORM_DATA.coin),
        value: `0x${convertToPip(FORM_DATA.amount).toString(16)}`,
    })).serialize();

    test('tx signature', () => {
        const VALID_SIGNATURE = 'f88e01018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ba0dfd42ab59e68e6494d4e29f12520e7cd5a90c6d11b25599e868c2aac52440028a069f5f4085e1fe20b3e04701377a6d0320bb21f3162819ae3311318432aa332ea';
        const txParams = {
            nonce: '0x01',
            gasPrice: '0x01',
            gasCoin: formatCoin('MNT'),
            type: TX_TYPE_SEND,
            data: txData,
            payload: `0x${Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')}`,
            signatureType: '0x01',
        };
        const tx = new MinterTx(txParams);
        tx.signatureData = (new MinterTxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE);
    });

    test('tx2 signature', () => {
        const VALID_SIGNATURE = 'f88208018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a7640000808080b844f8421ca08071d44697614db73a7e1ea830635c8e6ee187dbe7ceba43d6146e9e2ad3fcc59f606b57e20d75319ddbbf36db4534063480c50391ed10a10450a603ee85d583';
        const txParams = {
            nonce: '0x08',
            gasPrice: '0x01',
            gasCoin: formatCoin('MNT'),
            type: TX_TYPE_SEND,
            data: txData,
        };
        const tx = new MinterTx(txParams);
        tx.signatureData = (new MinterTxSignature()).sign(tx.hash(false), PRIVATE_KEY).serialize();
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE);
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
        coin: formatCoin('MNT'),
        value: `0x${convertToPip(1).toString(16)}`,
    };
    // nonce: '0x01',
    // gasPrice: '0x01',
    // type: '0x01',
    // data: <Buffer e5 8a 4d 4e 54 00 00 00 00 00 00 00 94 fe 60 01 4a 6e 9a c9 16 18 f5 d1 ca b3 fd 58 cd ed 61 ee 99 84 05 f5 e1 00>
    const txParams = {
        nonce: '0x01',
        gasPrice: '0x01',
        gasCoin: formatCoin('MNT'),
        type: TX_TYPE_SEND,
        data: (new MinterTxDataSend(txData)).serialize(),
        signatureType: '0x01',
    };

    const tx = new MinterTx(txParams);
    tx.signatureData = (new MinterTxSignature()).sign(tx.hash(false), PHP_PRIVATE_KEY).serialize();

    test('tx signature', () => {
        const VALID_SIGNATURE = 'f88301018a4d4e540000000000000001aae98a4d4e540000000000000094fe60014a6e9ac91618f5d1cab3fd58cded61ee99880de0b6b3a7640000808001b845f8431ca0403dc61dec54139140c8b54a68d94a00f266a1b62a5d60e46a8175e4387d176ba03c3f1105df6b23d3717f202979bfbb24a1b4367dd5cc73dccda9a8719348f34e';
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE);
    });
});
