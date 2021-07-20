'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * ICON API
 *
 * @example
 * import Icx from "@ledgerhq/hw-app-icx";
 * const icx = new Icx(transport)
 */
var Icx = (function() {
  function Icx(transport) {
    (0, _classCallCheck3.default)(this, Icx);

    this.transport = transport;
    transport.decorateAppAPIMethods(
      this,
      ['getAddress', 'signTransaction', 'getAppConfiguration', 'setTestPrivateKey'],
      'ICON'
    );
  }

  /**
   * Returns public key and ICON address for a given BIP 32 path.
   * @param path a path in BIP 32 format
   * @option boolDisplay optionally enable or not the display
   * @option boolChaincode optionally enable or not the chaincode request
   * @return an object with a publickey(hexa string), address(string) and
   *  (optionally) chaincode(hexa string)
   * @example
   * icx.getAddress("44'/4801368'/0'", true, true).then(o => o.address)
   */

  (0, _createClass3.default)(Icx, [
    {
      key: 'getAddress',
      value: function getAddress(path) {
        var boolDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var boolChaincode =
          arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var paths = (0, _utils.splitPath)(path);
        var buffer = new Buffer(1 + paths.length * 4);
        buffer[0] = paths.length;
        paths.forEach(function(element, index) {
          buffer.writeUInt32BE(element, 1 + 4 * index);
        });
        return this.transport
          .send(0xe0, 0x02, boolDisplay ? 0x01 : 0x00, boolChaincode ? 0x01 : 0x00, buffer)
          .then(function(response) {
            var result = {};
            var publicKeyLength = response[0];
            result.publicKey = response.slice(1, 1 + publicKeyLength).toString('hex');
            var addressLength = response[1 + publicKeyLength];
            result.address = response.slice(
              1 + publicKeyLength + 1,
              1 + publicKeyLength + 1 + addressLength
            );
            if (boolChaincode) {
              result.chainCode = response.slice(-32).toString('hex');
            }
            return result;
          });
      },

      /**
       * Signs a transaction and returns signed message given the raw transaction
       * and the BIP 32 path of the account to sign
       * @param path a path in BIP 32 format
       * @param rawTxAscii raw transaction data to sign in ASCII string format
       * @return an object with a base64 encoded signature and hash in hexa string
       * @example
       * icx.signTransaction("44'/4801368'/0'",
       *     "icx_sendTransaction.fee.0x2386f26fc10000." +
       *     "from.hxc9ecad30b05a0650a337452fce031e0c60eacc3a.nonce.0x3." +
       *     "to.hx4c5101add2caa6a920420cf951f7dd7c7df6ca24.value.0xde0b6b3a7640000")
       *   .then(result => ...)
       */
    },
    {
      key: 'signTransaction',
      value: function signTransaction(path, rawTxAscii) {
        var _this = this;

        var paths = (0, _utils.splitPath)(path);
        var offset = 0;
        var rawTx = new Buffer(rawTxAscii);
        var toSend = [];
        var response = void 0;

        var _loop = function _loop() {
          var maxChunkSize = offset === 0 ? 150 - 1 - paths.length * 4 - 4 : 150;
          var chunkSize =
            offset + maxChunkSize > rawTx.length ? rawTx.length - offset : maxChunkSize;
          var buffer = new Buffer(offset === 0 ? 1 + paths.length * 4 + 4 + chunkSize : chunkSize);
          if (offset === 0) {
            buffer[0] = paths.length;
            paths.forEach(function(element, index) {
              buffer.writeUInt32BE(element, 1 + 4 * index);
            });
            buffer.writeUInt32BE(rawTx.length, 1 + 4 * paths.length);
            rawTx.copy(buffer, 1 + 4 * paths.length + 4, offset, offset + chunkSize);
          } else {
            rawTx.copy(buffer, 0, offset, offset + chunkSize);
          }
          toSend.push(buffer);
          offset += chunkSize;
        };

        while (offset !== rawTx.length) {
          _loop();
        }
        return (0, _utils.foreach)(toSend, function(data, i) {
          return _this.transport
            .send(0xe0, 0x04, i === 0 ? 0x00 : 0x80, 0x00, data)
            .then(function(apduResponse) {
              response = apduResponse;
            });
        }).then(function() {
          var result = {};
          // r, s, v are aligned sequencially
          result.signedRawTxBase64 = (0, _utils.hexToBase64)(
            response.slice(0, 32 + 32 + 1).toString('hex')
          );
          result.hashHex = response.slice(32 + 32 + 1, 32 + 32 + 1 + 32).toString('hex');
          return result;
        });
      },

      /**
       * Returns the application configurations such as versions.
       * @return  major/minor/patch versions of Icon application
       */
    },
    {
      key: 'getAppConfiguration',
      value: function getAppConfiguration() {
        return this.transport.send(0xe0, 0x06, 0x00, 0x00).then(function(response) {
          var result = {};
          result.majorVersion = response[0];
          result.minorVersion = response[1];
          result.patchVersion = response[2];
          return result;
        });
      },

      /**
       * Sets the given key as the test purpose private key corresponding to
       * "\0'" of BIP 32 path just for test purpose. After calling this function,
       * all functions with "\0'" path works based on this private key.
       * REMARK: Test purpose only such as verifying signTransaction function.
       * @param privateKeyHex private key in hexadecimal string format
       * @example
       * icx.setTestPrivateKey("23498dc21b9ee52e63e8d6566e0911ac255a38d3fcbc68a51e6b298520b72d6e")
       *   .then(result => ...)
       * icx.getAddress("0'", false, false).then(o => o.address)
       */
    },
    {
      key: 'setTestPrivateKey',
      value: function setTestPrivateKey(privateKeyHex) {
        var data = new Buffer(32);
        for (var i = 0; i < privateKeyHex.length; i += 2) {
          data[i / 2] = parseInt(privateKeyHex.substr(i, 2), 16);
        }
        return this.transport.send(0xe0, 0xff, 0x00, 0x00, data).then();
      },
    },
  ]);
  return Icx;
})();
/********************************************************************************
 *   Ledger JS API for ICON
 *   (c) 2018 ICON Foundation
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/

// FIXME drop:

exports.default = Icx;
//# sourceMappingURL=Icx.js.map
