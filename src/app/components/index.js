import Notice from './Notice/Notice'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import LoadingComponent from './Common/LoadingComponent'
import LoadingComponentInline from './Common/LoadingComponentInline'
import ValidationForm from './Common/ValidationForm'
import QrcodeComponent from './Common/QrcodeComponent'
import CurrencyMenuBar from './Common/CurrencyMenuBar'
import CopyButton from './Common/CopyButton'
import CopyButton2 from './Common/CopyButton2'
import Alert from './Common/Alert'
import Timer from './Common/Timer'
import AddressTable from './Common/AddressTable'
import ServerChanger from './Common/ServerChanger'
import LedgerIframe from './Common/LedgerIframe'

import MainPage from './MainPage/MainPage'

import MyWallet from './MyWalletPage/MyWallet'
import MyWalletHeader from './MyWalletPage/MyWalletHeader'
import MyWalletHeaderLeft from './MyWalletPage/MyWalletHeaderLeft'
import MyWalletHeaderRight from './MyWalletPage/MyWalletHeaderRight'
import MyWalletContent from './MyWalletPage/MyWalletContent'
import Graph from './MyWalletPage/Graph';
import WalletSectionList from './MyWalletPage/WalletSectionList';
import WalletSection from './MyWalletPage/WalletSection';
import WalletBar from './MyWalletPage/WalletBar';
import WalletMenuBar from './MyWalletPage/WalletMenuBar';

import Popup from './Popup/Popup';
import SmallPopup from './Popup/_00_commonPopup/SmallPopup';
import CheckPassword from './Popup/_00_commonPopup/CheckPassword';
import CreateWallet from './Popup/_01_createWallet/CreateWallet';
import CreateWallet1 from './Popup/_01_createWallet/CreateWallet_1';
import CreateWallet2 from './Popup/_01_createWallet/CreateWallet_2';
import CreateWallet3 from './Popup/_01_createWallet/CreateWallet_3';
import CreateWallet4 from './Popup/_01_createWallet/CreateWallet_4';
import ImportWallet from './Popup/_02_importWallet/ImportWallet';
import ImportWallet1 from './Popup/_02_importWallet/ImportWallet_1';
import ImportWallet2 from './Popup/_02_importWallet/ImportWallet_2';
import ImportWallet3 from './Popup/_02_importWallet/ImportWallet_3';
import ImportWallet4 from './Popup/_02_importWallet/ImportWallet_4';
import ImportWallet5 from './Popup/_02_importWallet/ImportWallet_5';

import AddWallet from './Popup/_03_addWallet/AddWallet';
import UpdateWalletName from './Popup/_04_updateWalletName/UpdateWalletName';
import UpdatePassword from './Popup/_05_updatePassword/UpdatePassword';
import BackupWallet from './Popup/_06_backupWallet/BackupWallet';
import BackupWallet1 from './Popup/_06_backupWallet/BackupWallet_1';
import BackupWallet2 from './Popup/_06_backupWallet/BackupWallet_2';
import AddToken from './Popup/_07_addToken/AddToken';
import AddToken1 from './Popup/_07_addToken/AddToken_1';
import AddToken2 from './Popup/_07_addToken/AddToken_2';
import DeleteWallet from './Popup/_08_deleteWallet/DeleteWallet';
import ExportWallet from './Popup/_09_exportWallet/ExportWallet';
import ExportWallet1 from './Popup/_09_exportWallet/ExportWallet_1';
import ExportWallet2 from './Popup/_09_exportWallet/ExportWallet_2';
import ExportWallet3 from './Popup/_09_exportWallet/ExportWallet_3';

import CoinDetail from './CoinDetailPage/CoinDetail';
import CoinDetailContent from './CoinDetailPage/CoinDetailContent';
import TransactionHistory from './CoinDetailPage/TransactionHistory';
import DeleteToken from './Popup/_10_deleteToken/DeleteToken';
import UpdateToken from './Popup/_11_updateToken/UpdateToken';

import AddressList from './Popup/_21_addressList/AddressList'
import SendTransaction from './Popup/_22_sendTransaction/SendTransaction'
import SendTransaction1 from './Popup/_22_sendTransaction/SendTransaction_1'
import SendTransaction2 from './Popup/_22_sendTransaction/SendTransaction_2'
import SendTransaction3 from './Popup/_22_sendTransaction/SendTransaction_3'

import ExchangeTransaction from './ExchangeTransaction/ExchangeTransaction'
import ComboBox from './ExchangeTransaction/ComboBox'
import HeaderTitle from './ExchangeTransaction/HeaderTitle'
import WalletSelector from './ExchangeTransaction/WalletSelector'
import QuantitySetter from './ExchangeTransaction/QuantitySetter'
import GasStepTable from './ExchangeTransaction/GasStepTable'
import CalculationTable from './ExchangeTransaction/CalculationTable'
import RecipientAddress from './ExchangeTransaction/RecipientAddress'
import ExchangePanel from './ExchangeTransaction/ExchangePanel'

