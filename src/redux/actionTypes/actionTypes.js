const actionTypes = {
  // authActions
  initLoginCheck: 'INIT_LOGIN_CHECK', // check whether wallet exists
  initLoginCheckFulfilled: 'INIT_LOGIN_CHECK_FULFILLED',
  initLoginCheckRejected: 'INIT_LOGIN_CHECK_REJECTED',
  logIn: 'LOG_IN',
  logInFulfilled: 'LOG_IN_FULFILLED',
  logOut: 'LOG_OUT',
  checkIsLocked: 'CHECK_IS_LOCKED',
  setUnlock: 'SET_UNLOCK',

  // globalActions
  setLanguage: 'SET_LANGUAGE',
  setLanguageFulfilled: 'SET_LANGUAGE_FULFILLED',
  setLanguageRejected: 'SET_LANGUAGE_REJECTED',
  setLock: 'SET_LOCK',
  setLockFulfilled: 'SET_LOCK_FULFILLED',
  setLockRejected: 'SET_LOCK_REJECTED',
  changePasscodeHash: 'CHANGE_PASSCODE_HASH',
  changeEmail: 'CHANGE_EMAIL',
  setShowNotice: 'SET_SHOW_NOTICE',

  // signupActions
  setWalletName: 'SET_WALLET_NAME',
  setCoinType: 'SET_COIN_TYPE',
  createWallet: 'CREATE_WALLET', // create one wallet
  createWalletFulfilled: 'CREATE_WALLET_FULFILLED',
  createWalletRejected: 'CREATE_WALLET_REJECTED',
  createWallets: 'CREATE_WALLETS', // create multiple wallets when import iconEX backup file
  createWalletsFulfilled: 'CREATE_WALLETS_FULFILLED',
  createWalletsRejected: 'CREATE_WALLETS_REJECTED',

  // walletActions
  deleteWallet: 'DELETE_WALLET',
  deleteWalletFulfilled: 'DELETE_WALLET_FULFILLED',
  deleteWalletRejected: 'DELETE_WALLET_REJECTED',
  deleteToken: 'DELETE_TOKEN',
  deleteTokenFulfilled: 'DELETE_TOKEN_FULFILLED',
  deleteTokenRejected: 'DELETE_TOKEN_REJECTED',
  generateWallet: 'GENERATE_WALLET',
  generateWalletFulfilled: 'GENERATE_WALLET_FULFILLED',
  generateWalletRejected: 'GENERATE_WALLET_REJECTED',
  setWalletObject: 'SET_WALLET_OBJECT',
  setIconexObject: 'SET_ICONEX_OBJECT',
  setV3Object: 'SET_V3_OBJECT',
  resetInfo: 'RESET_INFO', // reset info. when move from CreateWallet_3 to CreateWallet_2
  resetSignupReducer: 'RESET_SIGNUP_REDUCER', // reset all data
  setIcxSwapAddress: 'SET_ICX_SWAP_ADDRESS',
  setPrivKeyForSwap: 'SET_PRIV_KEY_FOR_SWAP',
  setAddress: 'SET_ADDRESS',
  setWalletNameAndPasswordForSwap: 'SET_WALLET_NAME_AND_PASSWORD_FOR_SWAP',
  fetchAll: 'FETCH_ALL', // fetch balance, token data from blockchain network
  getWallet: 'GET_WALLET', // fetch wallet data from storage
  getWalletLoading: 'GET_WALLET_LOADING',
  getWalletFulfilled: 'GET_WALLET_FULFILLED',
  getWalletRejected: 'GET_WALLET_REJECTED',
  fetchWalletData: 'FETCH_WALLET_DATA',  // fetch wallet data (coin + token)
  fetchWalletDataFulfilled: 'FETCH_WALLET_DATA_FULFILLED',
  fetchWalletDataRejected: 'FETCH_WALLET_DATA_REJECTED',
  fetchCoinBalance: 'FETCH_COIN_BALANCE', // fetch coin balance only
  fetchCoinBalanceLoading: 'FETCH_COIN_BALANCE_LOADING',
  fetchCoinBalanceFulfilled: 'FETCH_COIN_BALANCE_FULFILLED',
  fetchCoinBalanceRejected: 'FETCH_COIN_BALANCE_REJECTED',
  fetchTokenBalance: 'FETCH_TOKEN_BALANCE', // fetch token balance only
  fetchTokenBalanceLoading: 'FETCH_TOKEN_BALANCE_LOADING',
  fetchTokenBalanceFulfilled: 'FETCH_TOKEN_BALANCE_FULFILLED',
  fetchTokenBalanceRejected: 'FETCH_TOKEN_BALANCE_REJECTED',
  setCurrency: 'SET_CURRENCY',
  getRate: 'GET_RATE',
  getRateLoading: 'GET_RATE_LOADING',
  getRateFulfilled: 'GET_RATE_FULFILLED',
  getRateRejected: 'GET_RATE_REJECTED',
  setExportWalletObject: 'SET_EXPORT_WALLET_OBJECT',
  setNewPw: 'SET_NEW_PW',
  resetExportWalletState: 'RESET_EXPORT_WALLET_STATE',
  updateWalletName: 'UPDATE_WALLET_NAME',
  updateWalletNameFulfilled: 'UPDATE_WALLET_NAME_FULFILLED',
  updateWalletNameRejected: 'UPDATE_WALLET_NAME_REJECTED',
  updatePassword: 'UPDATE_PASSWORD',
  updatePasswordFulfilled: 'UPDATE_PASSWORD_FULFILLED',
  updatePasswordRejected: 'UPDATE_PASSWORD_REJECTED',
  setPrivKeyForBackup: 'SET_PRIV_KEY_FOR_BACKUP',
  isExistToken: 'IS_EXIST_TOKEN',
  isExistTokenFulfilled: 'IS_EXIST_TOKEN_FULFILLED',
  isExistTokenRejected: 'IS_EXIST_TOKEN_REJECTED',
  getTokenInfo: 'GET_TOKEN_INFO',
  getTokenInfoFulfilled: 'GET_TOKEN_INFO_FULFILLED',
  getTokenInfoRejected: 'GET_TOKEN_INFO_REJECTED',
  addToken: 'ADD_TOKEN',
  addTokenFulfilled: 'ADD_TOKEN_FULFILLED',
  addTokenRejected: 'ADD_TOKEN_REJECTED',
  resetAddTokenState: 'RESET_ADD_TOKEN_STATE',
  updateToken: 'UPDATE_TOKEN',
  updateTokenFulfilled: 'UPDATE_TOKEN_FULFILLED',
  updateTokenRejected: 'UPDATE_TOKEN_REJECTED',
  addRecentTransaction: 'ADD_RECENT_TRANSACTION',
  addRecentTransactionFulfilled: 'ADD_RECENT_TRANSACTION_FULFILLED',
  icx_checkPendingTransactionDone: 'ICX_CHECK_PENDING_TRANSACTION_DONE',

  // mainPageUIActions
  totalResultLoading: 'TOTAL_RESULT_LOADING', // check whether all data for main page is fetched
  totalResultFulfilled: 'TOTAL_RESULT_FULFILLED',
  resetMainPageUIReducer: 'RESET_MAIN_PAGE_UI_REDUCER',
  setSelectedAccount: 'SET_SELECTED_ACCOUNT', // store account string which clicked
  setSelectedToken: 'SET_SELECTED_TOKEN',

  // popupAction
  togglePopup: 'TOGGLE_POPUP',
  setPopupType: 'SET_POPUP_TYPE',
  setPopupNum: 'SET_POPUP_NUM',
  initPopupState: 'INIT_POPUP_STATE',

  // exchangeActions
  setExchangeAccountAddress: 'SET_EXCHANGE_ACCOUNT_ADDRESS',
  setExchangeCoinQuantity: 'SET_EXCHANGE_COIN_QUANTITY',
  setExchangeRecipientAddress: 'SET_EXCHANGE_RECEIVED_ADDRESS',
  checkExchangeResultBalanceMinus: 'CHECK_EXCHANGE_RESULT_BALANCE_MINUS',
  resetExchangePageReducer: 'RESET_EXCHANGE_PAGE_REDUCER',

  // ExchangeTransactionActions
  setEXTRPageType: 'SET_EXTR_PAGE_TYPE',
  setEXTRLogInState: 'SET_EXTR_LOG_IN_STATE',
  getTxFee: 'GET_TX_FEE',
  getTxFeeFulfilled: 'GET_TX_FEE_FULFILLED',
  getTxFeeRejected: 'GET_TX_FEE_REJECTED',
  setAccountAddress: 'SET_ACCOUNT_ADDRESS',
  setCoinQuantity: 'SET_COIN_QUANTITY',
  setGasPrice: 'SET_GAS_PRICE',
  setGasLimit: 'SET_GAS_LIMIT',
  setData: 'SET_DATA',
  setRecipientAddress: 'SET_RECEIVED_ADDRESS',
  checkResultBalanceMinus: 'CHECK_RESULT_BALANCE_MINUS',
  sendCall: 'SEND_CALL',
  sendCallFulfilled: 'SEND_CALL_FULFILLED',
  sendCallRejected: 'SEND_CALL_REJECTED',
  setCalcData: 'SET_CALC_DATA',
  setCoinQuantityError: 'SEND_COIN_QUANTITY_ERROR',
  setRecipientAddressError: 'SEND_RECIPIENT_ADDRESS_ERROR',
  setDataError: 'SEND_DATA_ERROR',
  setGasLimitError: 'SEND_GAS_LIMIT_ERROR',
  submitCall: 'SUBMIT_CALL',
  resetEXTRPageReducer: 'RESET_EXTR_PAGE_REDUCER',
  resetEXTRInputReducer: 'RESET_EXTR_INPUT_REDUCER',
  getGasInfo: 'GET_GAS_INFO',
  getGasInfoFulfilled: 'GET_GAS_INFO_FULFILLED',
  getGasInfoRejected: 'GET_GAS_INFO_REJECTED',

  // historyActions
  loadHistory: 'LOAD_HISTORY',
  addHistory: 'ADD_HISTORY',
  fetchTransactionHistory: 'FETCH_TRANSACTION_HISTORY',
  fetchTransactionHistoryLoading: 'FETCH_TRANSACTION_HISTORY_LOADING',
  fetchTransactionHistoryFulfilled: 'FETCH_TRANSACTION_HISTORY_FULFILLED',
  fetchTransactionHistoryRejected: 'FETCH_TRANSACTION_HISTORY_REJECTED',
  resetHistoryReducer: 'RESET_HISTORY_REDUCER',
};

export default actionTypes;
