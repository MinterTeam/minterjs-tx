import {Buffer} from 'safe-buffer';
import {mPrefixToHex, convertToPip} from 'minterjs-util';
import {MinterTx, MinterTxSignature, MinterTxDataSend, TX_TYPE_SEND, formatCoin} from '~/src';

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
        value: `0x${convertToPip(FORM_DATA.amount, 'hex')}`,
    })).serialize();

    test('tx signature', () => {
        const VALID_SIGNATURE = 'f88f0101018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d20746578748001b845f8431ba0f224517a55adf0bb751ce2e6b2eb4acfb89feb8a8b6b76ffd22ef417d923dc51a03ccf201383cf45f2d779e0c4250992c24b4775a5cd2050b7bc8542f7f73ba545';
        const txParams = {
            nonce: '0x01',
            chainID: '0x01',
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
        const VALID_SIGNATURE = 'f8840801018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a7640000808080b845f8431ca0542f8a5ccabf4e5941377058709c4705c5c97a7d6dc0ae26bf533a3d500492aca060661f6af03c487c604ba6962a73347b093cf943dd20f4b9214fe16c8d5384b0';
        const txParams = {
            nonce: '0x08',
            chainID: '0x01',
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
        value: `0x${convertToPip(1, 'hex')}`,
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
        const VALID_SIGNATURE = 'f8840180018a4d4e540000000000000001aae98a4d4e540000000000000094fe60014a6e9ac91618f5d1cab3fd58cded61ee99880de0b6b3a7640000808001b845f8431ca09cda3f26a97b4e910bb10030f95df36df69db4bac43f31714b4d5cb47a29c478a048ccfc1ffa60f6806397c136bb02e4633edf5025d9ee77faa76f45917f0452dc';
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE);
    });
});
