import {Buffer} from 'safe-buffer'
import MinterSendTxData from '../src/data/send'
import MinterTx from '../src/index'
import converter from '../src/converter'
import {formatCoin, mPrefixToHex} from '../src/helpers'

const PRIVATE_KEY = new Buffer('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex')
const ADDRESS = 'Mx7633980c000139dd3bd24a3f54e06474fa941e16'
const FORM_DATA = {
    address: 'Mx376615B9A3187747dC7c32e51723515Ee62e37Dc',
    amount: 1,
    coin: 'MNT',
    payload: 'custom text',
}

describe('tx send', () => {
    const txData = (new MinterSendTxData({
        to: mPrefixToHex(FORM_DATA.address),
        coin: formatCoin(FORM_DATA.coin),
        value: `0x${converter.convert(FORM_DATA.amount, 'pip').toString(16)}`
    })).serialize()

    test('tx signature', () => {
        const VALID_SIGNATURE ='f87a010101a6e58a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc8405f5e1008b637573746f6d2074657874801ba04db3bf67e23126791746eeca88837af90a61f47ac00b34f565797909bb916c79a037f16050ad93eff2f8b5a424315e440151c859d2d57e50c87f8b11eeba9e578a'
        const txParams = {
            nonce: '0x01',
            gasPrice: '0x01',
            type: '0x01',
            data: txData,
            payload: '0x' + Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex'),
        }
        const tx = new MinterTx(txParams)
        tx.sign(PRIVATE_KEY)
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE)
    })

    test('tx2 signature', () => {
        const VALID_SIGNATURE = 'f86f080101a6e58a4d4e540000000000000094376615b9a3187747dc7c32e51723515ee62e37dc8405f5e10080801ca0eed2ba4069d21d072af1a77d934c816075b090587418c35b032190daaf87bd36a012aaf9c0f56fcf2f206f81a4fbe408831695ca349ed202ca4e75dd255b4b2f28'
        const txParams = {
            nonce: '0x08',
            gasPrice: '0x01',
            type: '0x01',
            data: txData,
        }
        const tx = new MinterTx(txParams)
        tx.sign(PRIVATE_KEY)
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE)
    })
})



/** @see https://github.com/MinterTeam/minter-php-sdk/blob/master/tests/MinterSendCoinTxTest.php */
describe('tx send (php test)', () => {
    const PRIVATE_KEY = new Buffer('b574d2a7151fcf0df573feae58015f85f6ebf38ea4b38c49196c6aceee27e189', 'hex')
    const TO_ADDRESS = 'Mxfe60014a6e9ac91618f5d1cab3fd58cded61ee99'

    // to: '0xfe60014a6e9ac91618f5d1cab3fd58cded61ee99',
    // coin: <Buffer 4d 4e 54 00 00 00 00 00 00 00>,
    // value: '0x5f5e100'
    const txData = {
        to: mPrefixToHex(TO_ADDRESS),
        coin: formatCoin('MNT'),
        value: `0x${converter.convert(1, 'pip').toString(16)}`
    }
    // nonce: '0x01',
    // gasPrice: '0x01',
    // type: '0x01',
    // data: <Buffer e5 8a 4d 4e 54 00 00 00 00 00 00 00 94 fe 60 01 4a 6e 9a c9 16 18 f5 d1 ca b3 fd 58 cd ed 61 ee 99 84 05 f5 e1 00>
    const txParams = {
        nonce: '0x01',
        gasPrice: '0x01',
        type: '0x01',
        data: (new MinterSendTxData(txData)).serialize(),
    }

    const tx = new MinterTx(txParams)
    tx.sign(PRIVATE_KEY)

    test('tx signature', () => {
        const VALID_SIGNATURE = 'f873010101aae98a4d4e540000000000000094fe60014a6e9ac91618f5d1cab3fd58cded61ee99880de0b6b3a764000080801ca0ae0ee912484b9bf3bee785f4cbac118793799450e0de754667e2c18faa510301a04f1e4ed5fad4b489a1065dc1f5255b356ab9a2ce4b24dde35bcb9dc43aba019c'
        expect(tx.serialize().toString('hex')).toEqual(VALID_SIGNATURE)
    })
})

