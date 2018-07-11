import ethUtil from 'ethereumjs-util'
import {Buffer} from 'safe-buffer'

class ConvertCoinTransactionData {
  constructor (data) {
    data = data || {}
    // FromCoinSymbol types.CoinSymbol
    // ToCoinSymbol   types.CoinSymbol
    // Value          *big.Int
    // Define Properties
    const fields = [
      {
        name: 'coin_from',
        allowZero: true,
        length: 10,
        default: new Buffer([])
      },
      {
        name: 'coin_to',
        allowZero: true,
        length: 10,
        default: new Buffer([])
      },
      {
        name: 'value',
        length: 32,
        allowZero: true,
        allowLess: true,
        default: new Buffer([])
      }]

    /**
     * Returns the rlp encoding of the transaction
     * @method serialize
     * @return {Buffer}
     * @memberof Transaction
     * @name serialize
     */
    // attached serialize
    ethUtil.defineProperties(this, fields, data)
  }
}

export default ConvertCoinTransactionData
