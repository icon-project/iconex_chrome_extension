const isDevVersion = () => process.env.USER === 'developer';
const isAccessedFromWorker = typeof window === 'undefined';

const isDevModeOn = () => {
  if (isAccessedFromWorker) {
    return false
  } else {
    return localStorage.getItem('isDev') || false
  }
}

export const getCustomIcxServer = () => {
  const initialCustomServer = {
    customWalletURL: '',
    customTrackerURL: '',
    customNid: ''
  }
  if (isAccessedFromWorker) {
    return initialCustomServer
  } else {
    return localStorage.getItem('customIcxServer')
              ? JSON.parse(localStorage.getItem('customIcxServer'))
              : initialCustomServer
  }
}

export const INITIAL_API_VERSION_ICX = 'v3';
export const INITIAL_SERVER_ICX = prodDev('mainnet', 'euljiro');
export const INITIAL_SERVER_ETH = prodDev('main', 'ropsten');

export const HIDE_SERVER = (isDevVersion() || isDevModeOn()) ? false : true;
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
    'mainnet': 'https://ctz.solidwallet.io',
    'euljiro': 'https://test-ctz.solidwallet.io',
    'yeouido': 'https://bicon.net.solidwallet.io',
    'custom': getCustomIcxServer().customWalletURL
  }
  return obj[icxServer];
}

export const ICX_TRACKER_SERVER = () => {
  const icxServer = getCurrentServer('icx');
  const obj = {
    'mainnet': 'https://tracker.icon.foundation',
    'euljiro': 'https://trackerdev.icon.foundation',
    'yeouido': 'https://bicon.tracker.solidwallet.io',
    'custom': getCustomIcxServer().customTrackerURL
  }
  return obj[icxServer];
}

export const ICX_NID = () => {
  const icxServer = getCurrentServer('icx');
  const obj = {
    'mainnet': '0x1',
    'euljiro': '0x2',
    'yeouido': '0x3',
    'custom': getCustomIcxServer().customNid
  }
  return obj[icxServer];
}

export const ETH_SERVER = () => {
  const ethServer = getCurrentServer('eth');
  const obj = {
    'ropsten': 'https://ropsten.infura.io',
    'main': 'https://eth.solidwallet.io'
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
