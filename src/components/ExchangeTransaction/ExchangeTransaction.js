import React, { Component } from 'react';
import { HeaderTitle, LoadingComponent, ExchangePanel, Alert } from 'components/'
import { WalletSelectorContainer, QuantitySetterContainer, RecipientAddressContainer, } from 'containers/'
import { isEmpty } from 'utils';
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

    const {
      walletsLoading,
      wallets,
      fetchAll,
      resetReducer,
      setEXTRPageType,
      setAccountAddress,
      location
    } = this.props;

    resetReducer();
    setEXTRPageType(location.pathname.slice(1));

    if (!isEmpty(location.state)) {
      setAccountAddress({
        accountAddress: location.state.accountAddress,
        coinTypeIndex: location.state.coinTypeIndex
      })
    }

    if (!walletsLoading) {
      fetchAll(wallets);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.submit !== nextProps.submit && nextProps.submit) {
      nextProps.togglePopup();
      nextProps.setPopupType(`sendTransaction_${nextProps.pageType}`);
      nextProps.setPopupNum(2);
    }
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
    const { pageType, walletsLoading, I18n } = this.props;
    const { showAlertWalletFirst } = this.state;

    if (walletsLoading) {
      return (
        <div className="page-loading-wrap">
          <LoadingComponent type="black" />
        </div>
      );
    }

    const title = pageType === 'exchange' ? I18n.exchange : I18n.transfer
    return (
      <div>
        <HeaderTitle title={title}/>
        { pageType === 'exchange' && (
            <ExchangePanel />
          )
        }
        <div className="wrap-holder exchange">
          <WalletSelectorContainer />
          <QuantitySetterContainer />
          <RecipientAddressContainer />
          <p className="lock-txt"><em className="_img"></em>{I18n.transferPageInfo1}</p>
          <div className="btn-holder in">
            <button className="btn-type-normal size-medium" onClick={this.handleSubmit}><span>{title}</span></button>
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
