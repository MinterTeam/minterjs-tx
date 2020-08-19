import {convertToPip} from 'minterjs-util';
import {TxDataBuy, Tx, TxData, TX_TYPE, TxSignature} from '~/src';
import decodeToArray from '../decode-to-array';

describe('TxDataBuy', () => {
    const params = {
        coinToBuy: 1,
        valueToBuy: 1000,
        coinToSell: 0,
        maximumValueToSell: 5,
    };

    const serializedTxData = (new TxDataBuy(params)).serialize();

    test('rlp encoded fields', () => {
        expect(decodeToArray(serializedTxData))
            .toEqual([
                [1],
                [3, 232],
                [],
                [5],
            ]);
    });

    // https://github.com/MinterTeam/minter-php-sdk/blob/upgrade_node_12/tests/MinterBuyCoinTxTest.php
    test('from php-sdk', () => {
        const VALID_TX = '0xf865020101800495d40187038d7ea4c680008089056bc75e2d63100000808001b845f8431ca0f64de1594ea6ea7717a2161771a429a2202e78ae4f1bf628a8c2e12a2df13e4aa04b8eb64ef9e7574983cc66960e98829fd93ab61fd2d7794c3e8810970e9e3693';

        const txData = (new TxDataBuy({
            coinToBuy: 1,
            valueToBuy: `0x${convertToPip(0.001, 'hex')}`,
            coinToSell: 0,
            maximumValueToSell: `0x${convertToPip(100, 'hex')}`,
        })).serialize();
        const tx = new Tx({
            nonce: 2,
            chainId: 1,
            gasPrice: 1,
            gasCoin: 0,
            type: TX_TYPE.BUY,
            data: txData,
            signatureType: '0x01',
        });
        tx.signatureData = (new TxSignature())
            .sign(tx.hash(false), Buffer.from('4daf02f92bf760b53d3c725d6bcc0da8e55d27ba5350c78d3a88f873e502bd6e', 'hex'))
            .serialize();

        expect(`0x${tx.serialize().toString('hex')}`)
            .toEqual(VALID_TX);
    });

    test('TxData', () => {
        expect(TxData(params, TX_TYPE.BUY).serialize()).toEqual(serializedTxData);
    });
});
