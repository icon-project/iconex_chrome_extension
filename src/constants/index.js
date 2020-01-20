import ICON from "app/image/icon/icon_01.png";
import ETH from "app/image/icon/icon_02.png";

export const coinLabel = {
  icx: "ICON (ICX)",
  eth: "Ethereum (ETH)"
};

export const languageConstants = {
  kr: "Korean",
  en: "English"
};

export const popupType = {
  createWallet: "_01_createWallet"
};

export const v3_options_pdkdf2 = {
  kdf: "pbkdf2",
  c: 16384,
  cipher: "aes-128-ctr",
  prf: "hmac-sha256"
};

export const v3_options = {
  kdf: "scrypt",
  n: 16384,
  cipher: "aes-128-ctr"
};

export const routeConstants = {
  home: "/",
  mywallet: "/mywallet",
  voting: "/voting",
  exchange: "/exchange",
  transaction: "/transaction",
  contract: "/contract",
  mypage: "/mypage",
  lock: "/lock",
  send: "/send",
  check: "/check",
  complete: "/complete"
};

export const dateFormat = "YYYY-MM-DD HH:mm:ss";

export const blockSearchNum = 300;

export const copyState = {
  off: "",
  on: "복사완료"
};

export const coinImage = {
  icx: ICON,
  eth: ETH
};

export const coinName = {
  icx: "ICON",
  eth: "Ethereum"
};

export const coinNameKorean = {
  icx: "아이콘",
  eth: "이더리움"
};

export const currencyName = {
  usd: "USD",
  btc: "BTC",
  eth: "ETH",
  icx: "ICX"
};

export const currencyUnit = {
  usd: "USD",
  btc: "BTC",
  eth: "ETH"
};

export const coinRound = {
  icx: 8,
  eth: 8
};

export const currencyRound = {
  usd: 3,
  btc: 8,
  eth: 8
};

export const pRepType = {
  MAIN_PREP: "Main P-Rep",
  SUB_PREP: "Sub P-Rep",
  PREP: "Candidate"
};

export const MIN_UNSTAKE_VALUE = 1;

export const ZERO_ADDRESS = "cx0000000000000000000000000000000000000000";

export const L_MAX = 20;

export const L_MIN = 5;

export const R_POINT = 0.7;