import ContractPage from './ContractPage/ContractPage'
import ContractReadPage from './ContractPage/ContractReadPage/ContractReadPage'
import ContractRunSection from './ContractPage/ContractReadPage/ContractRunSection'
import ContractSearchSection from './ContractPage/ContractReadPage/ContractSearchSection'
import ContractExecuteSection from './ContractPage/ContractReadPage/ContractExecuteSection'
import InputText from './ContractPage/ContractReadPage/InputText'
import InputData from './ContractPage/ContractReadPage/InputData'
import InputBoolean from './ContractPage/ContractReadPage/InputBoolean'
import Output from './ContractPage/ContractReadPage/Output'
import ContractList from './Popup/_27_contractList/ContractList'

import MyPage from './MyPage/MyPage'
import LockContent from './MyPage/LockContent'
import ExportContent from './MyPage/ExportContent'
import LockSetting from './MyPage/LockSetting'
import UnlockPopup from './Popup/_23_unlockPopup/UnlockPopup'

import PasswordSetter from './MyPage/PasswordSetter'
import PasswordInput from './MyPage/PasswordInput'

import LockPage from './LockPage/LockPage'

import ChangePasscode from './Popup/_24_changePasscode/ChangePasscode'
import ChangePasscode1 from './Popup/_24_changePasscode/ChangePasscode_1'
import ChangePasscode2 from './Popup/_24_changePasscode/ChangePasscode_2'
import NewPasscodeInput from './Popup/_24_changePasscode/NewPasscodeInput'

import ImmunityPopup from './Popup/_25_immunityPopup/ImmunityPopup'

import SwapToken from './Popup/_26_swapToken/SwapToken'
import SwapToken0 from './Popup/_26_swapToken/SwapToken_0'
import SwapToken1 from './Popup/_26_swapToken/SwapToken_1'
import SwapToken2 from './Popup/_26_swapToken/SwapToken_2'
import SwapToken3 from './Popup/_26_swapToken/SwapToken_3'
import SwapToken4 from './Popup/_26_swapToken/SwapToken_4'
import SwapToken5 from './Popup/_26_swapToken/SwapToken_5'
import SwapToken6 from './Popup/_26_swapToken/SwapToken_6'

import ConnectLedger from './Popup/_27_connectLedger/ConnectLedger'


export {
  Notice,
  Header,
  Footer,
  Popup,
  SmallPopup,
  CheckPassword,
  LoadingComponent,
  LoadingComponentInline,
  ValidationForm,
  QrcodeComponent,
  CopyButton,
  CopyButton2,
  Alert,
  ImmunityPopup,
  Timer,
  AddressTable,
  ServerChanger,
  LedgerIframe,

  // *** MAIN PAGE *** //
  MainPage,
  // popup //
  CreateWallet,
  CreateWallet1,
  CreateWallet2,
  CreateWallet3,
  CreateWallet4,
  ImportWallet,
  ImportWallet1,
  ImportWallet2,
  ImportWallet3,
  ImportWallet4,
  ImportWallet5,
  SwapToken,
  SwapToken0,
  SwapToken1,
  SwapToken2,
  SwapToken3,
  SwapToken4,
  SwapToken5,
  SwapToken6,
  ConnectLedger,
  
  // *** MY WALLET PAGE *** //
  MyWallet,
  MyWalletHeader,
  MyWalletHeaderLeft,
  MyWalletHeaderRight,
  MyWalletContent,
  Graph,
  WalletSectionList,
  WalletSection,
  WalletBar,
  WalletMenuBar,
  CurrencyMenuBar,
  // popup //
  AddWallet,
  UpdateWalletName,
  UpdatePassword,
  BackupWallet,
  BackupWallet1,
  BackupWallet2,
  AddToken,
  AddToken1,
  AddToken2,
  DeleteWallet,
  ExportWallet,
  ExportWallet1,
  ExportWallet2,
  ExportWallet3,

  // *** COIN DETAIL PAGE *** //
  CoinDetail,
  CoinDetailContent,
  TransactionHistory,
  // popup //
  DeleteToken,
  UpdateToken,

  // *** EXCHANGE_TRANSACTION PAGE *** //
  ExchangeTransaction,
  ComboBox,
  HeaderTitle,
  WalletSelector,
  QuantitySetter,
  GasStepTable,
  CalculationTable,
  RecipientAddress,
  ExchangePanel,
  // popup //
  AddressList,
  SendTransaction,
  SendTransaction1,
  SendTransaction2,
  SendTransaction3,

  //*** CONTRACT PAGE *** //
  ContractPage,
  ContractReadPage,
  ContractRunSection,
  ContractSearchSection,
  ContractExecuteSection,
  InputText,
  InputBoolean,
  InputData,
  Output,
  // popup //
  ContractList,

  // *** MY PAGE *** //
  MyPage,
  LockContent,
  ExportContent,
  LockSetting,
  UnlockPopup,
  PasswordSetter,
  PasswordInput,
  LockPage,
  ChangePasscode,
  ChangePasscode1,
  ChangePasscode2,
  NewPasscodeInput
}
