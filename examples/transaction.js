import axios from 'axios'
import config from './config'
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

function getNonce() {
    return axios.get(config.nodeUrl + '/api/transactionCount/' + ADDRESS)
        .then((response) => {
            return Number(response.data.result) + 1
        })
}

getNonce().then((nonce) => {
    const txData = new MinterSendTxData({
        to: mPrefixToHex(FORM_DATA.address),
        coin: formatCoin(FORM_DATA.coin),
        value: `0x${converter.convert(FORM_DATA.amount, 'pip').toString(16)}`
    })
    const txParams = {
        nonce: `0x${nonce.toString(16)}`,
        gasPrice: '0x01',
        type: '0x01',
        data: txData.serialize(),
    }

    if (FORM_DATA.payload) {
        txParams.payload = '0x' + Buffer.from(FORM_DATA.payload, 'utf-8').toString('hex')
    }

    console.log({txParams})

    const tx = new MinterTx(txParams)
    tx.sign(PRIVATE_KEY)

    console.log('---Serialized TX----')
    console.log(tx.serialize().toString('hex'))
    console.log('Senders Address: ' + tx.getSenderAddress().toString('hex'))

    if (tx.verifySignature()) {
        console.log('Signature Checks out!')
    }

    axios.post(config.nodeUrl + '/api/sendTransaction', {
        transaction: tx.serialize().toString('hex')
    }).then((response) => {
        console.log('Tx send', response.data)
    }).catch((error) => {
        console.log('send error', error.response ? error.response.data : error)
    })
})


