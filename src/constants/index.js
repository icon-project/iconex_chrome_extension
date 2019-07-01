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
  'voting': '/voting',
  'exchange': '/exchange',
  'transaction': '/transaction',
  'contract': '/contract',
  'mypage': '/mypage',
  'lock': '/lock',
  'send': '/send',
  'check': '/check',
  'complete': '/complete'
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
  'usd': 3,
  'btc': 8,
  'eth': 8
}

export const tokenList = {
  'BLOC8': {
    address: 'cxbdda1241313c0113f8ebf4b974239b145558513a',
    decimals: 18,
    name: 'BLOC8',
    symbol: 'BLOC8'
  },
  'AC3': {
    address: 'cx9ab3078e72c8d9017194d17b34b1a47b661945ca',
    decimals: 18,
    name: 'AC3',
    symbol: 'AC3'
  },
  'IGA': {
    address: 'cx81fe20ac9a8ed7387b8d17be878c1d0ccb01aabf',
    decimals: 18,
    name: 'IconGameAlliance',
    symbol: 'IGA'
  },
  'MCA': {
    address: 'cxf9148db4f8ec78823a50cb06c4fed83660af38d0',
    decimals: 0,
    name: 'MECA Coin',
    symbol: 'MCA'
  },
  'PNP': {
    address: 'cx2137642d0bf1926fbe23a3688d042a0f34bc2b9a',
    decimals: 18,
    name: 'LogisticsX',
    symbol: 'PNP'
  },
  'SPORT': {
    address: 'cx3ec2814520c0096715159b8fc55fa1f385be038c',
    decimals: 18,
    name: 'SportToken',
    symbol: 'SPORT'
  },
  'SSX': {
    address: 'cx429731644462ebcfd22185df38727273f16f9b87',
    decimals: 18,
    name: 'Somesing Exchange',
    symbol: 'SSX'
  },
  'VCX': {
    address: 'cxbc264e6279ec971f11ebe3939fc88d05b243eba7',
    decimals: 18,
    name: 'VELICX',
    symbol: 'VCX'
  },
  'VELA': {
    address: 'cxefaa21e34a3a1abf97369b5beef84524f52d88a8',
    decimals: 8,
    name: 'Velic Authority',
    symbol: 'VELA'
  },
  'VELT': {
    address: 'cx19a23e850bf736387cd90d0b6e88ce9af76a8d41',
    decimals: 8,
    name: 'Velic Token',
    symbol: 'VELT'
  },
  'WOK': {
    address: 'cx921205acb7c51e16d5b7cbc37539a4357d929d20',
    decimals: 18,
    name: 'weBloc',
    symbol: 'WOK'
  },
  'IGA': {
    address: 'cx81fe20ac9a8ed7387b8d17be878c1d0ccb01aabf',
    decimals: 18,
    name: 'IconGameAlliance',
    symbol: 'IGA'
  },
  'PNP': {
    address: 'cx2137642d0bf1926fbe23a3688d042a0f34bc2b9a',
    decimals: 18,
    name: 'LogisticsX',
    symbol: 'PNP'
  },
  'SSX': {
    address: 'cx429731644462ebcfd22185df38727273f16f9b87',
    decimals: 18,
    name: 'Somesing Exchange',
    symbol: 'SSX'
  },
  'VELA': {
    address: 'cxefaa21e34a3a1abf97369b5beef84524f52d88a8',
    decimals: 8,
    name: 'Velic Authority',
    symbol: 'VELA'
  },
  'VELT': {
    address: 'cx19a23e850bf736387cd90d0b6e88ce9af76a8d41',
    decimals: 8,
    name: 'Velic Token',
    symbol: 'VELT'
  },
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
