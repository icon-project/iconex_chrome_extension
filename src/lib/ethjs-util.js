var assert = require('assert');
var ethUtil = require('ethereumjs-util');
var sha3_256 = require('js-sha3').sha3_256;

ethUtil.sha3_256 = function (a, bits) {
 a = ethUtil.toBuffer(a)
 if (!bits) bits = 256
 return sha3_256.update(a).hex();
}

ethUtil.publicToAddressIcx = function (pubKey, sanitize) {
  pubKey = ethUtil.toBuffer(pubKey);
  assert(pubKey.length === 64);
  // Only take the lower 160bits of the hash
  const address = ethUtil.sha3_256(pubKey).slice(-40);

  return 'hx' + address
}

export default ethUtil;
