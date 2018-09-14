import { ICX_TOKEN_CONTRACT_ADDRESS, IS_V3 } from 'constants/config'
import isEqual from 'lodash.isequal';
const secp256k1 = require('secp256k1');
const sha3_256 = require('js-sha3').sha3_256;


function generateIconexObject(key, coinType, walletName, v3) {
  const value = {
    'type': coinType,
    'name': walletName,
    'priv': v3,
    'tokens': {},
    'createdAt': Date.now().toString(),
    'recent': []
  }
  if (coinType === 'eth') {
    value['tokens'][ICX_TOKEN_CONTRACT_ADDRESS()] = {
      "address": ICX_TOKEN_CONTRACT_ADDRESS(),
			"createdAt": Date.now().toString(),
			"decimals": 18,
			"defaultDecimals": 18,
			"defaultName": "ICON",
			"defaultSymbol": "ICX",
			"name": "ICON",
			"recent": [],
			"symbol": "ICX"
    }
  }
  if (coinType === 'icx') value['pendingTransaction'] = [];
  const iconexObj = {};
  iconexObj[key] = value;
  return iconexObj;
}

function makeWalletArray(wallets) {
  const walletArr = Object.keys(wallets).map((k) => wallets[k]);
  walletArr.sort((a, b) => a.createdAt - b.createdAt);
  return walletArr;
}

function downloadFile(address, data, FileSaver) {
  let filename = '';
  if (address) {
    filename = "UTC--" + new Date().toISOString() + "--" + address;
  } else {
    filename = "iconex_" + new Date().toISOString();
  }
  // Windows does not permit ":" in filenames, replace all with "-"
  if (navigator.appVersion.indexOf("Win") !== -1) filename = filename.split(":").join("-");
  var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, filename);
}

function validateKSFile(ks) {
  return ks.hasOwnProperty('version') && ks.hasOwnProperty('address') && (ks.hasOwnProperty('crypto') || ks.hasOwnProperty('Crypto'))
}

function validateIconexFile(iconexFile) {
  if (Array.isArray(iconexFile)) {
    for (let i = 0; i < iconexFile.length; i++) {
      const walletData = iconexFile[i][Object.keys(iconexFile[i])[0]];
      if (!walletData.hasOwnProperty('name') || !walletData.hasOwnProperty('type') || !walletData.hasOwnProperty('priv') || !walletData.hasOwnProperty('tokens') || !walletData.hasOwnProperty('createdAt')) {
        return false
      }
    }
    return true
  }
  return false
}

function isIRCTokenFunc(array){
  const compare = (funcObj) => {
    const func = array.filter(e => e.name === funcObj.name)[0];
    return isEqual(func, funcObj);
  }
  
  const IRCTokenFunc = [
    {"type":"function","name":"balanceOf","inputs":[{"name":"_owner","type":"Address"}],"outputs":[{"type":"int"}],"readonly":"0x1"},
    {"type":"function","name":"decimals","inputs":[],"outputs":[{"type":"int"}],"readonly":"0x1"},
    {"type":"function","name":"name","inputs":[],"outputs":[{"type":"str"}],"readonly":"0x1"},
    {"type":"function","name":"symbol","inputs":[],"outputs":[{"type":"str"}],"readonly":"0x1"},
    {"type":"function","name":"totalSupply","inputs":[],"outputs":[{"type":"int"}],"readonly":"0x1"},
    {"type":"function","name":"transfer","inputs":[{"name":"_to","type":"Address"},{"name":"_value","type":"int"},{"name":"_data","type":"bytes","default":null}],"outputs":[]}
  ]

  for (let i=0; i<IRCTokenFunc.length; i++) {
    const isValueExist = compare(IRCTokenFunc[i]);
    if (!isValueExist) return false;
  }

  const transferEvent = array.filter(e => e.name === 'Transfer')[0];
  if (
    transferEvent['type'] !== 'eventlog' ||
    transferEvent['inputs'].length !== 4 ||
    !transferEvent['inputs'].some(e => e.type === "Address" || e.indexed === '0x1') ||
    !transferEvent['inputs'].some(e => e.type === "int" || e.indexed === '0x1') ||
    !transferEvent['inputs'].some(e => e.type === "bytes")
  ) {
    return false
  }
  return true
}

