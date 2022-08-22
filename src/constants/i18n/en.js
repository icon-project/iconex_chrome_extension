export default {
  button: {
    confirm: "Confirm",
    submit: "Complete",
    back: "Back",
    next: "Next",
    yes: "Yes",
    no: "No",
    import: "Load",
    change: "Change",
    add: "Add",
    cancel: "Cancel",
    modify: "Change",
    download: "Download Keystore file (wallet backup file)",
    upload: "Select Keystore File (wallet backup file)",
    copy: "Copy Address",
    copyFinish: "Copy Complete",
    print: "Print Wallet",
    checkTransction: "Check Transaction",
    checkTx: "Check Transaction",
    reset: "Reset",
    changeToken: "Change Token",
    removeToken: "Remove Token",
    myAddress: "My Address",
    recentTransactionAddress: "Recent Address",
    exchange: "Exchange",
    transfer: "Transfer",
    copyPrivateKey: "Copy Private Key",
    tokenInfo: "Input Token Info.",
    select: "Select",
    unlock: "Deactivate Screen Lock",
    copyDepositAddress: "Copy Address",
    close: "Close",
    complete: "Complete",
    goToWallet: "Access My Wallet",
    connect: "Connect",
    connectLedger: "Connect to Ledger",
    retry: "Retry",
    read: "Read",
    write: "Write",
    edit: "Edit",
    editComplete: "Complete",
    delete: "Delete",
    stake: "Stake",
    vote: "Vote",
    bond: "Bond",
    claim: "Claim",
    search: "Search",
    adjust: "Adjust",
  },

  error: {
    pwErrorEnter: "Please enter your password.",
    pwErrorEight: "Password must contain at least 8 characters.",
    pwErrorMix:
      "Password must contain a combination of letters, numbers, and special characters. ( ? ! : . , % + - / * < > { } ( ) [ ]  ` \" ' ~ _ ^ \\ | @ # $ & )",
    pwErrorContinuous:
      "Password must not have more than 2 consecutive identical characters.",
    pwErrorSame:
      "Password must not have more than 2 consecutive identical characters.",
    pwErrorEmpty: "Please do not leave blank.",
    pwConfirmError: "Please check your password.",
    pwConfirmErrorSame: "Passwords do not match. Please check again.",
    addressNotCorrect:
      "Keystore file address is unexpectedly modified. Please check your file.",

    alertWalletFirst: "Please select wallet.",
    alertExchange: "Transfer function is under development.",
    alertNoBalance: "You have 0 balance. Please deposit and transfer.",
    alertNoTxFeeBalance_icx: `Please check your ICX balance. ICX is needed for transaction fee.`,
    alertNoTxFeeBalance_eth: `Please check your ETH balance. ETH is needed for transaction fee.`,
    alertBalanceRemove: "You may remove it only when you have 0 balance.",
    alertDownloadAfterBackup:
      "Click 'Next' button after downloading the Keystore file.",

    lockPasscode: "Enter passcode.",
    lockPasscodeExactly: "Please check your password and try again.",

    currentPasscodeEnter: "Enter the current screen lock passcode.",
    passcodeEnter: "Please enter your screen lock passcode.",
    currentPasscodeFail: "Please confirm your screen lock passcode.",
    passcodeSix: "Enter 6-digit number.",
    passcodeSame: "Screen lock passcode does not match. Please check again.",
    currentPasscodeSame: "New passcode is the same as the previous one.",

    dropzoneAttachment: "Attach your Keystore file.",
    dropzoneFormat: "Incorrect wallet file form.",
    privateKeyEnter: "Please enter your private key.",
    privateKeyConfirm: "Incorrect private key.",

    alertWalletName: "Enter new wallet name.",
    alertWalletNameSame: "This wallet name already exists.",
    alertAccountSame: "This wallet account already exists.",

    alertAddressName: "Enter address name.",
    alertAddressNameSame: "This address name already exists.",
    alertAddress: "Enter address.",
    alertAddressNotCorrect_icx: "Incorrect ICX address.",
    alertAddressNotCorrect_eth: "Incorrect ETH address.",
    alertAddressSame_icx: "This icx account already exists.",
    alertAddressSame_eth: "This eth account already exists.",

    noAddress: "No registered address.",

    alertAddToken: "Please select a token to add.",
    addressNotValid: "Incorrect address. Please check again.",
    addressEnter: "Enter transaction address.",
    tokenNameEnter: "Enter token name.",
    tokenSymbolEnter: "Enter token symbol.",
    tokenDecimalsEnter: "Enter number of decimals.",
    coinAlready: "You already have this token.",

    alertWalletChecked: "Please select the wallet(s) to bundle.",

    alertAddressExchange: "No address to receive exchange in your Wallet.",
    alertAddressTransaction: "No registered address.",
    alertHistoryExchange:
      "No recent transaction address to receive the exchange.",
    alertHistoryTransaction: "No recent address.",

    coinAmount: "Please enter the transfer amount.",
    coinAmountZero: "Enter more than 0 coins.",
    coinAmountBalance: "This exceeds your balance.",

    transferAddressEnter: "Please enter receiving address.",
    transferAddressConfirm: "Please confirm receiving address.",
    transferAddressSame: "Sending and receiving address are the same.",

    checkData: "Please check your data.",
    dataOverLimit: "This exceeds input limit 250KB.",
    enterGasPrice_gas: "Please enter the gas limit.",
    enterGasPrice_step: "Please enter the step limit.",
    stepLimitTooLow: (stepLimit) => {
      return `Enter step limit more than ${stepLimit}.`;
    },
    stepLimitTooHigh: (stepLimit) => {
      return `Enter step limit less than ${stepLimit}.`;
    },
    notEnoughBalance: (coinType) =>
      `Insufficient ${coinType} balance for transaction fee.`,

    alertIcxGetBalanceError: "An error occurred while checking your balance.",
    buttonChecked: "Please check this box if you want to proceed.",

    ledgerTimeout: "Transfer request timed-out. Please try again.",
    ledgerError: "Failed to connect. Please try again.",
    deniedByUser: "The confirmation has been cancelled on Ledger Wallet.",

    noBalance: "No Balance.",

    contractAddressEmpty: "Please enter contract address.",
    contractAddressConfirm: "Please check contract address again.",

    strEnter: "Please enter “str“ value",
    AddressEnter: "Please enter address",
    AddressConfirm: "Please check address again.",

    intEnter: "Please enter “int“ value",
    intConfirm: "Please check “int” value again.",

    bytesEnter: "Please enter “bytes“ value",
    bytesConfirm: "Please check “bytes” value again.",

    alertNoIScore: "No I-Score. Please check the I-Score remaining amount.",
    alertNoDelegation: "No Voting Power. Please stake some ICX first.",
    alertNoBond: "No Bonding Power. Please stake some ICX first.",
    alertNotEnoughForStake:
      "You must have a minimum amount of ICX balance (1 ICX) to stake or un-stake your ICX.",
    alertLTMin: (min, type) => `The minimum amount of ${type} is ${min}.`,
    alertGTMax: (max, type) => `The maximum amount of ${type} is ${max}.`,
    alertNoChange: "There is no changed in amount.",
    alertFull: "There is no ICX left. Please check the ICX remaining amount.",
  },

  currency: {
    krw: "KRW",
    usd: "USD",
  },

  myWallet: "My Wallet",
  exchange: "Exchange",
  transfer: "Transfer",
  contract: "Contract",
  myPage: "My Page",

  home: "ICONex Home",
  coin: "Coin",

  deposit: "Deposit",
  withdraw: "Withdraw",

  mainPageDesc:
    "Store and transfer ICX and other cryptocurrencies of ICON Ecosystem.",
  mainPageCreateWallet: "Create Wallet",
  mainPageCreateWalletDesc: "A few simple steps to create your wallet.",
  mainPageImportWallet: "Load Wallet",
  mainPageImportWalletDesc:
    "Load your wallets using Keystore file or private key.",
  mainPageConnectLedger: "Connect to Ledger",
  mainPageConnectLedgerDesc: "Manage and transfer ICX on Ledger Wallet.",

  myWalletHeaderTotalValue: "Total Assets",
  myWalletHeaderCoinNum: "Coins",
  myWalletHeaderTokenNum: "Tokens",
  myWalletHeader_totalVote: "Voting Weight",
  myWalletHeaderNumUnit: "",
  graphNoData: "0 balance.",
  myWalletHeaderInfo_1:
    "The total asset is based on Coinmarketcap and the tokens",
  myWalletHeaderInfo_2:
    "that have no USD-converted prices will not be included.",
  myWalletHeaderInfo_3:
    "* Tokens that have no USD-converted prices will not be included.",

  myWalletContentWalletView: "Wallets",
  myWalletContentCoinView: "Coins & Tokens",
  myWalletSectionWithToken: "& Token",
  myWalletBarRecentTransaction: "Recent withdrawal",
  myWalletBarNoTransaction: "No withdrawal history",
  myWalletContentAddWallet: "Add Wallets",

  walletMenuBarUpdateWalletName: "Change wallet name",
  walletMenuBarUpdatePassword: "Change wallet password",
  walletMenuBarBackupWallet: "Backup wallet",
  walletMenuBarBackupWalletLastDownload: "Recent backup file downloaded on",
  walletMenuBarAddToken: "Add token",
  walletMenuBarDeleteWallet: "Remove wallet",

  coinDetailContentBalance: "Coin Balance",
  coinDetailContentAddress: "Deposit Address",
  coinDetailContentQrCode: "QR Code",
  coinDetailContentDesc1: "You can deposit your coins to the address above.",
  coinDetailContentDesc2:
    "Scan the QR code on the right if you are using mobile devices.",
  coinDetailNoPrice: "* No USD-converted price",

  coinDetailHistoryTitle: "Transaction History",
  coinDetailHistoryPending: "Pending",
  coinDetailHistoryCompleted: "Completed",
  coinDetailHistoryNoTransactionEth:
    "You can check the transaction history on\nEtherscan.",
  coinDetailHistoryIcx:
    "You can check the transaction history on<br/><span>ICON Tracker</span>",
  coinDetailHistoryNoTransactionDefault: "No transaction",

  coinDetailHistoryColumn0: "Requested Time",
  coinDetailHistoryColumn1: "Completed Time",
  coinDetailHistoryColumn2: "Transaction Type",
  coinDetailHistoryColumn3: "Transaction ID",
  coinDetailHistoryColumn4: "Amount",

  coinDetailHistoryFail: "Fail",

  coinDetailHistoryPendingInfo:
    "ICX transfer transactions not proceeded will be cancelled automatically, restoring any transfer amount and transaction fees.",

  exchangeTransactionSelectorWallet: "Transfer wallet",
  exchangeTransactionSelectorPlaceholder: "Wallet Name",
  exchangeTransactionSetterAmount: "Transfer Amount",
  exchangeTransactionSetterPlaceholder: "Enter transfer amount",
  exchangeTransactionListTitle: "Receiving Address",
  exchangeTransactionListPlaceholder: "Enter address",

  exchangeTransactionCalcFees: "Transfer fees",
  exchangeTransactionCalcActual: "Actual transfer volume",
  exchangeTransactionCalcBalance: "Balance",

  exchangeTransactionGasLimit: "Gas Limit",
  exchangeTransactionGasPrice: "Gas Price",
  exchangeTransactionInfo:
    "Please check the amount and the address again as there is no way to cancel the transaction after you confirm the transaction.",

  contractAddressInputPlaceHolder: "Enter address",
  contractintInputPlaceHolder: "Enter amount",
  contractstrInputPlaceHolder: "Enter text",
  contractbytesInputPlaceHolder: "Enter bytes",

  contractBalance: "Balance",

  lockPageDescState: "Locked.",
  lockPageDescEnter: "Enter 6-digit screen lock passcode.",
  lockPageInputPlaceholder: "Enter passcode",
  lockPageInputForget: "Forgot your passcode?",

  noticeTitle:
    "Always keep your backup file(s) and private key(s) in a secure location.",
  noticeDesc1:
    "If you did not backup your wallet, you may not be able to recover it.",
  noticeDesc2: "You can back up your wallet from the wallet menu.",
  noticeNotAgain: "Do not show this again.",

  myPageExportDesc:
      "Select the wallets to bundle. Passwords are required.",
  myPageExportCaution:
    "· [CAUTION] If you back up your wallets using the ‘Wallet bundle’ function, the password of each wallet will be changed into the bundle wallet password.",
  myPageExportSelectedWallets: "Wallets",
  myPageWalletChecked: "· Selected Wallets",
  myPageSubTitle1: "Screen Lock",
  myPageSubTitle2: "Export Wallet Bundle",
  myPageInfo1:
    "· By activating the screen lock function, a 6-digit passcode is required every time you open ICONex in a new chrome window.\n · If you forget your screen lock passcode, you can reset the passcode using your wallet password.",
  myPageInfo2:
    "· If you activate the screen lock, a 6-digit passcode is required every time you open your ICONex. It can protect your assets from others.",
  myPageInfo3:
    "· Wallet bundle backs up your wallets in one file.\n · You can easily manage different wallets at once.",
  myPageUnlock: "· Do you want to unlock?",
  myPageLockNumber: "Screen Lock",
  myPageLockNumberUsing: "Screen lock activated",
  myPageLabel1: "New Passcode",
  myPageLabel2: "Confirm",
  myPageLabel3: "Current Passcode",
  myPagePlaceholder1: "Enter 6-digit number",
  myPagePlaceholder2: "Enter password",
  myPageLockSuccess:
      "Do you want to lock?",
  myPageLockChangeSuccess: "Your passcode has been changed.",

  transferPageInfo1:
    "· Please check the amount and the address. You CANNOT cancel the transaction after you confirm.",
  transferPageLabel1: "Transfer Amount",
  transferPageLabel2: "Receiving Amount",
  transferPageLabel3: "Receiving Address",
  transferPageLabel4: "Wallet Name",
  transferPageLabel5_1: "Transaction Fee",
  transferPageLabel5_2: "· Estimated Maximum Fee",
  estimatedStepAndPrice: "· Step Limit / Step Price",
  transferPageLabel6_1: "Balance after transaction",
  transferPageLabel6_2: "· Estimated Balance",
  transferPageLabel7_eth: "Gas Limit",
  transferPageLabel7_icx: "Step Limit",
  transferPageLabel8: "Data",
  transferPageLabel9: "(Optional)",
  transferPageLabel10_eth: "Gas Price",
  transferPageLabel10_icx: "Step Price",
  transferPagePlaceholder1: "Enter transfer amount",
  transferPagePlaceholder2: "Enter address",
  transferPagePlaceholder3: "Select",
  transferPagePlaceholder4: "Enter Data",
  transferPagePlaceholder5_eth: "Enter Gas Limit",
  transferPagePlaceholder5_icx: "Enter Step Limit",
  transferPageAllCheckBtn: "MAX",
  transferPageAndCoin: "& Coin",
  transferPageSlow: "Slow",
  transferPageFast: "Fast",
  transferViewData: "View",
  transferCollapseData: "Collapse",

  transferPageHelperTitle1_eth:
    "Estimated Maximum Fee = Gas price * Gas limit.",
  transferPageHelperDesc1_eth:
    "Set proper gas limit and gas price. You will pay transaction fees even if your transaction is not confirmed by miners.",
  transferPageHelperTitle2_eth:
    "Gas limit is the amount of gas to send with your transaction.",
  transferPageHelperDesc2_eth:
    "Unnecessary gas is refunded to you at the end of transaction. In other words, you can set the maximum amount of gas but the actual gas consumption is not fixed.",
  transferPageHelperTitle3_eth:
    "Gas price is a unit of gas. 1 Gwei equals 0.000000001 ETH.",
  transferPageHelperDesc3_eth:
    "Ethereum miners prioritize based on gas price when generating blocks. If you set higher gas price, you have more chance to get your transaction confirmed. It also determines your transaction speed.",
  transferPageHelperTitle4_eth:
    "If you do not enter the data when required, the transaction will fail.",
  transferPageHelperDesc4_eth:
    "You will still have to pay the transaction fees. You don't have to enter data if it is not required in the transaction.",

  transferPageHelperTitle1_icx:
    "Estimated Maximum Fee = Step price * Step limit",
  transferPageHelperDesc1_icx: "",
  transferPageHelperTitle2_icx:
    "Step limit is the amount of step to send with your transaction.",
  transferPageHelperDesc2_icx:
    "Unnecessary step is refunded to you at the end of transaction. In other words, you can set the maximum amount of step but the actual step consumption is not fixed.",
  transferPageHelperTitle3_icx:
    "Step price is the amount you pay per unit of step.",
  transferPageHelperDesc3_icx:
    "Step price is paid in loop and 1 loop is fixed to 0.000000000000000001(10<sup>-18</sup>) ICX. ICON transaction fee is imposed according to various factors such as the number of smart contract usage, the amount of blockchain database used and the size of transaction data, etc.",
  transferPageHelperTitle4_icx:
    "If you do not enter the data when required, the transaction will fail.",
  transferPageHelperDesc4_icx:
    "You will still have to pay the transaction fees. You don't have to enter data if it is not required in the transaction.",

  dataInputOpen: "Open Data",
  dataInputClose: "Close Data",

  contractReadPage: "Read / Write Contract",
  contractReadPageAddressInputPlaceHolder: "Enter contract address",
  contractAbiPlaceHolder: "Enter contract address to auto-fill this field",

  checkPassword: {
    title: "Confirm wallet password.",
    desc: "Enter your password.",
    input: "Password",
    placeholder: "Enter your password",
    forgotPassword: "Forget Password?",
    forgotPasswordDesc:
      'You can reset password using private key. Please follow directions.\nSelect the "Load your wallet"> Select the "Private Key" > Input the Private Key and load your wallet > Input the new password',
  },

  createWallet: {
    title: "Create Wallet",
    step1: "Select Coin",
    step2: "Wallet Info.",
    step3: "Backup File",
    step4: "Private Key",

    desc1: "Which coin would you like to add?",
    leftInfoTitle1_1: "Select a wallet between ICX wallet and ETH wallet.",
    leftInfoDesc1_1:
        "· You can add IRC tokens using ICON wallet menu.",
    leftInfoDesc1_2:
        "· You can add ERC20 tokens using Ethereum wallet menu.",
    leftInfoDesc1_3:
        "· Wallets for other coins will be added later.",
    leftInfoDesc1_4: "· The types of coins that can be added will increase.",

    desc2: "Enter a wallet name and a password.",
    leftInfoTitle2_1:
      "Set a strong and secure password you can remember. You are responsible for keeping your password safe.",
    leftInfoTitle2_2:
      "DO NOT FORGET TO SAVE THIS. If you lose your password, you cannot restore it.",
    leftInfoDesc2_1:
      "· You will need the password to load your wallet in other devices using the Keystore file or your private key.",
    leftInfoDesc2_2:
        "· 모바일이나 다른 PC로 지갑을 옮기는 경우 지갑 백업 파일(Keystore 파일) 또는 개인 키와 함께 비밀번호를 입력해야 합니다.",
    walletNameInputLabel: "Wallet Name",
    walletNameInputPlaceHolder: "Wallet Name",
    passwordInputLabel: "Wallet Password",
    passwordInputPlaceHolder1:
      "At least 8 characters including letters, numbers, and special characters",
    passwordInputPlaceHolder2: "Confirm Password",
    new: "New",
    wallet: "Wallet",
    cancelCreateWallet: "Are you sure you want to cancel?",

    desc3: "Pay special attention to your Keystore files.",
    leftInfoTitle3_1:
      "This Keystore file contains the encrypted private key and requires the wallet password to access it.",
    leftInfoDesc3_1:
      "· Use this Keystore file to load your wallet from other devices.",
    leftInfoDesc3_2:
        "· Keystore file can replace your private key.",
    leftInfoDesc3_3:
      "· You can download your Keystore file from the “Backup wallet” menu.",
    downloadSuccess:
      "Download your Keystore file. Always keep your Keystore file in a secure location.",
    passWithoutDownload:
      "Do you want to proceed without downloading the Keystore file?",
    cancelCreateWalletNotDownload: "Are you sure you want to cancel?",

    desc4: "Print your paper wallet or write down your private key.",
    leftInfoTitle4_1:
      "Use your private key to load your wallet from other devices. You can print or write the private key to keep it safe.",
    leftInfoDesc4_1:
      "· Pay special attention to your private key as anyone who can access to the private key can transfer assets from the wallets without your permission.",
    leftInfoDesc4_2:
      "· You can print your private key from the “Backup wallet” menu later.",
    leftInfoDesc4_3:
        "· Even if you do not copy or print immediately now, you can proceed again by selecting the ‘Backup Wallet’ menu.",
    privateKey: "Private Key",
  },

  importWallet: {
    title: "Load Wallet",
    desc1: "How would you like to load your wallet?",
    radioLabel1_1: "Select wallet file",
    radioLabel1_2: "Enter private key",

    desc2: "Select your Keystore file and enter your password.",
    inputLabel2_1: "Select a file or drag & drop to the area below.",
    inputPlaceHolder2_1: "Please drag your file here",
    inputLabel2_2: "Password",
    inputPlaceHolder2_2: "Enter your Password",
    importSuccessAlert: "Wallet is loaded.",
    importFailAlert: "Wallet Loading Failed.",

    desc3: "Select a coin and enter your private key.",
    inputLabel3_1: "Select Coin",
    inputLabel3_2: "Private Key",
    inputPlaceHolder3_2: "Enter your private key",
    infoBox3_1:
      "Please be sure to enter the correct private key for the matching coin type.",

    desc4: "Please enter the new wallet name and the new password.",
    walletNameInputLabel: "Wallet Name",
    walletNameInputPlaceHolder: "Wallet Name",
    passwordInputLabel: "Wallet Password",
    passwordInputPlaceHolder1:
      "Password must contain 8 or more characters with a combination of letters, numbers, and special characters",
    passwordInputPlaceHolder2: "Confirm Password",

    desc5: "Please enter a new wallet name.",
  },

  addWallet: {
    title: "Add Wallet",
    desc: "How would you like to add your wallet?",
    radioLabel1: "Create Wallet",
    radioDesc1: "You can create a new wallet.",
    radioLabel2: "Load Wallet",
    radioDesc2:
      "Load your existing wallet using your Keystore file or private key.",
  },

  updateWalletName: {
    title: "Change Wallet Name",
    desc: "You may change your wallet name.",
    inputLabel: "Wallet Name",
    inputPlaceHolder: "Enter new wallet name",
  },

  updatePassword: {
    title: "Change Wallet Password",
    desc: "You may change your wallet password.",
    inputLabel1: "Current Password",
    inputPlaceHolder1: "Please enter the current password",
    inputLabel2: "New Password",
    inputPlaceHolder2:
      "Enter New Password (At least 8 characters including letters, numbers, and special characters)",
    inputPlaceHolder3: "Confirm Password",
    infoBoxTitle:
      "· Set a strong and secure password you can remember. You are responsible for keeping your password safe.",
    infoBoxDesc1:
      "· You will need the password to load your wallet in other devices using the Keystore file or your private key.",
    changed: "Your password has been changed.",
  },

  backupWallet: {
    title: "Backup Wallet",
    desc:
      "You can load your wallet using the Keystore file or your private key. \nPlease backup your Keystore file or private key.",
    infoBoxTitle1_1: "Download the Keystore file (wallet backup file)",
    infoBoxDesc1_1:
      "· Anyone who can access to the Keystore file and the password can transfer assets from the wallets without your permission. Please be careful not to expose your private key.",
    infoBoxDesc1_2:
      "· Be careful not to accidentally delete your Keystore file.",

    infoBoxTitle2_1: "Save Private Key",
    infoBoxDesc2_1:
        "· Be careful not to share your private key with others.",
    infoBoxDesc2_2:
        "· Print paper wallet or write down your private key.",
  },

  addToken: {
    title1: "Add token",
    desc1: "Select Token to add.",
    info:
      "If the token you want to add is not on the list, please manually input token information.",
    title2: "Token Information",
    desc2:
      "Please add your token address.\nOther fields will be filled automatically, or you can change it manually.",
    inputLabel1: "Address",
    inputPlaceHolder1: "Enter address",
    inputLabel2: "Token Name",
    inputPlaceHolder2: "Enter address to auto fill this field",
    inputLabel3: "Token Symbol",
    inputPlaceHolder3: "Enter address to auto fill this field",
    inputLabel4: "Number of Decimals",
    inputPlaceHolder4: "Enter address to auto fill this field",
  },

  deleteWallet: {
    info1: "Are you sure you want to remove your wallet?",
    info2:
      "You still have balance in your wallet.<br/>If you do not backup this wallet,<br/>you may not be able to restore your balance.<br/>Are you sure you want to delete?",
  },

  exportWallet: {
    caution:
      "If you back up your wallets using the 'Wallet bundle' function the password of each wallet will be changed into the wallet bundle password. Are you sure you want to proceed?",

    title: "Export Wallet Bundle",
    desc1:
      "Select the wallets to send as a bundle. Password verification is required for each wallet.",
    desc2: "Please create the password for the wallet bundle.",
    desc3: "Download the backup file of the wallet bundle.",

    inputPlaceholder1: "Please enter your password",

    infoBoxTitle1:
      "· Set a wallet bundle password that is strong and secure. You are responsible for safeguarding your password. DO NOT forget to save this. If you lose your password, you cannot restore it.",
    infoBoxDesc1:
      "· Anyone holding the backup file and the password can access or transfer from the wallets. Please be careful not to expose them to others.",

    infoTitle: "Wallet Backup File",
    infoBoxTitle2:
      "· This backup file is the encrypted file of the selected wallets and requires the wallet bundle password which you created when exporting your wallet bundle.",
    infoBoxDesc2_1:
      "· You will need the wallet bundle password to load your wallet bundle in other devices.",
    infoBoxDesc2_2:
      "· Anyone who can access to the backup file and the password can transfer assets from the wallets without your permission. Please be careful not to expose your backup file.",
  },

  deleteToken: {
    info: "Are you sure you want to delete this token?",
  },

  updateToken: {
    title: "Change token information",
    desc: "You may change token information.",
    inputLabel1: "Address",
    inputPlaceHolder1: "Enter address",
    inputLabel2: "Token Name",
    inputPlaceHolder2: "Enter token name",
    inputLabel3: "Token Symbol",
    inputPlaceHolder3: "Enter token symbol (letters or numbers)",
    inputLabel4: "Decimals",
    inputPlaceHolder4: "Enter decimals",
  },

  addressList: {
    my: "My",
    address: "Address",
    myAddress: "My Address",
    recentHistory: "Recent Address",
    quantityHodl: "Balance",
    quantityExchange: "Exchange Amount",
    quantityTransaction: "Transfer Amount",
    columnName: "Wallet Name",
    columnAddress: "Wallet Address",

    addressBook: "Address Book",
    addressName: "Address Name",
    walletNamePlaceHolder: "Enter wallet name",
    walletAddressPlaceHolder: "Enter wallet address",
  },

  contractList: {
    contractList: "Contract List",
    contractName: "Contract Name",
    contractAddress: "Contract Address",
  },

  unlockPopup: {
    title: "Unlock the Screen Lock",
    desc: "Enter your current passcode.",
    subTitle: "Current Passcode",
    placeholder: "Enter 6-digit passcode",
    success: "Screen is unlocked.",
  },

  changePasscode: {
    title: "Reset screen lock passcode",
    desc1: "You can reset your passcode using your wallet password.",
    desc2: "You can reset your passcode.",
    inputLabel1: "New passcode",
    inputLabel2: "Confirm new passcode",
    inputPlaceHolder1: "Enter your passcode",
    inputPlaceHolder2: "Enter a 6-digit number",
  },

  printPage: {
    walletTitle: "Wallet Name",
    walletCoin: "Coin Name",
    createDate: "Creation Date",
    addressLabel: "Wallet Address",
    addressInfo: "* You can send your coins to this address.",
    privateKeyLabel: "Private Key",
    privateKeyInfo:
      "* You can load or restore your wallets using private keys.",
  },

  validationForm: {
    newPassword: "New Password",
    bundlePassword: "Wallet Bundle Password",
    walletPassword: "Wallet Password",
    walletNameLabel: "Wallet Name",
    walletNamePlaceHolder: "Wallet Name",
    inputPlaceHolder1:
      "At least 8 characters including letters, numbers, and special characters",
    inputPlaceHolder2: "Confirm Password",
  },

  disclaimerPage: {
    header: "ICONex disclaimer",
    title:
      "At the time of downloading and using the official ICX wallet, “ICONex”, the below disclaimer will be applied to the users.",
    desc1:
      "1. The private key ICONex user creates in the process of using the ICONex service is stored in your PC, ICON Foundation does not store or/and manage the users private key. The ICONex user is solely responsible for safekeeping and managing the private key created. In the case of the ICONex user not being able to use the private key due to computer virus, hacking activities, theft/loss, etc., ICON Foundation is not responsible for any loss.",
    desc2:
      "2. ICON Foundation does not guarantee the integrity, stability, accuracy and security of ICONex, but only provides the current version of ICONex “AS IS”. ICON Foundation is continuously running tests and making updates to provide a more stable and convenient service, however despite these efforts there is always the possibility of unexpected problems. ICON Foundation is not responsible for any unexpected problems, such as malfunction, hacking, loss and computer virus.",
    desc3:
      "3. ICON Foundation is not responsible for not being able to provide services due to natural disasters or any other force majeure.",
    desc4:
      "4. ICON Foundation is not responsible for any third-party transactions the ICONex user makes using ICONex as an intermediary.",
    desc5:
      "5. ICON Foundation is not responsible for any indirect, consequential, specific, punitive or any similar damages even though if ICONex is related with any torts, contract, guarantee, liability without fault and carelessness.",
    desc6:
      "6. ICONex supports Korean and English as the official languages. ICON Foundation is not responsible for any loss that comes from mis-translation into other languages than the official languages.",
    copyright:
      "※ All copyrights regarding ICONex is held by ICON Foundation.",
  },

  termsOfUse: "Terms of use",
  privacyPolicy:"Privacy Policy",

  sendTransaction: {
    infoSuccess: "Transfer Request Complete.",
    offline: "There is no internet connection",
    titleInfo: "Check the amount and the receiving address once again.",
    quantity: "Amount",
    txFeeIcx: "Max Fee",
    txFeeEth: "Max Fee",
    address: "Address",
    sendingAddress: "Sending Address",
    receivingAddress: "Receiving Address",
    titleInfoShort: "Check the amount and the address once again.",

    icxFailure: "An error occurred while sending transaction.",
    infoFailure:
      "Your transaction has been canceled.<br/>Please try again with a higher gas price.",
    knownFailure:
      "Your transaction has been canceled.<br/>The transaction is being processed.",
    anotherFailure:
      "Your transaction has been canceled.<br/>Another transaction is being processed.",
    gasFailure: "Transaction fee is too low.",
    gasLimitFailure: "Gas limit is too low.",
    exceedsFailure: "This exceeds block gas limit.",
    internetFailure:
      "Your transaction has been canceled.<br/>There is no Internet connection.",
    tokenGasFailure:
        "You have insufficient ETH balance for GAS.",

    confirmData: "Check the write information once again.",
    maximumFee: "Estimated Maximum Fee",
    sendQuantity: "Transfer ICX Amount",
    walletAddress: "Wallet Address",

    txComplete: "Request for write contract has been completed.",
    txHashTracker: "Tx Hash is trackable on ICON Tracker.",

    openTracker: "Go to ICON Tracker",
    openEtherscan: "Go to Etherscan",
  },

  connectLedger: {
    title: "Connect to Ledger Wallet",
    connectError: "Failed to connect",
    desc:
      "Connect Ledger Wallet to your computer and<br />click the <span>“Connect”</span> button below",
    descError:
      "Please check the connection and<br />click the <span>“Retry”</span> button below.",
    info: "Guide to use Ledger Wallet on ICONex",
    walletAddress: "Wallet Address",
    connectWallet: "Connected Ledger Wallet",
    manualFileName: "Guide_to_use_Ledger_Wallet_on_ICONex_Ledger_en",
  },

  completeTransaction: {
    success:
      "Transfer Request Complete.<br/>You can check the transaction history<br/>on ICON Tracker.",
    fail: "Transfer Request Failed.<br/>Please try again.",
  },

  stake: "Stake",
  vote: "Delegate",
  bond: "Bond",
  iScore: "I-Score",

  // 6p Voting P-Rep 페이지
  pRep_totalDelegated: "Delegated Voting Power (ICX)",
  pRep_available: "Available Voting Power (ICX)",
  pRep_totalSupply: "Total ICX Supply",

  // 7p ~ 10p Voting My Status 페이지
  voting: "Voting",
  voting_sub1: "P-Rep",
  voting_sub2: "My Status",
  voting_about: "About Voting",
  voting_about_desc: `
    <p class="about-bold">Stake</p>
    <p class="about-text">Function for staking requested amount of ICX. Once staking is requested, Voting power will generate in 1 to 1 ratio. Using Voting power, it can be delegate to P-Rep candidate.</p>
    <p class="about-bold">Delegate</p>
    <p class="about-text">Using Voting power, it can be delegate to P-Rep candidate.</p>
    <p class="about-bold">I-Score</p>
    <p class="about-text">Contribution score for the P-Rep delegation, 1000 I-Score can be exchange with 1 ICX.</p>      
  `,
  myStatusStake_unstake1: "Unstaking",
  myStatusStake_unstake2: "Target BH",
  myStatusStake_unstake3: "Estimated Time",
  myStatusStake_axis1: "Staked",
  myStatusStake_axis2: "Available",
  myStatusStake_axis3: "Voted",
  myStatusStake_axis4: "Bonded",
  myStatusStake_li1: "Total ICX",
  myStatusStake_li2: "Available ICX",
  myStatusStake_li3: "Staked ICX",
  myStatusStake_li4: "Unstaking ICX",
  myStatusVote_axis1: "Delegated",
  myStatusVote_axis2: "Non-delegated",
  myStatusVote_li1: "Staked ICX",
  myStatusVote_li2: "Delegated ICX",
  myStatusVote_li3: "Available ICX",
  myStatusBond_unbond1: "Unbonding",
  myStatusBond_axis1: "Bonded",
  myStatusBond_axis2: "Non-bonded",
  myStatusBond_li1: "Staked ICX",
  myStatusBond_li2: "Bonded ICX",
  myStatusBond_li3: "Available ICX",
  myStatusBond_li4: "Unbonding ICX",
  myStatusIScore_p1: "Current I-Score",
  myStatusIScore_p2: "You can receive",

  myVote: "My Votes",
  myBond: "My Bonds",
  pRepTable_rank: "Rank",
  pRepTable_name: "Name",
  pRepTable_totalVotes: "Total Votes (%)",
  pRepTable_governance: "Governance",
  pRepTable_sponsoredProjects: "Sponsored Projects",
  pRepTable_server: "Server Location",
  pRepTable_active: "Active",
  pRepTable_myVotes: "My Votes (%)",
  pRepTable_h4: "View History",
  pRepTable_noData_p: "Be part of ICON Network!",
  pRepTable_noData_p1: "Choose the delegating list and delegate Voting Power.",
  pRepTable_noData_p2:
    "Contribute ICON Network by participate delegation. Receive I-Score for that contribution.",

  // 13p~ Claim ICX with I-Score 팝업
  claimIcx: {
    title: "Claim ICX",
  },

  // 14p~ Stake 팝업
  stakeIcx: {
    desc: "Of the staked ICX, the amount of voted ICX cannot be un-staked.",
    help: "Need a minimum of ICX for un-staking. (1 ICX)",
    estimatedTime: "· Estimated Time of Un-staking",
    min: "Min Stake",
    max: "Max Stake",
    success: (str) => `Request for ${str} has been completed.`,
  },

  // 21p~ Vote 페이지
  votePage: {
    add: "Add",
    add_added: "Added List",
    add_cntFull: "Maximum number of delegating P-Rep is 100.",
    delete: "Delete",
    delete_voted:
      "Please retry after reset the delegation amount to according P-Rep.",
    max: "Max",
    toast: "Added to 'My Votes'",
    confirm_title: "Please recheck the delegation request.",
    confirm_li1: "· Delegated P-Rep",
    confirm_li2: "· Delegated",
    success1: "Vote Request Complete.",
    success2: "You can check the voting history<br/>on ICON Tracker.",
  },

  bondPage: {
    confirm_title: "Please recheck the bonding request.",
    confirm_li1: "· Bonded P-Rep",
    confirm_li2: "· Bonded",
    success1: "Bond Request Complete.",
    success2: "You can check the bonding history<br/>on ICON Tracker."
  }
};
