import ICON from 'app/image/icon/icon_01.png';
import ETH from 'app/image/icon/icon_02.png';

export const coinLabel = {
  'icx': 'ICON (ICX)',
  'eth': 'Ethereum (ETH)'
}

export const languageConstants = {
  'kr': 'Korean',
  'en': 'English'
}

export const popupType = {
  'createWallet': '_01_createWallet'
}

export const v3_options_pdkdf2 =  {
  kdf: "pbkdf2",
  c: 16384,
  cipher: "aes-128-ctr",
  prf: "hmac-sha256"
};

export const v3_options = {
  kdf: "scrypt",
  n: 16384,
  cipher: "aes-128-ctr",
}

export const routeConstants = {
  'home': '/',
  'mywallet': '/mywallet',
  'exchange': '/exchange',
  'transaction': '/transaction',
  'contract': '/contract',
  'mypage': '/mypage',
  'lock': '/lock'
}

export const dateFormat = "YYYY-MM-DD HH:mm:ss"

export const blockSearchNum = 300

export const copyState = {
  'off': '',
  'on': '복사완료'
}

export const coinImage = {
  'icx': ICON,
  'eth': ETH
}

export const coinName = {
  'icx': 'ICON',
  'eth': 'Ethereum'
}

export const coinNameKorean = {
  'icx': '아이콘',
  'eth': '이더리움'
}

export const currencyName = {
  'usd': 'USD',
  'btc': 'BTC',
  'eth': 'ETH',
  'icx': 'ICX'
}

export const currencyUnit = {
  'usd': 'USD',
  'btc': 'BTC',
  'eth': 'ETH'
}


export const coinRound = {
  'icx': 8,
  'eth': 8
}

export const currencyRound = {
  'usd': 2,
  'btc': 8,
  'eth': 8
}

export const tokenList = {
  '1STT': {
    address: '40aade55175aaeed9c88612c3ed2ff91d8943964',
    decimals: 18,
    name: 'FirstBlood Test Token',
    symbol: '1STT'
  },
  'STT': {
    address: 'c55cf4b03948d7ebc8b9e8bad92643703811d162',
    decimals: 18,
    name: 'Status Test Token',
    symbol: 'STT'
  },
  'BOKKY': {
    address: '583cbbb8a8443b38abcc0c956bece47340ea1367',
    decimals: 18,
    name: 'BokkyPooBah Test Token',
    symbol: 'BOKKY'
  }
}

export const erc20Abi = [
  {
    "constant":true,
    "inputs":[],
    "name":"name",
    "outputs":[{"name":"","type":"string"}],
    "payable":false,
    "type":"function"
  },{
    "constant":true,
    "inputs":[],
    "name":"totalSupply",
    "outputs":[{"name":"","type":"uint256"}],
    "payable":false,
    "type":"function"
  },{
    "constant":true,
    "inputs":[],
    "name":"symbol",
    "outputs":[{"name":"","type":"string"}],
    "payable":false,
    "type":"function"
  },{
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "payable":false,
    "type":"function"
  },
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "payable":false,
    "type":"function"
  },
  {
    "constant":false,
    "inputs":[{"name":"_to","type":"address"}, {"name":"_value","type":"uint256"}],
    "name":"transfer",
    "outputs":[{"name":"success","type":"bool"}],
    "payable":false,
    "type":"function"
  }
];
