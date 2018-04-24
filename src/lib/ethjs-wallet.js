import ethUtil from './ethjs-util';
var Wallet = require('ethereumjs-wallet');

Wallet.prototype.getAddressIcx = function () {
  return ethUtil.publicToAddressIcx(this.pubKey)
}

export default Wallet;
