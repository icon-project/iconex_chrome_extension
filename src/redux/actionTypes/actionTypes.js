const actionTypes = {
  // authActions
  initLoginCheck: 'INIT_LOGIN_CHECK', // check whether wallet exists
  initLoginCheckFulfilled: 'INIT_LOGIN_CHECK_FULFILLED',
  initLoginCheckRejected: 'INIT_LOGIN_CHECK_REJECTED',
  logIn: 'LOG_IN',
  logInFulfilled: 'LOG_IN_FULFILLED',
  logOut: 'LOG_OUT',
  setLockState: 'SET_LOCK_STATE',
  setUnlock: 'SET_UNLOCK',
  setShowChangePasscodePopup: 'SET_SHOW_CHANGE_PASSCODE_POPUP',

  // globalActions
  setLanguage: 'SET_LANGUAGE',
  setLanguageFulfilled: 'SET_LANGUAGE_FULFILLED',
  setLanguageRejected: 'SET_LANGUAGE_REJECTED',
  setLock: 'SET_LOCK',
  setLockFulfilled: 'SET_LOCK_FULFILLED',
  setLockRejected: 'SET_LOCK_REJECTED',
  changePasscodeHash: 'CHANGE_PASSCODE_HASH',
  setShowNotice: 'SET_SHOW_NOTICE',

  // signupActions
  setWalletName: 'SET_WALLET_NAME',
  checkSwapWalletExist: 'CHECK_SWAP_WALLET_EXIST',
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
  setSelectedWallet: 'SET_SELECTED_WALLET',
  resetSelectedWallet: 'RESET_SELECTED_WALLET',
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
  setPrivKeyAndV3ForBackup: 'SET_PRIV_KEY_AND_V3_FOR_BACKUP',

  getTokenInfo: 'GET_TOKEN_INFO',
  getTokenInfoFulfilled: 'GET_TOKEN_INFO_FULFILLED',
  getTokenInfoRejected: 'GET_TOKEN_INFO_REJECTED',
  addToken: 'ADD_TOKEN',
  addTokenFulfilled: 'ADD_TOKEN_FULFILLED',
  addTokenRejected: 'ADD_TOKEN_REJECTED',

  updateToken: 'UPDATE_TOKEN',
  updateTokenFulfilled: 'UPDATE_TOKEN_FULFILLED',
  updateTokenRejected: 'UPDATE_TOKEN_REJECTED',
  addRecentTransaction: 'ADD_RECENT_TRANSACTION',
  addRecentTransactionFulfilled: 'ADD_RECENT_TRANSACTION_FULFILLED',
  icx_checkPendingTransactionDone: 'ICX_CHECK_PENDING_TRANSACTION_DONE',
  totalResultLoading: 'TOTAL_RESULT_LOADING', // check whether all data for main page is fetched
  totalResultFulfilled: 'TOTAL_RESULT_FULFILLED',

  // popupAction
  openPopup: 'OPEN_POPUP',
  setPopupNum: 'SET_POPUP_NUM',
  closePopup: 'CLOSE_POPUP',

  // exchangeActions
  // setExchangeAccountAddress: 'SET_EXCHANGE_ACCOUNT_ADDRESS',
  // setExchangeCoinQuantity: 'SET_EXCHANGE_COIN_QUANTITY',
  // setExchangeRecipientAddress: 'SET_EXCHANGE_RECEIVED_ADDRESS',
  // checkExchangeResultBalanceMinus: 'CHECK_EXCHANGE_RESULT_BALANCE_MINUS',
  // resetExchangePageReducer: 'RESET_EXCHANGE_PAGE_REDUCER',

  // ExchangeTransactionActions
  setEXTRLogInState: 'SET_EXTR_LOG_IN_STATE',
  setCoinQuantity: 'SET_COIN_QUANTITY',
  toggleFullBalance: 'TOGGLE_FULL_BALANCE',
  setTxFeePrice: 'SET_TX_FEE_PRICE',
  setTxFeeLimit: 'SET_TX_FEE_LIMIT',
  setData: 'SET_DATA',
  setDataType: 'SET_DATA_TYPE',
  setRecipientAddress: 'SET_RECEIVED_ADDRESS',
  checkResultBalanceMinus: 'CHECK_RESULT_BALANCE_MINUS',
  sendCall: 'SEND_CALL',
  sendCallFulfilled: 'SEND_CALL_FULFILLED',
  sendCallRejected: 'SEND_CALL_REJECTED',
  setCalcData: 'SET_CALC_DATA',
  setWalletSelectorError: 'SET_WALLET_SELECTOR_ERROR',
  setCoinQuantityError: 'SEND_COIN_QUANTITY_ERROR',
  setRecipientAddressError: 'SEND_RECIPIENT_ADDRESS_ERROR',
  setDataError: 'SEND_DATA_ERROR',
  setTxFeeLimitError: 'SET_TX_FEE_LIMIT_ERROR',
  setContractTxFeeLimitError: 'SET_CONTRACT_TX_FEE_LIMIT_ERROR',
  submitCall: 'SUBMIT_CALL',
  resetEXTRPageReducer: 'RESET_EXTR_PAGE_REDUCER',
  resetEXTRInputReducer: 'RESET_EXTR_INPUT_REDUCER',
  getTxFeeInfo: 'GET_TX_FEE_INFO',
  getTxFeeInfoFulfilled: 'GET_TX_FEE_INFO_FULFILLED',
  getTxFeeInfoRejected: 'GET_TX_FEE_INFO_REJECTED',

  // historyActions
  loadHistory: 'LOAD_HISTORY',
  addHistory: 'ADD_HISTORY',
  fetchRecentHistory: 'FETCH_RECENT_HISTORY',
  fetchTransactionHistory: 'FETCH_TRANSACTION_HISTORY',
  fetchTransactionHistoryLoading: 'FETCH_TRANSACTION_HISTORY_LOADING',
  fetchTransactionHistoryFulfilled: 'FETCH_TRANSACTION_HISTORY_FULFILLED',
  fetchTransactionHistoryRejected: 'FETCH_TRANSACTION_HISTORY_REJECTED',
  resetHistoryReducer: 'RESET_HISTORY_REDUCER',

  // contractActions
  setContractAddress: 'SET_CONTRACT_ADDRESS',
  setContractAddressError: 'SET_CONTRACT_ADDRESS_ERROR',
  fetchAbi: 'FETCH_ABI',
  fetchAbiFulfilled: 'FETCH_ABI_FULFILLED',
  fetchAbiRejected: 'FETCH_ABI_REJECTED',
  getAbiByContractAddress: 'GET_ABI_BY_CONTRACT_ADDRESS',
  setFuncList: 'SET_FUNC_LIST',
  setFuncIndex: 'SET_FUNC_INDEX',
  handleFuncInputChange: 'HANDLE_FUNC_INPUT_CHANGE',
  setFuncInputError: 'SET_FUNC_INPUT_ERROR',
  setFuncInputDataExceedError: 'SET_FUNC_INPUT_DATA_EXCEED_ERROR',
  checkContractInputError: 'CHECK_CONTRACT_INPUT_ERROR',
  executeFunc: 'EXECUTE_FUNC',
  executeFuncFulfilled: 'EXECUTE_FUNC_FULFILLED',
  executeFuncRejected: 'EXECUTE_FUNC_REJECTED',
  resetContractPageReducer: 'RESET_CONTRACT_PAGE_REDUCER',
  resetContractInputOutput: 'RESET_CONTRACT_INPUT_OUTPUT',

  //ledgerActions
  setEXTRLogInStateForLedger: 'SET_EXTR_LOG_IN_STATE_FOR_LEDGER',
  confirmLedger: 'CONFIRM_LEDGER',
  resetLedgerReducer: 'RESET_LEDGER_REDUCER',
  updateWalletBalance: 'UPDATE_WALLET_BALANCE',
  updateLedgerWalletBalance: 'UPDATE_LEDGER_WALLET_BALANCE',
  updateLedgerWalletBalanceFulfilled: 'UPDATE_LEDGER_WALLET_BALANCE_FULFILLED',
  updateLedgerWalletBalanceRejected: 'UPDATE_LEDGER_WALLET_BALANCE_REJECTED',
  addTokenFulfilledForLedger: 'ADD_TOKEN_FULFILLED_FOR_LEDGER',
  fetchTokenBalanceFulfilledForLedger: 'FETCH_TOKEN_BALANCE_FULFILLED_FOR_LEDGER',

  //externalActions
  initExternalState: 'INIT_EXTERNAL_STATE',
  setAddressRequest: 'SET_ADDRESS_REQUEST',
  setScore: 'SET_SCORE',
  setScoreWallet: 'SET_SCORE_WALLET',
  setScoreStep: 'SET_SCORE_STEP',
  callScore: 'CALL_SCORE',
  callScoreFulfilled: 'CALL_SCORE_FULFILLED',
  callScoreRejected: 'CALL_SCORE_REJECTED',
  setSigning: 'SET_SIGNING',
  callSigning: 'CALL_SIGNING',
  
  //addressBookActions
  addAddressInAddressBook: 'ADD_ADDRESS_IN_ADDRESS_BOOK',
  deleteAddressInAddressBook: 'DELETE_ADDRESS_IN_ADDRESS_BOOK',
};

export default actionTypes;
