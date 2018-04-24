export const ICX_WALLET_SERVER = prodDev('https://wallet.icon.foundation', 'https://testwallet.icon.foundation')
export const ICX_TRACKER_SERVER = prodDev('https://tracker.icon.foundation', 'https://trackerdev.icon.foundation')
export const ETH_SERVER = prodDev('https://api.myetherapi.com/eth', 'https://ropsten.infura.io/')
export const ETH_SCAN = prodDev('https://etherscan.io', 'https://ropsten.etherscan.io')
// EIP 155 chainId - mainnet: 1, ropsten: 3
export const CHAIN_ID = prodDev(1, 3);
export const GA_TRACKING_ID = '';
export const txidUrl = {
  'icx': ICX_TRACKER_SERVER + '/transaction/',
  'eth': ETH_SCAN + '/tx/'
}
function prodDev(prod, dev) {
  return process.env.NODE_ENV === 'production' ? prod : dev;
}
export const APP_VERSION = process.env.NODE_ENV === 'development' ? `0.${process.env.APP_VERSION}` : `1.${process.env.APP_VERSION}`;
export const IcxContractAddress = prodDev('0xb5a5f22694352c15b00323844ad545abb2b11028', '0x55116b9cf269e3f7e9183d35d65d6c310fcacf05')
export const IcxDiscardAddress = prodDev('0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000')
