export default {
  button: {
    confirm: "확인",
    submit: "완료",
    back: "이전",
    next: "다음",
    yes: "네",
    no: "아니요",
    import: "가져오기",
    change: "변경",
    add: "추가",
    cancel: "취소",
    modify: "수정",
    download: "지갑 백업 파일(Keystore 파일) 다운로드",
    upload: "지갑 백업 파일(Keystore 파일) 선택",
    copy: "복사",
    copyFinish: "복사 완료",
    print: "종이 지갑 프린트",
    checkTransction: "거래 내역 확인",
    checkTx: "내역 확인",
    reset: "재설정",
    changeToken: "토큰 수정",
    removeToken: "토큰 삭제",
    myAddress: "나의 주소",
    recentTransactionAddress: "최근 거래 주소",
    exchange: "환전",
    transfer: "송금",
    copyPrivateKey: "개인 키 복사",
    tokenInfo: "토큰 정보 입력",
    select: "선택",
    unlock: "잠금 설정 해제",
    copyDepositAddress: "입금 주소 복사",
    close: "닫기",
    complete: "완료",
    goToWallet: "내 지갑 가기",
    connect: "연결",
    connectLedger: "Ledger Wallet 연결",
    retry: "재시도",
    read: "조회",
    write: "실행",
    edit: "편집",
    editComplete: "편집 완료",
    delete: "삭제",
    stake: "Stake",
    vote: "Vote",
    bond: "Bond",
    claim: "Claim",
    search: "검색",
    adjust: "Adjust",
  },

  error: {
    pwErrorEnter: "비밀번호를 입력해주세요.",
    pwErrorEight: "8자 이상으로 입력해주세요.",
    pwErrorMix:
      "영문, 숫자, 특수문자( ? ! : . , % + - / * < > { } ( ) [ ]  ` \" ' ~ _ ^ \\ | @ # $ & )를 혼용하여 입력해주세요.",
    pwErrorContinuous:
        "3자 이상 연속되지 않게 입력해주세요.",
    pwErrorSame:
        "동일한 문자를 3자 이상 연속해서 입력할 수 없습니다.",
    pwErrorEmpty: "공백 없이 입력해주세요.",
    pwConfirmError: "비밀번호를 다시 확인해주세요.",
    pwConfirmErrorSame: "비밀번호가 일치하지 않습니다.",
    addressNotCorrect:
      "지갑 백업 파일(Keystore 파일)의 주소가 임의적으로 변경되었습니다. 파일을 확인해주세요.",

    alertWalletFirst: "지갑 선택을 먼저 해주세요.",
    alertExchange: "환전 기능은 개발 중입니다.",
    alertNoBalance: "코인 보유량이 없습니다.<br/>입금 후 송금해주세요.",
    alertNoTxFeeBalance_icx: `ICX 계좌 잔액이 부족하여 토큰을 송금할 수 없습니다.`,
    alertNoTxFeeBalance_eth: `ETH 계좌 잔액이 부족하여 토큰을 송금할 수 없습니다.`,
    alertBalanceRemove: "코인 보유량이 없는 경우에만 삭제할 수 있습니다.",
    alertDownloadAfterBackup:
      "지갑 백업 파일(Keystore 파일) 다운로드 후 다음 버튼을 클릭해주세요.",

    lockPasscode: "잠금 번호를 입력해 주세요.",
    lockPasscodeExactly: "잠금 번호를 정확히 입력해 주세요.",

    currentPasscodeEnter: "현재 잠금 번호를 입력해주세요.",
    passcodeEnter: "잠금 번호를 입력해주세요.",
    currentPasscodeFail: "잠금번호를 다시 확인해주세요.",
    passcodeSix: "숫자 6자리를 입력해주세요.",
    passcodeSame: "잠금 번호가 일치하지 않습니다.",
    currentPasscodeSame: "현재 잠금 번호와 일치합니다.",

    dropzoneAttachment: "지갑 파일을 첨부해주세요.",
    dropzoneFormat: "올바른 지갑 파일 형식이 아닙니다.",
    privateKeyEnter: "개인 키를 입력해주세요.",
    privateKeyConfirm: "개인 키를 확인해주세요.",

    alertWalletName: "지갑 이름을 입력해주세요.",
    alertWalletNameSame: "같은 이름의 지갑이 이미 존재합니다.",
    alertAccountSame: "같은 주소의 지갑이 이미 존재합니다.",

    alertAddressName: "주소명을 입력해주세요.",
    alertAddressNameSame: "같은 이름의 주소명이 이미 존재합니다.",
    alertAddress: "주소를 입력해주세요.",
    alertAddressNotCorrect_icx: "올바른 ICX 주소가 아닙니다.",
    alertAddressNotCorrect_eth: "올바른 ETH 주소가 아닙니다.",
    alertAddressSame_icx: "같은 ICX 주소가 이미 존재합니다.",
    alertAddressSame_eth: "같은 ETH 주소가 이미 존재합니다.",

    noAddress: "등록된 주소가 없습니다.",

    alertAddToken: "추가할 토큰을 선택해주세요.",
    addressNotValid: "주소가 올바르지 않습니다. 다시 확인해주세요.",
    addressEnter: "주소를 입력해주세요.",
    tokenNameEnter: "토큰 이름을 입력해주세요.",
    tokenSymbolEnter: "토큰 기호를 입력해주세요.",
    tokenDecimalsEnter: "소수 자리수를 입력해주세요.",
    coinAlready: "이미 보유하고 있는 코인입니다.",

    alertWalletChecked: "내보낼 지갑을 선택해주세요.",

    alertAddressExchange:
      "내 지갑에 등록된 주소 중, 환전 받을 수 있는 주소가 없습니다.",
    alertAddressTransaction:
      "내 지갑에 등록된 주소 중, 송금 받을 수 있는 주소가 없습니다.",
    alertHistoryExchange: "환전 받을 수 있는 최근 거래 주소가 없습니다.",
    alertHistoryTransaction: "송금 받을 수 있는 최근 거래 주소가 없습니다.",

    coinAmount: "코인 수량을 입력해주세요.",
    coinAmountZero: "스왑할 수량을 입력해 주세요.",
    coinAmountBalance: "보유 수량보다 적게 입력해주세요.",

    transferAddressEnter: "송금 받는 주소를 입력해주세요.",
    transferAddressConfirm: "송금 받는 주소를 확인해주세요.",
    transferAddressSame: "보내는 주소와 받는 주소가 동일합니다.",

    checkData: "데이터를 다시 확인해주세요.",
    dataOverLimit: "입력 한도 250KB를 초과합니다.",
    enterGasPrice_gas: "가스 한도를 입력해주세요.",
    enterGasPrice_step: "Step 한도를 입력해주세요.",
    stepLimitTooLow: (stepLimit) => {
      return `${stepLimit}보다 높은 스텝 한도를 입력해주세요.`;
    },
    stepLimitTooHigh: (stepLimit) => {
      return `${stepLimit}보다 낮은 스텝 한도를 입력해주세요.`;
    },
    notEnoughBalance: (coinType) =>
      `수수료를 지불할 ${coinType} 잔액이 부족합니다.`,

    alertIcxGetBalanceError: "아이콘 잔고 조회 중 오류가 발생하였습니다.",
    buttonChecked: "버튼을 체크해주세요.",

    ledgerTimeout: "송금 가능 시간이 초과되었습니다. 다시 시도해주세요.",
    ledgerError: "오류가 발생하였습니다. 다시 시도해주세요.",
    deniedByUser: "Ledger Wallet에서 승인이 취소되었습니다.",

    noBalance: "잔액이 부족합니다.",

    contractAddressEmpty: "컨트랙트 주소를 입력해주세요.",
    contractAddressConfirm: "컨트랙트 주소를 확인해주세요.",

    strEnter: "“str“ 값을 입력해주세요.",
    AddressEnter: "주소를 입력해주세요",
    AddressConfirm: "주소를 확인해주세요",

    intEnter: "“int“ 값을 입력해주세요.",
    intConfirm: "“int“ 값을 확인해주세요.",

    bytesEnter: "“bytes“ 값을 입력해주세요.",
    bytesConfirm: "“bytes“ 값을 확인해주세요.",

    alertNoIScore: "I-Score가 없습니다. I-Score 잔량을 확인하세요.",
    alertNoDelegation: "Voting Power가 없습니다. ICX를 Stake해주세요.",
    alertNotEnoughForStake:
      "Stake 또는 Un-stake 실행을 하려면 소량의 ICX 잔액이 있어야 합니다. (1 ICX)",
    alertLTMin: (min, type) => `입력 가능한 최소 ${type} 수량은 ${min} 입니다.`,
    alertGTMax: (max, type) => `입력 가능한 최대 ${type} 수량은 ${max} 입니다.`,
    alertNoChange: "변경된 수량이 없습니다.",
    alertFull: "Stake 가능한 ICX가 없습니다. ICX 수량을 확인해주세요.",
  },

  currency: {
    krw: "원",
    usd: "usd",
  },

  myWallet: "내 지갑",
  exchange: "환전",
  transfer: "송금",
  contract: "컨트랙트",
  myPage: "마이페이지",

  home: "ICONex 홈",
  coin: "코인",

  deposit: "입금",
  withdraw: "출금",

  mainPageDesc:
    "ICX와 ICON Network의 다양한 암호화폐를 하나의 지갑에서 보관하고 송금하세요.",
  mainPageCreateWallet: "새 지갑 만들기",
  mainPageCreateWalletDesc: "처음 오셨다면 회원가입 없이 지갑을 만들 수 있습니다.",
  mainPageImportWallet: "지갑 가져오기",
  mainPageImportWalletDesc:
    "지갑 백업 파일 또는 개인 키를 입력한 후에 사용할 수 있습니다.",
  mainPageConnectLedger: "Ledger Wallet 연결",
  mainPageConnectLedgerDesc: "Ledger Wallet에서 ICX를 보관 및 송금할 수 있습니다.",

  myWalletHeaderTotalValue: "전체 자산 평가금액",
  myWalletHeaderCoinNum: "코인 종류",
  myWalletHeaderTokenNum: "토큰 종류",
  myWalletHeader_totalVote: "Voting Weight",
  myWalletHeaderNumUnit: "",
  graphNoData: "보유코인 없음",
  myWalletHeaderInfo_1:
    "전체 자산 평가금액은 Coinmarketcap 기준으로 표시되며 USD 환산금액이",
  myWalletHeaderInfo_2:
    "표시되지 않은 토큰은 전체 자산 평가금액에서 제외됩니다.",
  myWalletHeaderInfo_3:
    "* USD 환산금액이 표시되지 않은 토큰은 전체 자산 평가금액에서 제외",

  myWalletContentWalletView: "지갑 별 자산 보기",
  myWalletContentCoinView: "코인 & 토큰 별 자산 보기",
  myWalletSectionWithToken: "& 토큰",
  myWalletBarRecentTransaction: "최근 출금 시각",
  myWalletBarNoTransaction: "출금내역 없음",
  myWalletContentAddWallet: "지갑 추가",

  walletMenuBarUpdateWalletName: "지갑 이름 변경",
  walletMenuBarUpdatePassword: "지갑 비밀번호 변경",
  walletMenuBarBackupWallet: "지갑 백업",
  walletMenuBarBackupWalletLastDownload: "백업 파일 다운로드일",
  walletMenuBarAddToken: "토큰 추가",
  walletMenuBarDeleteWallet: "지갑 삭제",

  coinDetailContentBalance: "보유 코인",
  coinDetailContentAddress: "입금 주소",
  coinDetailContentQrCode: "QR코드 주소",
  coinDetailContentDesc1: "위 주소로 코인을 입금할 수 있습니다.",
  coinDetailContentDesc2:
    "모바일로 입금 시, 우측 QR코드를 스캔하면 주소가 입력됩니다.",
  coinDetailNoPrice: "* USD 환산 금액이 없습니다.",

  coinDetailHistoryTitle: "입출금 내역",
  coinDetailHistoryPending: "대기 내역",
  coinDetailHistoryCompleted: "완료 내역",
  coinDetailHistoryNoTransactionEth:
    "Ethereum 지갑 주소의 거래내역은\nEtherscan에서 조회 가능합니다.",
  coinDetailHistoryIcx:
    "거래내역은 <span>ICON Tracker</span>에서 조회 가능합니다.",
  coinDetailHistoryNoTransactionDefault: "내역이 없습니다.",

  coinDetailHistoryColumn0: "요청 시각",
  coinDetailHistoryColumn1: "완료 시각",
  coinDetailHistoryColumn2: "거래 유형",
  coinDetailHistoryColumn3: "거래 ID",
  coinDetailHistoryColumn4: "금액",

  coinDetailHistoryFail: "실패",

  coinDetailHistoryPendingInfo:
    "ICX 출금 신청 후 처리되지 않은 거래는 자동 취소되며 출금액과 수수료는 모두 복구됩니다.",

  exchangeTransactionSelectorWallet: "지갑 이름",
  exchangeTransactionSelectorPlaceholder: "지갑 선택",
  exchangeTransactionSetterAmount: "송금할 코인 수량",
  exchangeTransactionSetterPlaceholder: "코인 수량 입력",
  exchangeTransactionListTitle: "송금 받는 주소",
  exchangeTransactionListPlaceholder: "주소 입력",

  exchangeTransactionCalcFee: "송금 수수료",
  exchangeTransactionCalcActual: "실제 송금 코인",
  exchangeTransactionCalcBalance: "보유 잔액",

  exchangeTransactionGasLimit: "가스 한도",
  exchangeTransactionGasPrice: "가스 가격",
  exchangeTransactionInfo:
    "송금 버튼을 누른 후에는 취소할 수 없습니다. 수량과 받는 주소를 한번 더 확인해주세요.",

  contractAddressInputPlaceHolder: "주소 입력",
  contractintInputPlaceHolder: "숫자 입력",
  contractstrInputPlaceHolder: "문자 입력",
  contractbytesInputPlaceHolder: "바이트 입력",

  contractBalance: "보유",

  lockPageDescState: "잠금 상태입니다.",
  lockPageDescEnter: "설정한 잠금 번호 6자리를 입력해주세요.",
  lockPageInputPlaceholder: "잠금번호 입력",
  lockPageInputForget: "잠금 번호를 잊으셨나요?",

  noticeTitle:
    "지갑 백업 파일(Keystore 파일) 또는 개인 키를 안전한 장소에 보관해주세요.",
  noticeDesc1:
    "예기치 못하게 지갑이 삭제된 경우, 백업하지 않은 지갑은 복구가 불가능합니다.",
  noticeDesc2: "백업은 각 지갑의 메뉴에서 진행할 수 있습니다.",
  noticeNotAgain: "다시 보지 않기.",

  myPageExportDesc:
    "· 묶어서 백업할 지갑들을 선택해주세요. 지갑마다 비밀번호 확인이 필요합니다.",
  myPageExportCaution:
    "· [주의] 묶어서 내보낼 때, 기존 지갑들의 비밀번호는 묶음 지갑의 비밀번호로 바뀝니다.",
  myPageExportSelectedWallets: "개",
  myPageWalletChecked: "· 선택된 지갑",
  myPageSubTitle1: "잠금 설정",
  myPageSubTitle2: "지갑 묶어서 내보내기",
  myPageInfo1:
    "· 잠금 설정 시 ICONex를 실행할 때마다 잠금 번호를 확인합니다. 타인에게 내 지갑 정보가 노출되는 것을 방지할 수 있습니다.\n· 잠금 번호를 잊은 경우, 지갑 비밀번호 확인 후 잠금 번호를 재설정 할 수 있습니다.",
  myPageInfo2:
    "· 잠금 설정 시 ICONex를 실행할 때마다 잠금 번호를 확인합니다. 다른 사람에게 내 자산을 예기치 않게 노출하는 것을 방지할 수 있습니다.",
  myPageInfo3:
    "· 지갑 묶어서 내보내기는 ICONex 지갑 파일들을 모두 묶어서 하나의 파일로 백업하는 기능입니다.\n · 묶음 지갑의 Keystore 파일을 불러오면 여러 개의 지갑을 한번에 불러올 수 있습니다.",
  myPageUnlock: "· 잠금 설정을 해제하시겠습니까?",
  myPageLockNumber: "잠금 번호",
  myPageLockNumberUsing: "잠금 번호 사용 중",
  myPageLabel1: "새 잠금 번호",
  myPageLabel2: "새 잠금 번호 확인",
  myPageLabel3: "현재 잠금 번호",
  myPagePlaceholder1: "숫자 6자리 입력",
  myPagePlaceholder2: "비밀번호 입력",
  myPageLockSuccess:
    "지갑 비밀번호와 잠금번호를 기억해주세요.<br/>잠금 설정을 하시겠습니까?",
  myPageLockChangeSuccess: "잠금번호가 재설정되었습니다.",

  transferPageInfo1:
    "· 송금 버튼을 누른 후에는 취소할 방법이 없습니다. 수량과 받는 주소를 한번 더 확인해주세요.",
  transferPageLabel1: "송금할 코인 수량",
  transferPageLabel2: "송금 받는 코인 수량",
  transferPageLabel3: "송금 받는 주소",
  transferPageLabel4: "지갑 이름",
  transferPageLabel5_1: "송금 수수료",
  transferPageLabel5_2: "· 예상 최대 수수료",
  estimatedStepAndPrice: "· 적정 Step 한도 및 가격",
  transferPageLabel6_1: "송금 후 잔액",
  transferPageLabel6_2: "· 송금 후 예상 잔액",
  transferPageLabel7_eth: "가스 한도",
  transferPageLabel7_icx: "Step 한도",
  transferPageLabel8: "데이터",
  transferPageLabel9: "(선택)",
  transferPageLabel10_eth: "가스 가격",
  transferPageLabel10_icx: "Step 가격",
  transferPagePlaceholder1: "코인 수량 입력",
  transferPagePlaceholder2: "주소 입력",
  transferPagePlaceholder3: "지갑 선택",
  transferPagePlaceholder4: "데이터 입력",
  transferPagePlaceholder5_eth: "가스 한도 입력",
  transferPagePlaceholder5_icx: "Step 한도 입력",
  transferPageAllCheckBtn: "전액",
  transferPageAndCoin: "& 토큰 ",
  transferPageSlow: "느림",
  transferPageFast: "빠름",
  transferViewData: "보기",
  transferCollapseData: "접기",

  transferPageHelperTitle1_eth:
    "Transaction 실행 시 발생할 수 있는 최대 수수료는 가스 한도와 가스 가격을 곱한 값입니다.",
  transferPageHelperDesc1_eth:
    "Transaction이 발생했지만 채굴자에 의해 채택되지 않는 경우, 이미 사용된 수수료는 소진되고 해당 Transaction은 취소되니 적절한 수준의 가스 한도와 가스 가격을 설정해야 합니다.",
  transferPageHelperTitle2_eth:
    "가스 한도는 Transaction 실행에 지불할 용의가 있는 가스의 최대량을 의미합니다.",
  transferPageHelperDesc2_eth:
    "가스 한도를 더 높게 설정하더라도 Transaction에 필요한 만큼의 가스만 소진합니다.\n즉, 가스한도는 최대치만 설정 가능하며 실제 소진되는 가스량은 유동적입니다.",
  transferPageHelperTitle3_eth:
    "가스 가격은 가스 한 단위의 가격으로서 1 Gwei = 0.000000001 ETH로 고정되어 있습니다.",
  transferPageHelperDesc3_eth:
    "이더리움 채굴자는 블록을 생성할 때 자신에게 가장 이익이 되는 Transaction을 먼저\n채택합니다. 이는 가스 가격을 높게 설정할수록, 또는 가스 한도가 높을수록 채택될 확률이\n높음을 의미하며, 따라서 전송속도에 영향을 미치게 됩니다",
  transferPageHelperTitle4_eth:
    "수신자로부터 Data 입력을 요청 받지 않은 경우에는 입력하지 않고 송금할 수 있습니다.",
  transferPageHelperDesc4_eth:
    "Data를 입력해야만 거래가 실행되도록 설계되어 있는 경우, Data를 입력하지 않으면\n송금이 불가하며 수수료만 차감될 수 있습니다.",

  transferPageHelperTitle1_icx:
    "예상 최대 수수료는 Transaction 실행 시 발생할 수 있는 최대 수수료로서, 스텝 한도와 스텝 가격을 곱한 값입니다.",
  transferPageHelperDesc1_icx: "",
  transferPageHelperTitle2_icx:
    "스텝 한도는 Transaction 실행에 지불할 용의가 있는 스텝의 최대량을 의미합니다.",
  transferPageHelperDesc2_icx:
    "스텝 한도를 아주 높게 설정하더라도 Transaction에 필요한 만큼의 스텝만 소진합니다. 즉, 스텝 한도는 최대치만 설정 가능하며 실제 소진되는 스텝량은 유동적입니다.",
  transferPageHelperTitle3_icx:
    "Step 한 단위당 지불하는 가격입니다.",
  transferPageHelperDesc3_icx:
    "Step 가격은 loop로 지불하며 1 loop는 0.000000000000000001(10<sup>-18</sup>) ICX로 고정되어 있습니다. ICON 거래 수수료는 스마트 컨트랙트 기능 사용 횟수, 블록체인 데이터베이스 사용량, 거래 데이터 크기 등에 따라 부과됩니다.",
  transferPageHelperTitle4_icx:
    "수신자로부터 Data 입력을 요청 받지 않은 경우에는 입력하지 않고 송금할 수 있습니다.",
  transferPageHelperDesc4_icx:
    "Data를 입력해야만 거래가 실행되도록 설계되어 있는 경우, Data를 입력하지 않으면\n송금이 불가하며 수수료만 차감될 수 있습니다.",

  dataInputOpen: "데이터 입력 열기",
  dataInputClose: "데이터 입력 닫기",

  contractReadPage: "조회 / 실행하기",
  contractReadPageAddressInputPlaceHolder: "컨트랙트 주소 입력",
  contractAbiPlaceHolder: "컨트랙트 주소를 입력하면 자동으로 작성됩니다",

  checkPassword: {
    title: "지갑 비밀번호 확인",
    desc: "지갑의 비밀번호를 입력하여 주세요.",
    input: "비밀번호",
    placeholder: "비밀번호 입력",
    forgotPassword: "비밀번호를 잊으셨나요?",
    forgotPasswordDesc:
      "개인 키를 알고 있다면 지갑을 새로 가져와서 비밀번호를 재설정 할 수 있습니다. 아래 단계를 따라 진행해주세요.\n“지갑 가져오기” 선택 > “개인 키” 선택 > 개인 키 입력 후 가져오기 > 새 비밀번호 입력",
  },

  createWallet: {
    title: "지갑 만들기",
    step1: "코인 선택",
    step2: "정보 입력",
    step3: "Keystore 파일 다운로드",
    step4: "개인 키\n저장",

    desc1: "어떤 코인을 추가하시겠습니까?",
    leftInfoTitle1_1: "선택한 코인 기반의 전용 지갑으로 생성됩니다.",
    leftInfoDesc1_1:
      "· 아이콘 지갑 메뉴를 이용하여 IRC 토큰을 추가하실 수 있습니다.",
    leftInfoDesc1_2:
      "· 이더리움 지갑 메뉴를 이용하여 ERC20 토큰을 추가하실 수 있습니다.",
    leftInfoDesc1_3:
      "· 코인 지갑 생성 후, 해당 코인 기반의 토큰을 추가하실 수 있습니다.",
    leftInfoDesc1_4: "· 추가할 수 있는 코인 종류는 늘어날 예정입니다.",

    desc2: "새 지갑의 이름과 비밀번호를 입력해주세요.",
    leftInfoTitle2_1:
      "비밀번호는 강력하고 본인이 확실하게 기억할 수 있는 비밀번호로 설정하세요.",
    leftInfoTitle2_2:
      "비밀번호의 백업 및 관리는 전적으로 개인의 책임이며, 분실 시 어떤 방법으로도 복구될 수 없습니다.",
    leftInfoDesc2_1:
      "· 코인 송금 시 지갑 비밀번호를 입력해야 합니다.",
    leftInfoDesc2_2:
      "· If you move your wallet to mobile or another PC, you will need to enter your password along with your wallet backup file (Keystore file) or your private key.",
    walletNameInputLabel: "지갑 이름",
    walletNameInputPlaceHolder: "지갑 이름",
    passwordInputLabel: "지갑 비밀번호",
    passwordInputPlaceHolder1:
      "비밀번호 입력 (영문, 숫자, 특수문자 혼용 8자 이상)",
    passwordInputPlaceHolder2: "비밀번호 확인",
    new: "새",
    wallet: "지갑",
    cancelCreateWallet: "지갑 만들기를 취소하시겠습니까?",

    desc3: "지갑 백업 파일을 안전하게 보관하세요.",
    leftInfoTitle3_1:
      "지갑 백업 파일(Keystore 파일)은 개인 키를 암호화하여 저장한 파일이며, 사용을 위해서는 지정한 지갑 비밀번호를 입력해야 합니다.",
    leftInfoDesc3_1:
      "· 지갑이 삭제된 경우나 다른 PC 사용 시, Keystore 파일을 이용하여 지갑을 실행할 수 있습니다.",
    leftInfoDesc3_2:
      "· 지갑 백업 파일(Keystore 파일)은 비밀번호만 알면 지갑을 실행할 수 있는 중요한 정보이므로, 다른 사람에게 노출되지 않도록 안전하게 보관해야 합니다.",
    leftInfoDesc3_3:
      "· 안전한 저장 장소가 준비되지 않은 경우 지금 즉시 다운로드 하지 않아도 되며, 다음에 ‘지갑 백업’ 메뉴를 선택해 다운로드할 수 있습니다.",
    downloadSuccess:
      "지갑 백업 파일을 다운로드 하였습니다.<br />반드시 안전한 저장 장소에 보관해주세요.",
    passWithoutDownload:
      "지갑 백업 파일을 다운로드하지 않고<br />다음 단계로 진행하시겠습니까?",
    cancelCreateWalletNotDownload: "지갑 만들기를 취소하시겠습니까?",

    desc4: "종이 지갑을 프린트하거나 개인 키를 적어두세요.",
    leftInfoTitle4_1:
      "개인 키는 지갑을 직접 실행할 수 있는 고유 정보입니다. 프린트하거나 적어 두고 보관할 수 있습니다.",
    leftInfoDesc4_1:
      "· 지갑이 삭제된 경우나 다른 PC 사용 시, 개인 키를 이용하여 지갑을 실행할 수 있습니다.",
    leftInfoDesc4_2:
      "· 개인 키만 보유하면 지갑 실행 및 송금이 가능하니, 누구에게도 노출되지 않도록 각별한 관리가 필요합니다.",
    leftInfoDesc4_3:
      "· 지금 즉시 복사 또는 프린트하지 않더라도 ‘지갑 백업’ 메뉴를 선택해 다시 진행할 수 있습니다.",
    privateKey: "개인 키",
  },

  importWallet: {
    title: "지갑 가져오기",
    desc1: "지갑을 불러올 방법을 선택해주세요.",
    radioLabel1_1: "지갑 백업 파일(Keystore 파일)",
    radioLabel1_2: "개인 키",

    desc2: "지갑 백업 파일(Keystore 파일) 선택 후 비밀번호를 입력해주세요.",
    inputLabel2_1: "지갑 파일 선택",
    inputPlaceHolder2_1: "여기에 파일을 끌어오세요.",
    inputLabel2_2: "비밀번호 입력",
    inputPlaceHolder2_2: "비밀번호 입력",
    importSuccessAlert: "지갑 가져오기를 완료했습니다.",
    importFailAlert: "지갑 가져오기를 실패했습니다.",

    desc3: "코인 선택 후 개인 키를 입력해주세요.",
    inputLabel3_1: "코인 선택",
    inputLabel3_2: "개인 키 입력",
    inputPlaceHolder3_2: "개인 키 입력",
    infoBox3_1:
      "각 개인 키에 해당하는 코인을 선택해야만 보유한 코인 수량이 정상적으로 표시됩니다.",

    desc4: "새 지갑 이름과 비밀번호를 입력해주세요.",
    walletNameInputLabel: "지갑 이름",
    walletNameInputPlaceHolder: "지갑 이름",
    passwordInputLabel: "지갑 비밀번호",
    passwordInputPlaceHolder1:
      "비밀번호 입력 (영문, 숫자, 특수문자 혼용 8자 이상)",
    passwordInputPlaceHolder2: "비밀번호 확인",

    desc5: "새 지갑의 이름을 입력해주세요.",
  },

  addWallet: {
    title: "지갑 추가",
    desc: "지갑을 추가할 방법을 선택해주세요.",
    radioLabel1: "지갑 만들기",
    radioDesc1: "새 지갑을 만들 수 있습니다.",
    radioLabel2: "지갑 가져오기",
    radioDesc2:
        "만들어 둔 지갑을 가져올 수 있습니다.",
  },

  updateWalletName: {
    title: "지갑 이름 변경",
    desc: "지갑 이름을 변경할 수 있습니다.",
    inputLabel: "지갑 이름",
    inputPlaceHolder: "지갑 이름",
  },

  updatePassword: {
    title: "지갑 비밀번호 변경",
    desc: "지갑 비밀번호를 변경할 수 있습니다.",
    inputLabel1: "현재 비밀번호",
    inputPlaceHolder1: "현재 비밀번호 입력",
    inputLabel2: "새 비밀번호",
    inputPlaceHolder2:
        "비밀번호 입력 (영문, 숫자, 특수문자 혼용 8자 이상)",
    inputPlaceHolder3: "비밀번호 확인",
    infoBoxTitle:
      "· 변경된 비밀번호는 강력하고 본인이 확실하게 기억할 수 있는 비밀번호로 설정하세요. 변경된 비밀번호의 백업 및 관리는 전적으로 개인의 책임이며, 분실 시 어떤 방법으로도 복구될 수 없습니다.",
    infoBoxDesc1:
      "· 모바일이나 다른 PC로 지갑을 옮기는 경우 백업 파일 또는 개인 키와 함께 비밀번호를 입력해야 합니다.",
    changed: "비밀번호가 변경되었습니다.",
  },

  backupWallet: {
    title: "지갑 백업",
    desc:
      "'지갑 백업 파일(Keystore 파일) 다운로드' 또는 '개인 키 저장'으로 백업을 진행할 수 있습니다.\nICONex를 안전하게 사용하기 위해서는 반드시 다양한 방식으로 개인 키를 백업하세요.",
    infoBoxTitle1_1: "지갑 백업 파일(Keystore 파일) 다운로드",
    infoBoxDesc1_1:
      "· 지갑 백업 파일이란 지갑의 개인 키를 암호화하여 저장한 파일이며, 지갑 백업 파일을 사용하기 위해서는 지정한 지갑 비밀번호를 입력해야 합니다.",
    infoBoxDesc1_2:
      "· 지갑 백업 파일은 개인 키를 대체하여 지갑을 실행하고 송금할 수 있는 중요한 정보이므로, 타인에게 노출되지 않도록 안전하게 보관하세요.",

    infoBoxTitle2_1: "개인 키 저장", // infoBoxDesc2_1: '· 개인 키가 있으면 지갑을 사용하고 송금할 수 있으니, 개인 키가 삭제되거나 타인에게 노출되지 않도록 안전하게 보관해주세요.',
    infoBoxDesc2_1:
      "· 개인 키가 삭제되거나 타인에게 노출되지 않도록 안전하게 보관해 주세요.",
    infoBoxDesc2_2:
      "· 종이 지갑을 프린트하거나, 분실할 위험이 없는 메모장 등에 별도로 안전하게 복사해 두세요.",
  },

  addToken: {
    title1: "토큰 추가",
    desc1: "추가할 토큰을 선택해주세요.",
    info:
        "목록에 토큰이 없다면 직접 입력하여 추가해주세요.",
    title2: "토큰 정보 입력",
    desc2:
      "추가하실 토큰 주소를 입력해 주세요.\n나머지 정보는 자동으로 입력되며, 직접 수정하실 수 있습니다.",
    inputLabel1: "주소 (Address)",
    inputPlaceHolder1: "토큰 주소를 입력하세요.",
    inputLabel2: "토큰 이름 (Token Name)",
    inputPlaceHolder2: "토큰 주소를 입력하면 자동으로 입력됩니다.",
    inputLabel3: "토큰 기호 (Token Symbol)",
    inputPlaceHolder3: "토큰 주소를 입력하면 자동으로 입력됩니다.",
    inputLabel4: "소수 자리수 (Decimals)",
    inputPlaceHolder4: "토큰 주소를 입력하면 자동으로 입력됩니다.",
  },

  deleteWallet: {
    info1: "지갑을 삭제하시겠습니까?",
    info2:
      "삭제하시려는 지갑에 잔액이 남아 있습니다.<br/>지갑 백업이 되어있지 않으면 잔액 복구가 불가능합니다.<br/>그래도 삭제하시겠습니까?",
  },

  exportWallet: {
    caution:
      "묶어서 내보낼 때, 묶음 지갑 비밀번호를 새로 만들어야 합니다. <br/>기존 지갑들의 비밀번호는 묶음 지갑의 비밀번호로 바뀝니다. 계속 진행하시겠습니까?",

    title: "지갑 묶어서 내보내기",
    desc1:
      "묶어서 백업할 지갑들을 선택해주세요. 지갑마다 비밀번호 확인이 필요합니다.",
    desc2: "묶어서 내보낼 지갑의 비밀번호를 만들어주세요.",
    desc3: "지갑 백업 파일을 다운로드해주세요.",

    inputPlaceholder1: "비밀번호 입력",

    infoBoxTitle1:
      "· 묶음 지갑의 비밀번호는 강력하고 본인이 확실하게 기억할 수 있는 비밀번호로 설정하세요. 비밀번호의 백업 및 관리는 전적으로 개인의 책임이며, 분실 시 어떤 방법으로도 복구될 수 없습니다.",
    infoBoxDesc1:
      "· 묶음 지갑을 불러올 때 백업 파일과 함께 비밀번호를 입력해야 합니다.",

    infoTitle: "지갑 백업 파일",
    infoBoxTitle2:
      "· 지갑 백업 파일은 개인 키를 암호화하여 저장한 파일이며, 사용을 위해서는 지정한 지갑 비밀번호를 입력해야 합니다.",
    infoBoxDesc2_1:
      "· 지갑이 삭제된 경우나 다른 PC 사용 시, 지갑 백업 파일을 이용하여 지갑을 실행할 수 있습니다.",
    infoBoxDesc2_2:
      "· 지갑 백업 파일은 비밀번호만 알면 지갑을 실행할 수 있는 중요한 정보이므로, 다른 사람에게 노출되지 않도록 안전하게 보관해야 합니다.",
  },

  deleteToken: {
    info: "토큰을 삭제하시겠습니까?",
  },

  updateToken: {
    title: "토큰 정보 수정",
    desc: "토큰 정보를 수정할 수 있습니다.",
    inputLabel1: "주소 (Address)",
    inputPlaceHolder1: "주소 입력",
    inputLabel2: "토큰 이름 (Token Name)",
    inputPlaceHolder2: "토큰 이름 입력",
    inputLabel3: "토큰 기호 (Token Symbol)",
    inputPlaceHolder3: "토큰 기호 입력 (영문 또는 숫자)",
    inputLabel4: "소수 자리수 (Decimals)",
    inputPlaceHolder4: "숫자 입력",
  },

  addressList: {
    my: "나의",
    address: "주소",
    myAddress: "내 주소",
    recentHistory: "최근 거래 주소",
    quantityHodl: "보유량",
    quantityExchange: "환전량",
    quantityTransaction: "송금량",
    columnName: "지갑명",
    columnAddress: "지갑 주소",

    addressBook: "주소록",
    addressName: "주소명",
    walletNamePlaceHolder: "주소명 입력",
    walletAddressPlaceHolder: "지갑 주소 입력",
  },

  contractList: {
    contractList: "컨트랙트 목록",
    contractName: "컨트랙트명",
    contractAddress: "컨트랙트 주소",
  },

  unlockPopup: {
    title: "잠금 번호 확인",
    desc: "잠금 설정 해제를 위해 현재 잠금 번호를 입력해주세요.",
    subTitle: "잠금 번호",
    placeholder: "잠금 번호 6자리 입력",
    success: "잠금 설정이 해제되었습니다.",
  },

  changePasscode: {
    title: "잠금 번호 재설정",
    desc1: "선택한 지갑 비밀번호 확인 후 잠금 번호를 재설정할 수 있습니다.",
    desc2: "잠금 번호를 재설정할 수 있습니다.",
    inputLabel1: "새 잠금 번호",
    inputLabel2: "새 잠금 번호 확인",
    inputPlaceHolder1: "잠금 번호 입력",
    inputPlaceHolder2: "숫자 6자리 입력",
  },

  printPage: {
    walletTitle: "지갑 이름",
    walletCoin: "거래 코인",
    createDate: "지갑 생성일",
    addressLabel: "지갑 주소",
    addressInfo: "* 위 주소로 코인을 입금할 수 있습니다.",
    privateKeyLabel: "개인 키 QR코드",
    privateKeyInfo:
        "* 개인 키를 이용하여 지갑을 가져올 수 있습니다.",
  },

  validationForm: {
    newPassword: "새 비밀번호",
    bundlePassword: "묶음 지갑 비밀번호 설정",
    walletPassword: "지갑 비밀번호",
    walletNameLabel: "지갑 이름",
    walletNamePlaceHolder: "지갑 이름 입력",
    inputPlaceHolder1:
        "비밀번호 입력 (영문, 숫자, 특수문자 혼용 8자 이상)",
    inputPlaceHolder2: "비밀번호 확인",
  },

  disclaimerPage: {
    header: "ICONex 이용 면책 조항",
    title:
      "ICX 공식 wallet “ICONex”의 이용자는 “ICONex”를 다운로드하여 이용함과 동시에 아래 면책 조항에 대한 구속력이 발생함을 알려드립니다.",
    desc1:
      "1. ICONex 이용자가 ICONex 이용 과정에서 생성한 개인 키는 사용자의 로컬 PC에 저장되며, ICON Foundation에서는 ICONex이용자의 개인 키를 별도로 보관ㆍ관리하고 있지 않습니다. ICONex 이용자는 본인이 생성한 개인키에 대한 보관 및 관리의 책임이 있으며, 바이러스, 해킹, 분실 등 각종 원인으로ICONex 이용자가 개인키를 이용할 수 없게 된 경우 ICON Foundation은 이에 대한 일체의 책임을 부담하지 않습니다.",
    desc2:
      "2. ICON Foundation은 ICONex의 무결성, 안정성, 정확성, 보안성 등에 대하여 보증하지 않으며, 현재 버전의 ICONex를 ‘그 자체로’ 제공합니다.  ICON Foundation은 더 안정적이고 편리한 서비스를 제공하기 위하여 ICONex에 대하여 지속적으로 테스트와 업데이트를 시행하고 있으나, 이러한 노력에도 불구하고 예기치 못한 문제가 발생할 가능성은 항상 존재합니다. ICON Foundation은 오작동, 해킹, 분실, 바이러스 감염 등을 포함한 일체의 예기치 못한 문제에 대하여 책임을 부담하지 않습니다.",
    desc3:
      "3. ICON Foundation은 더 안정적이고 편리한 서비스를 제공하기 위하여 지속적으로 테스트와 업데이트를 시행하고 있습니다. 하지만 이러한 노력에도 불구하고 예기치 못한 문제가 발생할 가능성은 늘 존재합니다. 개인 키의 해킹이나 분실, 예기치 못한 문제로 인한 금전적 손실은 ICON Foundation이 책임지지 않습니다.",
    desc4:
      "4. ICON Foundation은 ICONex 이용자가 ICONex를 매개로 하여 제3자와 거래 등을 한 경우 이와 관련하여 책임을 부담하지 않습니다.",
    desc5:
      "5. ICON Foundation은 ICONex 이용과 관련하여 불법행위, 계약, 보증, 무과실 책임, 부주의로 인한 어떠한 형태의 책임을 부담하는 경우라 하더라도, 간접적, 결과적, 특수적, 징벌적 또는 이와 유사한 손해에 대해서는 일체의 책임을 부담하지 않습니다.",
    desc6:
      "6. ICONex는 한국어와 영어를 기본 언어로 지원합니다. 기본으로 제공하는 언어 외에 다른 언어로 번역 시 이로 인해 의미가 잘못 전달되어 발생한 문제에 대해서는 ICON Foundation에게 책임이 없습니다.",
    copyright:
      "※ ICONex와 관련된 모든 저작권은 ICON Foundation에 있습니다 (Copyright © 2020 ICON Foundation).",
  },

  termsOfUse: "이용약관",

  sendTransaction: {
    infoSuccess: "송금 요청이 완료되었습니다.",
    offline: "인터넷이 연결되어 있지 않습니다.",
    titleInfo: "수량과 주소를 한번 더 확인해 주세요.",
    txFeeIcx: "예상 최대 수수료",
    txFeeEth: "예상 최대 수수료",
    quantity: "송금 수량",
    address: "받는 주소",
    sendingAddress: "보내는 주소",
    receivingAddress: "받는 주소",
    titleInfoShort: "수량과 주소를 한번 더 확인해 주세요.",

    icxFailure: "오류로 인해 트랜잭션이 실패하였습니다.",
    infoFailure:
      "송금이 취소되었습니다.<br/>가스 가격을 높게 설정하여<br/>다시 한번 시도해 주세요.",
    knownFailure:
      "송금이 취소되었습니다.<br/>동일 내역의 송금이 이미 진행 중입니다.",
    anotherFailure:
      "송금이 취소되었습니다.<br/>다른 내역의 송금이 진행 중입니다.",
    gasFailure: "수수료가 부족합니다.",
    gasLimitFailure: "가스 한도가 너무 낮습니다.",
    exceedsFailure: "가스 한도를 초과했습니다.",
    internetFailure:
      "송금이 취소되었습니다.<br/>인터넷 연결이 해제되어 있습니다.",
    tokenGasFailure:
      "이더리움 계좌 잔액이 부족하여<br/>토큰을 송금할 수 없습니다.",

    confirmData: "실행할 정보를 한번 더 확인해주세요.",
    maximumFee: "예상 최대 수수료",
    sendQuantity: "송금할 ICX 수량",
    walletAddress: "지갑 주소",

    txComplete: "실행이 완료 되었습니다.",
    txHashTracker: "TxHash는 ICON Tracker에서 조회 가능합니다.",

    openTracker: "ICON Tracker로 이동",
    openEtherscan: "Etherscan으로 이동",
  },

  connectLedger: {
    title: "Ledger Wallet 연결",
    connectError: "연결에 실패했습니다.",
    desc:
      "Ledger Wallet을 사용중인 컴퓨터에 연결 후<br />아래 <span>“연결”</span> 버튼을 클릭해 주세요.",
    descError:
      "Ledger Wallet이 컴퓨터에 올바로 연결됐는지<br />확인 후 아래 <span>“재시도”</span> 버튼을 클릭해 주세요.",
    info: "ICONex에서 Ledger Wallet 이용하는 방법",
    walletAddress: "지갑 주소",
    connectWallet: "연결된 Ledger Wallet",
    manualFileName: "Guide_to_use_Ledger_Wallet_on_ICONex_Ledger_kr",
  },

  completeTransaction: {
    success:
      "송금 요청이 완료되었습니다.<br/>거래 내역은 ICON Tracker에서<br/>조회 가능합니다.",
    fail: "송금 요청을 실패했습니다.<br/>다시 시도해 주세요.",
  },

  stake: "Stake",
  vote: "Delegate",
  bond: "Bond",
  iScore: "I-Score",

  // 6p Voting P-Rep 페이지
  pRep_totalDelegated: "이미 위임한 Voting Power (ICX)",
  pRep_available: "위임 가능한 Voting Power (ICX)",
  pRep_totalSupply: "Total ICX Supply",

  // 7p ~ 10p Voting My Status 페이지
  voting: "Voting",
  voting_sub1: "P-Rep",
  voting_sub2: "My Status",
  voting_about: "About Voting",
  voting_about_desc: `
    <p class="about-bold">Stake</p>
    <p class="about-text">원하는 수량만큼 ICX를 잠금 상태(Staked ICX)로 전환하는 기능입니다. Stake를 실행하면 ICX는 잠금 상태로 전환되며, 해제 시 수일이 소요됩니다. Stake된 ICX의 양만큼 Voting Power가 1:1 비율로 생성됩니다. </p>
    <p class="about-bold">Delegate</p>
    <p class="about-text">Voting Power를 이용하여 P-Rep 후보자에게 투표할 수 있습니다.</p>
    <p class="about-bold">I-Score</p>
    <p class="about-text">P-Rep 투표에 대한 기여도 점수이며, 1,000 I-Score를 1 ICX로 청구할 수 있습니다.</p>      
  `,
  myStatusStake_unstake1: "Unstaking",
  myStatusStake_unstake2: "목표 블록 높이",
  myStatusStake_unstake3: "완료 시간",
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
  myStatusVote_li1: "Delegate Stage ICX",
  myStatusVote_li2: "Delegated ICX",
  myStatusVote_li3: "Delegable ICX",
  myStatusBond_unbond1: "Unbonding",
  myStatusBond_axis1: "Bonded",
  myStatusBond_axis2: "Non-bonded",
  myStatusBond_li1: "Bond Stage ICX",
  myStatusBond_li2: "Bonded ICX",
  myStatusBond_li3: "Bondable ICX",
  myStatusBond_li4: "Unbonding ICX",
  myStatusIScore_p1: "현재 I-Score",
  myStatusIScore_p2: "수령 가능한 ICX의 양",

  myVote: "My Votes",
  pRepTable_rank: "Rank",
  pRepTable_name: "Name",
  pRepTable_totalVotes: "Total Votes (%)",
  pRepTable_server: "Server Location",
  pRepTable_governance: "Governance",
  pRepTable_sponsoredProjects: "Sponsored Projects",
  pRepTable_active: "Active",
  pRepTable_myVotes: "My Votes (%)",
  pRepTable_h4: "내역 조회",
  pRepTable_noData_p: "투표에 참여하여 ICON Network의 일원이 되어 주세요!",
  pRepTable_noData_p1:
    "아래에서 투표할 리스트를 선택 후, Voting Power를 분배해 주세요.",
  pRepTable_noData_p2:
    "투표에 참여하여 네트워크에 기여하세요. 기여에 대한 보상으로 I-Score를 받을 수 있습니다.",

  // 13p~ Claim ICX with I-Score 팝업
  claimIcx: {
    title: "Claim ICX",
  },

  // 14p~ Stake 팝업
  stakeIcx: {
    desc: "위임된 Staked ICX는 un-stake 할 수 없습니다.",
    help: "Un-stake를 위해 최소한의 ICX가 필요합니다. (1 ICX)",
    estimatedTime: "· Un-stake 예상 완료 시간",
    min: "최소 Stake",
    max: "최대 Stake",
    success: (str) => `${str} 실행이 완료되었습니다.`,
  },

  // 21p~ Vote 페이지
  votePage: {
    add: "추가",
    add_added: "추가한 리스트",
    add_cntFull: "최대 100개의 P-Rep을 선택해주세요.",
    delete: "삭제",
    delete_voted:
        "해당 P-Rep에게 투표된 수량을 초기화한 후에 다시 시도하세요.",
    max: "최대",
    toast: "My Votes에 추가 완료",
    confirm_title: "투표할 내용을 한번 더 확인해 주세요.",
    confirm_li1: "· 투표한 P-Rep",
    confirm_li2: "· Delegated",
    success1: "투표가 완료 되었습니다.",
    success2: "Voting 내역은 ICON Tracker에서 조회 가능합니다.",
  },

  bondPage: {
    confirm_title: "본딩할 내용을 한번 더 확인해 주세요.",
    confirm_li1: "· 본딩된 P-Rep",
    confirm_li2: "· Bonded",
    success1: "본딩이 완료 되었습니다.",
    success2: "Bonding 내역은 ICON Tracker에서 조회 가능합니다."
  }
};