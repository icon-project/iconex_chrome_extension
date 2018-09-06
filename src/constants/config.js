const isDevVersion = () => process.env.USER === 'developer';
const isAccessedFromWorker = typeof window === 'undefined';

export const getCustomIcxServer = () => {
  const initialCustomServer = {
    customWalletURL: '',
    customTrackerURL: ''
  }
  if (isAccessedFromWorker) {
    return initialCustomServer
  } else {
    return localStorage.getItem('customIcxServer') ? JSON.parse(localStorage.getItem('customIcxServer')) : initialCustomServer
  }
}

export const INITIAL_API_VERSION_ICX = prodDev('v2', 'v3');
export const INITIAL_SERVER_ICX = prodDev('main', 'test');
export const INITIAL_SERVER_ETH = prodDev('main', 'ropsten');

export const HIDE_SERVER = isDevVersion() ? false : true;
export const LEDGER_SERVER = prodDev('https://hardwallet.icon.foundation/index.html', 'https://hardwallet.icon.foundation/test.html')

export const getCurrentServer = (coinType) => {
  let server;
  const initialServer = coinType === 'icx' ? INITIAL_SERVER_ICX : INITIAL_SERVER_ETH;
  if (process.env.NODE_ENV === 'development' && !isAccessedFromWorker) {
    server = localStorage.getItem(`${coinType}Server`) || initialServer
  } else {
    server = initialServer
  }
  return server;
}

export const getCurrentICXApiVersion = () => {
  let apiVersion;
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    apiVersion = localStorage.getItem(`icxApiVersion`) || INITIAL_API_VERSION_ICX
  } else {
    apiVersion = INITIAL_API_VERSION_ICX
  }
  return apiVersion;
}

export const IS_V3 = getCurrentICXApiVersion() === 'v3';

export const ICX_WALLET_SERVER = () => {
  const icxServer = getCurrentServer('icx');
  const obj = {
    'test': 'https://testwallet.icon.foundation',
    'main': 'https://wallet.icon.foundation',
    'dev': 'http://13.209.103.183:9000',
    'custom': getCustomIcxServer().customWalletURL
  }
  return obj[icxServer];
}

export const ICX_TRACKER_SERVER = () => {
  const icxServer = getCurrentServer('icx');
  const obj = {
    'test': 'https://trackerdev.icon.foundation',
    'main': 'https://tracker.icon.foundation',
    'dev': 'http://trackerlocaldev.icon.foundation',
    'custom': getCustomIcxServer().customTrackerURL
  }
  return obj[icxServer];
}

export const ETH_SERVER = () => {
  const ethServer = getCurrentServer('eth');
  const obj = {
    'ropsten': 'https://ropsten.infura.io/',
    'main': 'https://eth.solidwallet.io/'
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

export const trackerAccountUrl = {
    'icx': `${ICX_TRACKER_SERVER()}/address/`,
    'eth': `${ETH_SCAN()}/address/`
}

function prodDev(prod, dev) {
  return process.env.NODE_ENV === 'production' ? prod : dev;
}