function parseError(errorObj, coinType) {
  switch(true) {
    case (errorObj instanceof Error) : {
      return errorObj.message
    }
    case (errorObj.hasOwnProperty('code') && errorObj.hasOwnProperty('message')) : {
      return coinType === 'icx' ? errorObj.code : errorObj.message
    }
    default:
      return ''
  }
}

function openApp() {
  window.chrome.tabs.create({
      'url': window.chrome.extension.getURL('index.html')
  }, function(tab){});
}

function signHashcode(privKey, hashcode) {
  console.log('signHashcode', hashcode)
  const message = new Buffer(hashcode, 'hex');
  const privateKey = new Buffer(privKey, 'hex');
  const sign = secp256k1.sign(message, privateKey);
  const recovery = new Uint8Array(1);
  recovery[0] = sign.recovery;
  const signature = concatTypedArrays(sign.signature, recovery);
  const b64encoded = btoa(String.fromCharCode.apply(null, signature));
  return b64encoded
}

function signRawTx(privKey, rawTx) {
  const phraseToSign = generateHashKey(rawTx);
  const hashcode = sha3_256.update(phraseToSign).hex();
  console.log('signRawTx', hashcode)
  const message = new Buffer(hashcode, 'hex');
  const privateKey = new Buffer(privKey, 'hex');
  const sign = secp256k1.sign(message, privateKey);
  const recovery = new Uint8Array(1);
  recovery[0] = sign.recovery;
  const signature = concatTypedArrays(sign.signature, recovery);
  const b64encoded = btoa(String.fromCharCode.apply(null, signature));

  const newRawTx = {
    ...rawTx,
    signature: b64encoded
  }
  if (!IS_V3) {
    newRawTx['tx_hash'] = hashcode
  }
  return newRawTx
}


function generateHashKey(obj){
  let resultStrReplaced = ''
  let resultStr = objTraverse(obj);
  resultStrReplaced = resultStr
                        .substring(1)
                        .slice(0, -1);
  console.log(resultStrReplaced)
  const result = 'icx_sendTransaction.' + resultStrReplaced;
  return result;
}

function objTraverse(obj){
  console.log(obj)
  let result = "";
  result += '{';
  let keys;
  keys = Object.keys(obj);
  keys.sort();
  for(let i=0;i<keys.length;i++){
    const key = keys[i]
    const value = obj[key];
    switch(true) {
      case (value === null) : {
        result +=`${key}.`;
        result += String.raw`\0`;
        break;
      }
      case (typeof value === 'string') : {
        result += `${key}.`
        result += escapeString(value)
        break;
      }
      case (Array.isArray(value)) : {
        result+= `${key}.`
        result += arrTraverse(value)
        break;
      }
      case (typeof value === 'object') : {
        result+= `${key}.`
        result += objTraverse(value);
        break;
      }
      default:
        break;
    }
    result += '.'
  }
  result = result.slice(0, -1);
  result += '}';
  return result;
}

function arrTraverse(arr){
  let result = '';
  result += '[';
  for(let j=0;j<arr.length;j++) {
    const value = arr[j];
    switch(true) {
      case (value === null) : {
        result += String.raw`\0`;
        break;
      }
      case (typeof value === 'string') : {
        result += escapeString(value)
        break;
      }
      case (Array.isArray(value)) : {
        result += arrTraverse(value)
        break;
      }
      case (typeof value === 'object') : {
        result += objTraverse(value);
        break;
      }
      default:
        break;
    }
    result += '.'
  }
  result = result.slice(0, -1);
  result += ']';
  return result;
}

function escapeString(value) {
  let newString = String.raw`${value}`;
  newString = newString.replace('\\', '\\\\');
  newString = newString.replace('.', '\\.');
  newString = newString.replace('{', '\\{');
  newString = newString.replace('}', '\\}');
  newString = newString.replace('[', '\\[');
  newString = newString.replace(']', '\\]');
  return newString
}

/* https://stackoverflow.com/questions/33702838/how-to-append-bytes-multi-bytes-and-buffer-to-arraybuffer-in-javascript */
function concatTypedArrays(a, b) { // a, b TypedArray of same type
    var c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}

export {
  generateIconexObject,
  makeWalletArray,
  downloadFile,
  validateKSFile,
  validateIconexFile,
  isIRCTokenFunc,
  parseError,
  openApp,
  signRawTx,
  signHashcode
}
