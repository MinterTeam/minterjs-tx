import {Buffer} from 'safe-buffer';
import {mPrefixToHex} from 'minterjs-util';
import MinterSendTxData from '../src/tx-data/send';
import MinterTx from '../src/index';
import {TX_TYPE_SEND} from '../src/tx-types';
import converter from '../src/converter';
import {formatCoin} from '../src/helpers';

const PRIVATE_KEY = new Buffer('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex');
const ADDRESS = 'Mx7633980c000139dd3bd24a3f54e06474fa941e16';
const FORM_DATA = {
    address: 'Mx376615B9A3187747dC7c32e51723515Ee62e37Dc',
    amount: 1,
    coin: 'MNT',
    payload: 'custom text',
};

describe('tx send', () => {
    const txData = (new MinterSendTxData({
        to: mPrefixToHex(FORM_DATA.address),
        coin: formatCoin(FORM_DATA.coin),
        value: `0x${converter.convert(FORM_DATA.amount, 'pip').toString(16)}`,
    })).serialize();

    test('tx signature', () => {
        const VALID_SIGNATURE = 'f88901018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a76400008b637573746f6d2074657874801ba073b76ea050165b9756028661347434ff3fac72fb7649fee7ad4570b39a402734a059648c13f057e7c3d6624f6dad15ddce9bb5275423891650713fc671ac9bc3e4';
        const txParams = {
            nonce: '0x01',
            gasPrice: '0x01',
            gasCoin: formatCoin('MNT'),
            type: TX_TYPE_SEND,
            data: txData,
            payload: `0x${Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')}`,
        };
        const tx = new MinterTx(txParams);
        tx.sign(PRIVATE_KEY);
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE);
    });

    test('tx2 signature', () => {
        const VALID_SIGNATURE = 'f87e08018a4d4e540000000000000001aae98a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc880de0b6b3a764000080801ba060cb3f0d530ae636c0d697267b60c85f29a124bec2042d26b34c209cf0bfac01a072515229c4a08422a5d47eb2557385a73b4fb6b8de8408c99527124e3ba98f4f';
        const txParams = {
            nonce: '0x08',
            gasPrice: '0x01',
            gasCoin: formatCoin('MNT'),
            type: TX_TYPE_SEND,
            data: txData,
        };
        const tx = new MinterTx(txParams);
        tx.sign(PRIVATE_KEY);
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
        value: `0x${converter.convert(1, 'pip').toString(16)}`,
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
        data: (new MinterSendTxData(txData)).serialize(),
    };

    const tx = new MinterTx(txParams);
    tx.sign(PHP_PRIVATE_KEY);

    test('tx signature', () => {
        const VALID_SIGNATURE = 'f87e01018a4d4e540000000000000001aae98a4d4e540000000000000094fe60014a6e9ac91618f5d1cab3fd58cded61ee99880de0b6b3a764000080801ba0e47dabc92cf9ab0df67cab70f15b5f0dfe2bfd9bc649d848b2e7177ab20ab2a2a036bb53ae63d9569552759b064fb8c2dd3e647860e394bf06b312c67a2a6d00ca';
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE);
    });
});
