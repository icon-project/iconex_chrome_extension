/** @format */

const isAccessedFromWorker = typeof window === "undefined";

const isDevModeOn = () => {
  if (isAccessedFromWorker) {
    return false;
  } else {
    return true; // Always show
    // return localStorage.getItem("isDev") || false;
  }
};

export const getCustomIcxServer = () => {
  const initialCustomServer = {
    customWalletURL: "",
    customTrackerURL: "",
    customNid: "",
  };
  if (isAccessedFromWorker) {
    return initialCustomServer;
  } else {
    return localStorage.getItem("customIcxServer")
      ? JSON.parse(localStorage.getItem("customIcxServer"))
      : initialCustomServer;
  }
};

export const INITIAL_API_VERSION_ICX = "v3";
export const INITIAL_SERVER_ICX = prodDev("mainnet", "lisbon");
export const INITIAL_SERVER_ETH = prodDev("main", "ropsten");

export const HIDE_SERVER = isDevModeOn() ? false : true;
export const LEDGER_SERVER = prodDev(
  "https://hardwallet.icon.foundation/index_jw.html",
  "https://hardwallet.icon.foundation/index_jw.html"
);

export const getCurrentServer = (coinType) => {
  let server;
  const initialServer =
    coinType === "icx" ? INITIAL_SERVER_ICX : INITIAL_SERVER_ETH;
  if (!isAccessedFromWorker) {
    server = localStorage.getItem(`${coinType}Server`) || initialServer;
  } else {
    server = initialServer;
  }
  return server;
};

export const ICX_WALLET_SERVER = () => {
  const icxServer = getCurrentServer("icx");
  const obj = {
    mainnet: "https://wallet.icon.foundation",
    lisbon: "https://lisbon.net.solidwallet.io",
    berlin: "https://berlin.net.solidwallet.io",
    sejong: "https://sejong.net.solidwallet.io",
    custom: getCustomIcxServer().customWalletURL,
  };
  return obj[icxServer];
};

export const ICX_TRACKER_SERVER = () => {
  const icxServer = getCurrentServer("icx");
  const obj = {
    mainnet: "https://tracker.icon.foundation",
    lisbon: "https://lisbon.tracker.solidwallet.io",
    berlin: "https://berlin.tracker.solidwallet.io",
    sejong: "https://sejong.tracker.solidwallet.io",
    custom: getCustomIcxServer().customTrackerURL,
  };
  return obj[icxServer];
};

export const ICX_CPS_SCORE = () => {
  const icxServer = getCurrentServer("icx");
  const obj = {
    mainnet: "cx9f4ab72f854d3ccdc59aa6f2c3e2215dd62e879f",
    lisbon: "",
    berlin: "",
    sejong: "",
    custom: "",
  };
  return obj[icxServer];
};

export const ICX_NID = () => {
  const icxServer = getCurrentServer("icx");
  const obj = {
    mainnet: "0x1",
    lisbon: "0x2",
    berlin: "0x7",
    sejong: "0x53",
    custom: getCustomIcxServer().customNid,
  };
  return obj[icxServer];
};

export const ETH_SERVER = () => {
  const ethServer = getCurrentServer("eth");
  const obj = {
    ropsten: "https://ropsten.infura.io",
    main: "https://eth.solidwallet.io",
  };
  return obj[ethServer];
};

export const ETH_SCAN = () => {
  const ethServer = getCurrentServer("eth");
  const obj = {
    ropsten: "https://ropsten.etherscan.io",
    main: "https://etherscan.io",
  };
  return obj[ethServer];
};

// EIP 155 chainId - mainnet: 1, ropsten: 3
export const CHAIN_ID = () => {
  const ethServer = getCurrentServer("eth");
  const obj = {
    ropsten: 3,
    main: 1,
  };
  return obj[ethServer];
};

export const ICX_TOKEN_CONTRACT_ADDRESS = () => {
  const ethServer = getCurrentServer("eth");
  const obj = {
    ropsten: "0x55116b9cf269e3f7e9183d35d65d6c310fcacf05",
    main: "0xb5a5f22694352c15b00323844ad545abb2b11028",
  };
  return obj[ethServer];
};

export const ICX_TOKEN_DISCARD_ADDRESS = () => {
  const ethServer = getCurrentServer("eth");
  const obj = {
    ropsten: "0x0000000000000000000000000000000000000000",
    main: "0x0000000000000000000000000000000000000000",
  };
  return obj[ethServer];
};

export const txidUrl = {
  icx: `${ICX_TRACKER_SERVER()}/transaction/`,
  eth: `${ETH_SCAN()}/tx/`,
};

export const trackerAccountUrl = {
  icx: `${ICX_TRACKER_SERVER()}/address/`,
  eth: `${ETH_SCAN()}/address/`,
};

// list constants
export const icxServerList = {
  mainnet: "mainnet",
  lisbon: "lisbon",
  berlin: "berlin",
  sejong: "sejong",
  custom: "custom",
};

export const icxApiVersionList = {
  v2: "v2",
  v3: "v3",
};
export const ethServerList = {
  ropsten: "ropsten",
  main: "main",
};

function prodDev(prod, dev) {
  return process.env.NODE_ENV === "production" ? prod : dev;
}
