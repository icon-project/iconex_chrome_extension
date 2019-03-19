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
export const INITIAL_SERVER_ICX = prodDev('Mainnet', 'Euljiro');
export const INITIAL_SERVER_ETH = prodDev('main', 'ropsten');

export const HIDE_SERVER = isDevModeOn() ? false : true;
export const LEDGER_SERVER = prodDev('https://hardwallet.icon.foundation/index.html', 'https://hardwallet.icon.foundation/test.html')

export const getCurrentServer = (coinType) => {
  let server;
  const initialServer = coinType === 'icx' ? INITIAL_SERVER_ICX : INITIAL_SERVER_ETH;
  if (!isAccessedFromWorker) {
    server = localStorage.getItem(`${coinType}Server`) || initialServer
  } else {
    server = initialServer
  }
  return server;
}

export const getCurrentICXApiVersion = () => {
  let apiVersion;
  if (!isAccessedFromWorker) {
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
    'Mainnet': 'https://wallet.icon.foundation',
    'Testnet': 'https://test-ctz.solidwallet.io',
    'Devnet': 'https://bicon.net.solidwallet.io',
    'Custom 1': getCustomIcxServer().customWalletURL
  }
  return obj[icxServer];
}

export const ICX_TRACKER_SERVER = () => {
  const icxServer = getCurrentServer('icx');
  const obj = {
    'Mainnet': 'https://tracker.icon.foundation',
    'Testnet': 'https://trackerdev.icon.foundation',
    'Devnet': 'https://bicon.tracker.solidwallet.io',
    'Custom 1': getCustomIcxServer().customTrackerURL
  }
  return obj[icxServer];
}

export const ICX_NID = () => {
  const icxServer = getCurrentServer('icx');
  const obj = {
    'Mainnet': '0x1',
    'Testnet': '0x2',
    'Devnet': '0x3',
    'Custom 1': getCustomIcxServer().customNid
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

// list constants
export const icxServerList = {
  'Mainnet': 'Mainnet',
  'Testnet': 'Testnet',
  'Devnet': 'Devnet',
  'Custom 1': 'Custom 1'
  // 'Mainnet': 'Mainnet',
  // 'Euljiro': 'Testnet',
  // 'Yeouido': 'Devnet',
  // 'Custom': 'Custom 1'
}

export const icxApiVersionList = {
  'v2': 'v2',
  'v3': 'v3'
}
export const ethServerList = {
  'ropsten': 'ropsten',
  'main': 'main'
}


function prodDev(prod, dev) {
  return process.env.NODE_ENV === 'production' ? prod : dev;
}