export const tokenList = {
  AC3: {
    address: "cx9ab3078e72c8d9017194d17b34b1a47b661945ca",
    decimals: 18,
    name: "AC3",
    symbol: "AC3"
  },
  ACT: {
    address: "cx502c47463314f01e84b1b203c315180501eb2481",
    decimals: 18,
    name: "ACT",
    symbol: "ACT"
  },
  ATK: {
    address: "cxa3512fb64b8808ca07a8469e391b33d7243153b5",
    decimals: 18,
    name: "Andrew Token",
    symbol: "ATK"
  },
  BEA: {
    address: "cxfdc37ff554fd0a7fae0073984d5e0d89739a7bb6",
    decimals: 0,
    name: "Bea's Coin",
    symbol: "BEA"
  },
  BLOC8: {
    address: "cxbdda1241313c0113f8ebf4b974239b145558513a",
    decimals: 18,
    name: "BLOC8",
    symbol: "BLOC8"
  },
  BXO: {
    address: "cxe1c39cac4b1976ae81c3fc0a4bd654f884c775bf",
    decimals: 18,
    name: "BOOKSON",
    symbol: "BXO"
  },
  BRF: {
    address: "cxf537f85007f26415a82e9b41ea77fa6ec2e3e4cd",
    decimals: 18,
    name: "broof",
    symbol: "BRF"
  },
  CJLSS: {
    address: "cx5931aa6e4870efea295850500b80166328cfa2b4",
    decimals: 0,
    name: "CJ Cooperation",
    symbol: "CJLSS"
  },
  DCX: {
    address: "cx17eb6014740f2ae1d547df76fa593f988986661b",
    decimals: 18,
    name: "DiceCoinX",
    symbol: "DCX"
  },
  GUP: {
    address: "cxba7a8271d85ed673d27574a30e3261e147902e92",
    decimals: 18,
    name: "ELGUAPO COIN",
    symbol: "GUP"
  },
  ITD: {
    address: "cx82e9075445764ef32f772d11f5cb08dae71d463b",
    decimals: 18,
    name: "ICON Talent Donation",
    symbol: "ITD"
  },
  ICBX: {
    address: "cxd9858f1c48df0e9b1237c2a757d468b41bd94fc1",
    decimals: 18,
    name: "ICONBET",
    symbol: "ICBX"
  },
  IGA: {
    address: "cx81fe20ac9a8ed7387b8d17be878c1d0ccb01aabf",
    decimals: 18,
    name: "IconGameAlliance",
    symbol: "IGA"
  },
  IDA: {
    address: "cxb6eb15f06653d40e2259b7f41d240e597cffb8cb",
    decimals: 18,
    name: "icon_delta_token",
    symbol: "IDA"
  },
  INX: {
    address: "cx862833853e07ab4f808a1532efb48aafbeaf5d81",
    decimals: 18,
    name: "Insight Token",
    symbol: "INX"
  },
  KRWb: {
    address: "cxbd31ecb07aca9f6f65e00cbcb94189eb209c5148",
    decimals: 4,
    name: "KRWb Token",
    symbol: "KRWb"
  },
  PNP: {
    address: "cx2137642d0bf1926fbe23a3688d042a0f34bc2b9a",
    decimals: 18,
    name: "LogisticsX",
    symbol: "PNP"
  },
  MCA: {
    address: "cxf9148db4f8ec78823a50cb06c4fed83660af38d0",
    decimals: 0,
    name: "MECA Coin",
    symbol: "MCA"
  },
  MYID: {
    address: "cx1485a8d99c0c670cc52429dc2e999830427d9941",
    decimals: 18,
    name: "MYID",
    symbol: "MYID"
  },
  PAT: {
    address: "cx8c43c6980d57aee6a0c69fb3a2f3c30fb0801b6d",
    decimals: 18,
    name: "PATRICK",
    symbol: "PAT"
  },
  PRT: {
    address: "cxea312eb662a97659d1ccf44381eeb2c943161bb7",
    decimals: 18,
    name: "P_Rep Token",
    symbol: "PRT"
  },
  SSX: {
    address: "cx429731644462ebcfd22185df38727273f16f9b87",
    decimals: 18,
    name: "Somesing Exchange",
    symbol: "SSX"
  },
  SPORTS: {
    address: "cx08eb683a53d6f244d538a45f0cc584825e2cb985",
    decimals: 18,
    name: "SportsToken",
    symbol: "SPORTS"
  },
  SPORT: {
    address: "cx3ec2814520c0096715159b8fc55fa1f385be038c",
    decimals: 18,
    name: "SportToken",
    symbol: "SPORT"
  },
  TAP: {
    address: "cxc0b5b52c9f8b4251a47e91dda3bd61e5512cd782",
    decimals: 18,
    name: "TapToken",
    symbol: "TAP"
  },
  TST: {
    address: "cxbf638bac4c5f7905141f25a3add16ba5544a0417",
    decimals: 18,
    name: "Test Token",
    symbol: "TST"
  },
  VELA: {
    address: "cxefaa21e34a3a1abf97369b5beef84524f52d88a8",
    decimals: 8,
    name: "Velic Authority",
    symbol: "VELA"
  },
  VELT: {
    address: "cx19a23e850bf736387cd90d0b6e88ce9af76a8d41",
    decimals: 8,
    name: "Velic Token",
    symbol: "VELT"
  },
  VCX: {
    address: "cxbc264e6279ec971f11ebe3939fc88d05b243eba7",
    decimals: 18,
    name: "VELICX",
    symbol: "VCX"
  },
  WOK: {
    address: "cx921205acb7c51e16d5b7cbc37539a4357d929d20",
    decimals: 18,
    name: "weBloc",
    symbol: "WOK"
  },
  NEQ: {
    address: "cx0b6d085c4f42ca85da612a8cc02a519241587e14",
    decimals: 18,
    name: "WideNEQ",
    symbol: "NEQ"
  },
  WTU: {
    address: "cxc248ee72f58f7ec0e9a382379d67399f45b596c7",
    decimals: 18,
    name: "WITHU",
    symbol: "WTU"
  }
};

export const erc20Abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function"
  }
];
