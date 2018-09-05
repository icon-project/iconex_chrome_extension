/* eslint-disable no-undef */
import Wallet from 'lib/ethjs-wallet';
import { v3_options as V3_OPTIONS } from 'constants/index';
import { isEmpty, check0xPrefix, checkHxPrefix } from 'utils';

function walletToV3File(wallet, pw, coinType) {
  let v3 = wallet.toV3(pw, V3_OPTIONS);
  if (coinType === 'icx') {
    const address = wallet.getAddressIcx().toString('hex');
    v3 = Object.assign({}, v3, {'address': address})
    v3 = Object.assign({}, v3, {'coinType': 'icx'})
  }
  return JSON.stringify(v3);
}

onmessage = function(m) {
  switch(m.data.type) {
    case 'sendTransaction':
      try {
        const wallet = Wallet.fromV3(m.data.priv, m.data.pw, V3_OPTIONS);
        const privKey = wallet.getPrivateKey().toString('hex');
        this.postMessage(privKey)
      }
      catch (e) {
        console.log(e)
        this.postMessage(undefined)
      }
      break;

    case 'backupWallet':
      try {
        const wallet = Wallet.fromV3(m.data.priv, m.data.pw, V3_OPTIONS);
        const privKey = wallet.getPrivateKey().toString('hex');
        const v3 = walletToV3File(wallet, m.data.pw, m.data.coinType);
        this.postMessage({
          privKey,
          v3
        })
      }
      catch (e) {
        console.log(e)
        this.postMessage(undefined)
      }
      break;

    case 'createWallet':
      try {
        const data = m.data;
        const wallet = new Wallet(new Buffer(data.walletObj._privKey));

        let v3 = walletToV3File(wallet, data.pw, data.coinType)
        this.postMessage(v3)
      }
      catch (e) {
        console.log(e)
        this.postMessage(undefined)
      }
      break;

    case 'importWallet_2_ks':
      try {
        let ks = m.data.file;

        const wallet = Wallet.fromV3(ks, m.data.pw, V3_OPTIONS);
        if (ks['coinType'] === 'icx') {
          const pubKey = wallet.getAddressIcx().toString('hex');
          if (checkHxPrefix(ks.address) !== checkHxPrefix(pubKey)) {
            this.postMessage({msg: 'addressError'});
          } else {
            this.postMessage({
              msg: 'success',
              payload: Object.assign({}, ks, {address: checkHxPrefix(pubKey)})
            });
          }
        } else {
          const pubKey = wallet.getAddress().toString('hex');
          if (check0xPrefix(ks.address) !== check0xPrefix(pubKey)) {
            this.postMessage({msg: 'addressError'});
          } else {
            this.postMessage({
              msg: 'success',
              payload: Object.assign({}, ks, {address: pubKey})
            });
          }
        }
      }
      catch (e) {
        console.log(e)
        this.postMessage({msg: 'passwordError'});
      }
      break;

    case 'importWallet_2_iconex':
      try {
        const { data } = m
        const { file, pw } = data;

        for (let i = 0; i < file.length; i++) {
          const walletData = file[i];
          const walletDataValue = walletData[Object.keys(walletData)[0]];
          const ks = JSON.parse(walletDataValue.priv);

          if (ks['Crypto']) {
            ks['crypto'] = ks.Crypto;
            delete ks.Crypto;
          }

          const wallet = Wallet.fromV3(ks, pw, V3_OPTIONS);

          if (ks['coinType'] === 'icx' && walletDataValue['type'] === 'icx') {
            const pubKey = wallet.getAddressIcx().toString('hex');
            if (checkHxPrefix(ks.address) !== checkHxPrefix(pubKey) || checkHxPrefix(Object.keys(walletData)[0]) !== checkHxPrefix(pubKey)) {
              throw new Error('addressError');
            }
            walletDataValue['pendingTransaction'] = [];
          } else {
            const pubKey = wallet.getAddress().toString('hex');
            if (check0xPrefix(ks.address) !== check0xPrefix(pubKey) || check0xPrefix(Object.keys(walletData)[0]) !== check0xPrefix(pubKey)) {
              throw new Error('addressError');
            }
          }
          const tokensArr = Object.values(walletDataValue.tokens);
          const newTokenObj = {};
          for (let v = 0; v < tokensArr.length; v++) {
            tokensArr[v]['recent'] = [];
            newTokenObj[tokensArr[v].address] = tokensArr[v];
          }
          walletDataValue['recent'] = [];
          walletDataValue['tokens'] = newTokenObj;
          file[i][Object.keys(file[i])[0]] = walletDataValue;
        }
        this.postMessage({
          msg: 'success',
          payload: file
        });
      }
      catch (e) {
        console.log(e)
        if (e.message === 'Key derivation failed - possibly wrong passphrase') e.message = 'passwordError';
        this.postMessage({'msg': e.message});
      }
      break;

    case 'importWallet_4':
      try {
        const { data } = m
        const { walletName, pw, coinType, privKey } = data
        const wallet = new Wallet(new Buffer(privKey));
        const key = coinType === 'icx' ? wallet.getAddressIcx().toString('hex') : check0xPrefix(wallet.getAddress().toString('hex'))
        let v3 = walletToV3File(wallet, pw, coinType);
        this.postMessage({
          key, coinType, walletName, v3
        })
      }
      catch (e) {
        console.log(e)
        this.postMessage(undefined);
      }
      break;

    case 'updatePassword':
      let wallet, v3;
      try {
        const { data } = m
        wallet = Wallet.fromV3(data.priv, data.curPw, V3_OPTIONS);
        v3 = walletToV3File(wallet, data.newPw, data.coinType);
        this.postMessage(v3)
      }
      catch (e) {
        console.log(e)
        this.postMessage(undefined)
      }
      break;

    case 'exportWallet_1':
      let isError = false;
      let resolvedWalletArr = [];
      const pwNotMatchErrorArr = m.data.inputArr.map((val, i) => {
        if (isEmpty(val)) {
          return '';
        }
        try {
          const wallet = Wallet.fromV3(val.priv, val.pw, V3_OPTIONS);
          let key = '';
          switch (val.type) {
            case 'icx':
              key = wallet.getAddressIcx().toString('hex');
              break;
            case 'eth':
              key = check0xPrefix(wallet.getAddress().toString('hex'));
              break;
            default:
              break;
          }
          const tokens = Object.values(val.tokens);
          for (let v = 0; v<tokens.length; v++) {
            delete tokens[v].isError;
            delete tokens[v].recent;
            delete tokens[v].balance;
            delete tokens[v].balanceLoading;
          }
          const obj = Object.assign({}, {
              name: val.name,
              type: val.type,
              priv: wallet,
              tokens: tokens,
              createdAt: val.createdAt
          })
          const result = {};
          result[key] = obj;
          resolvedWalletArr.push(result);
          return ''
        }
        catch (e) {
          isError = true;
          return isError
        }
      })
      this.postMessage({resolvedWalletArr: resolvedWalletArr, pwNotMatchErrorArr: pwNotMatchErrorArr, error: isError})
      break;

    case 'exportWallet_3':
      const exportWalletObjects = m.data.exportWalletObjects
      for(let i=0; i<exportWalletObjects.length; i++) {
        const key = Object.keys(exportWalletObjects[i])[0];
        const priv = new Wallet(new Buffer(exportWalletObjects[i][key].priv._privKey));
        let v3 = walletToV3File(priv, m.data.newPw, exportWalletObjects[i][key].type)
        exportWalletObjects[i][key].priv = v3;
      }
      this.postMessage(exportWalletObjects);
      break;

    default:
      break;
  }
}
