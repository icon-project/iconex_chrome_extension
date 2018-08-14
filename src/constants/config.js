//export const ICX_WALLET_SERVER = prodDev('https://wallet.icon.foundation', 'https://testwallet.icon.foundation')
//export const ICX_TRACKER_SERVER = prodDev('https://tracker.icon.foundation', 'https://trackerdev.icon.foundation')
//export const ETH_SERVER = prodDev('https://api.myetherapi.com/eth', 'https://ropsten.infura.io/')
//export const ETH_SCAN = prodDev('https://etherscan.io', 'https://ropsten.etherscan.io')
//export const GA_TRACKING_ID = '';

export const INITIAL_SERVER_ICX = prodDev('main', 'test_v2');
export const INITIAL_SERVER_ETH = prodDev('main', 'ropsten');

export const HIDE_SERVER = true;
export const LEDGER_SERVER = prodDev('https://hardwallet.icon.foundation/index.html', 'https://hardwallet.icon.foundation/test/test.html');

export const getCurrentServer = (coinType) => {
  let server;
  const initialServer = coinType === 'icx' ? INITIAL_SERVER_ICX : INITIAL_SERVER_ETH;
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    server = localStorage.getItem(`${coinType}Server`) || initialServer
  } else {
    server = initialServer
  }
  return server;
}

export const IS_V3 = getCurrentServer('icx') === 'test_v3_tBears';

export const ICX_WALLET_SERVER = () => {
  const icxServer = getCurrentServer('icx');
  const obj = {
    'test_v2': 'https://testwallet.icon.foundation',
    'test_v3_v2Obj': 'http://52.79.233.89:9000',
    'test_v3_tBears': 'http://52.79.233.89:9000',
    'main': 'https://wallet.icon.foundation'
  }
  return obj[icxServer];
}

export const ICX_TRACKER_SERVER = () => {
  const icxServer = getCurrentServer('icx');
  const obj = {
    'test_v2': 'https://trackerdev.icon.foundation',
    'test_v3_v2Obj': 'http://trackerlocaldev.icon.foundation',
    'test_v3_tBears': 'http://trackerlocaldev.icon.foundation',
    'main': 'https://tracker.icon.foundation'
  }
  return obj[icxServer];
}

export const ETH_SERVER = () => {
  const ethServer = getCurrentServer('eth');
  const obj = {
    'ropsten': 'https://ropsten.infura.io/',
    'main': 'https://mainnet.infura.io/'
  }
  return obj[ethServer];
}

export const ETH_SCAN = () => {
  const ethServer = getCurrentServer('eth');
  const obj = {
    'ropsten': 'https://ropsten.etherscan.io',
    'main': 'https://etherscan.io'
  }
  return obj[ethServer];
}

// EIP 155 chainId - mainnet: 1, ropsten: 3
export const CHAIN_ID = () => {
  const ethServer = getCurrentServer('eth');
  const obj = {
    'ropsten': 3,
    'main': 1
  }
  return obj[ethServer];
}

export const ICX_TOKEN_CONTRACT_ADDRESS = () => {
  const ethServer = getCurrentServer('eth');
  const obj = {
    'ropsten': '0x55116b9cf269e3f7e9183d35d65d6c310fcacf05',
    'main': '0xb5a5f22694352c15b00323844ad545abb2b11028'
  }
  return obj[ethServer];
}

export const ICX_TOKEN_DISCARD_ADDRESS = () => {
  const ethServer = getCurrentServer('eth');
  const obj = {
    'ropsten': '0x0000000000000000000000000000000000000000',
    'main': '0x0000000000000000000000000000000000000000'
  }
  return obj[ethServer];
}


export const txidUrl = {
    'icx': `${ICX_TRACKER_SERVER()}/transaction/`,
    'eth': `${ETH_SCAN()}/tx/`
}

export const APP_VERSION = prodDev(`1.${process.env.APP_VERSION}`, `0.${process.env.APP_VERSION}`);

function prodDev(prod, dev) {
  return process.env.NODE_ENV === 'production' ? prod : dev;
}
