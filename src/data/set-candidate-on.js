import ethUtil from 'ethereumjs-util'

class SetCandidateOnData {
  constructor (data) {
    data = data || {}
    // Define Properties
    const fields = [
      {
        name: 'pubkey',
        allowZero: true,
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

export default SetCandidateOnData
