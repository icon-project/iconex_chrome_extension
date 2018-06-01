function generateIconexObject(key, coinType, walletName, v3) {
  const value = {
    'type': coinType,
    'name': walletName,
    'priv': v3,
    'tokens': {},
    'createdAt': Date.now().toString(),
    'recent': []
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

function getTxFee (props) {
  const { accountAddress, recipientAddress, wallets, coinQuantity, coinTypeIndex } = props;
  props.getTxFee(wallets[accountAddress].type, {
    tokenAddress: coinTypeIndex !== accountAddress ? coinTypeIndex : null,
    tokenDefaultDecimal: coinTypeIndex !== accountAddress ? wallets[accountAddress].tokens[coinTypeIndex].defaultDecimals : 18,
    tokenDecimal: coinTypeIndex !== accountAddress ? wallets[accountAddress].tokens[coinTypeIndex].decimals : null,
    from: accountAddress,
    to: recipientAddress,
    value: coinQuantity,
  });
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

function openApp() {
  window.chrome.tabs.create({
      'url': window.chrome.extension.getURL('index.html')
  }, function(tab){});
}

export {
  generateIconexObject,
  makeWalletArray,
  getTxFee,
  downloadFile,
  validateKSFile,
  validateIconexFile,
  openApp
}
