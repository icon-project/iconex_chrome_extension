import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withLanguageProps from 'HOC/withLanguageProps';
import { convertNumberToText } from 'utils';

@withRouter
@withLanguageProps
class SendTransaction2 extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading && !nextProps.loading) {
      this.props.setPopupNum(3);
    }
  }

  closePopup = () => {
    this.props.initPopupState();
  }

  handleSubmit = () => {
     const {
       accountAddress,
       recipientAddress,
       coinQuantity,
       coinTypeIndex,
       gasLimit,
       gasPrice,
       wallets,
       data,
       privKey,
       loading
     } = this.props;

     if (loading) return false;

     const coinTypeId = coinTypeIndex || accountAddress;
     const sendData = {
       from: accountAddress,
       to: recipientAddress,
       tokenAddress: coinTypeId !== accountAddress ? coinTypeId : null,
       tokenDefaultDecimal: coinTypeId === accountAddress ? 18 : wallets[accountAddress].tokens[coinTypeId].defaultDecimals,
       tokenDecimal: coinTypeId === accountAddress ? 18 : wallets[accountAddress].tokens[coinTypeId].decimals,
       value: coinQuantity,
       data: data,
       gasLimit: gasLimit,
       gasPrice: gasPrice,
       coinType: wallets[accountAddress].type
     }

     this.props.sendCall(privKey, sendData);
   }

  render() {
    const { coinQuantity, recipientAddress, calcData, gasPrice, gasLimit, swapPage } = this.props;
    const { I18n } = this.props;
    return (
      <div className="popup send">
  			<p className="txt_box">{I18n.sendTransaction.titleInfo}</p>
  			<p><span>{swapPage ? I18n.sendTransaction.swapQuantity : I18n.sendTransaction.quantity} : </span><em>{`${convertNumberToText(coinQuantity, 'transaction', true)}`}<i>{`${calcData.coinType.toUpperCase()}`}</i></em></p>
        <p><span>{calcData.coinType === 'icx' ? I18n.sendTransaction.txFeeIcx : I18n.sendTransaction.txFeeEth} : </span><em>{`${calcData.coinType === 'icx' ? 0.01 : convertNumberToText(gasLimit * window.web3.fromWei(gasPrice, 'gwei'), 'transaction', true)}`}<i>{`${calcData.coinType === 'icx' ? calcData.coinType.toUpperCase() : 'ETH'}`}</i></em></p>
  			<p><span>{I18n.sendTransaction.address} : </span><em>{recipientAddress}</em></p>
  			<div className="btn-holder">
  				<button onClick={this.closePopup} className="btn-type-fill size-del"><span>{I18n.button.cancel}</span></button>
  				<button onClick={this.handleSubmit} className="btn-type-normal size-del"><span>{swapPage ? I18n.button.swap : I18n.button.transfer}</span></button>
  			</div>
  		</div>
    );
  }
}


export default SendTransaction2;
