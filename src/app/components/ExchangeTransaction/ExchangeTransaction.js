import React, { Component } from 'react';
import { HeaderTitle, LoadingComponent, Alert } from 'app/components/'
import { WalletSelectorContainer, QuantitySetterContainer, RecipientAddressContainer, } from 'app/containers/'
import { TxFeeAndDataContainer, CalculationTableContainer } from 'app/containers/'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  isSubmitClicked: false,
  showAlertWalletFirst: false
}

@withLanguageProps
class ExchangeTransaction extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    /* TODO: 잔고 fetch walletSelector 로 이전 */
    const {
      walletsLoading,
      wallets,
      fetchAll,
      isLedger,
    } = this.props;

    if (isLedger) {
      fetchAll({});
    }
    if (!isLedger && !walletsLoading) {
      fetchAll(wallets);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.submit !== nextProps.submit && nextProps.submit) {
      nextProps.openPopup({
        popupType: `sendTransaction_transaction`,
        popupNum: 2
      });
    }
  }

  componentWillUnmount() {
    this.props.resetReducer();
  }

  handleSubmit = () => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.setState({
        showAlertWalletFirst: true
      });
      return false
    }
    this.props.submitCall(true);
  }

  closeAlert = () => {
    this.setState({
      showAlertWalletFirst: false
    })
  }

  render() {
    const { walletsLoading, I18n, isLoggedIn } = this.props;
    const { showAlertWalletFirst } = this.state;

    if (walletsLoading) {
      return (
        <div className="page-loading-wrap">
          <LoadingComponent type="black" />
        </div>
      );
    }

    return (
      <div>
        <HeaderTitle title={I18n.transfer}/>
        <div className="wrap-holder exchange">
          <WalletSelectorContainer />
          <div className='quantity-holder'>
            <QuantitySetterContainer />
            <RecipientAddressContainer />
            { isLoggedIn && (<TxFeeAndDataContainer />) }
            { isLoggedIn && (<CalculationTableContainer />) }
          </div>
          <p className="lock-txt"><em className="_img"></em>{I18n.transferPageInfo1}</p>
          <div className="btn-holder in">
            <button className="btn-type-normal size-medium" onClick={this.handleSubmit}><span>{I18n.transfer}</span></button>
          </div>
        </div>
        {
          showAlertWalletFirst && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertWalletFirst}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }}

export default ExchangeTransaction;
