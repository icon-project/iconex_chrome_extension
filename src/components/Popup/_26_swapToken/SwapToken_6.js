import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { nToBr, makeRawTx } from 'utils';
import { QuantitySetterContainer } from 'containers/'
import { IcxContractAddress as ICX_CONTRACT_ADDRESS, IcxDiscardAddress as ICX_DISCARD_ADDRESS } from 'constants/config'

const INIT_STATE = {
}

@withLanguageProps
class SwapToken5 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentDidMount() {
    this.props.setAccountAddress({
      isLoggedIn: true,
      accountAddress: this.props.accountAddress,
      coinTypeIndex: ICX_CONTRACT_ADDRESS
    })
    this.props.setGasLimit(0);
    this.props.setGasPrice(0);
    this.props.setRecipientAddress(ICX_DISCARD_ADDRESS);
    this.props.setCalcData()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.submit !== nextProps.submit && nextProps.submit) {
      nextProps.setPopupType(`sendTransaction_swap`);
      nextProps.setPopupNum(2);
    }
  }

  handleSubmit = (e) => {
    if (this.props.gasLimit * this.props.gasPrice === 0) {
      return
    }
    this.props.submitCall(true);
  }

  checkGasInfo = () => {
    const { wallets, accountAddress, recipientAddress, coinQuantity, gasPrice, gasLimit, coinTypeIndex } = this.props
    const token = wallets[accountAddress].tokens[coinTypeIndex]
    const rawTx = makeRawTx(true, {
      from: accountAddress,
      to: recipientAddress,
      tokenAddress: token.address,
      tokenDefaultDecimal: token.defaultDecimals,
      tokenDecimal: token.decimals,
      value: coinQuantity,
      gasPrice: gasPrice,
      gasLimit: gasLimit
    })
    this.props.getGasInfo(rawTx)
  }

  render() {
    const { I18n } = this.props;
    return (
      <ul className="layout">
        <li className="swap">
          <div className="tab-holder">
            <h1 className="title">Step 5</h1>
            <span className="img"><em className="_img step5"></em></span>
            <ul>
              <li>{I18n.swapToken.step1}</li>
              <li>{nToBr(I18n.swapToken.step2)}</li>
              <li>{nToBr(I18n.swapToken.step3)}</li>
              <li>{nToBr(I18n.swapToken.step4)}</li>
              <li className="on">{nToBr(I18n.swapToken.step5)}</li>
            </ul>
          </div>
          <div className="info">
            <ul>
              <li><span>{I18n.swapToken.leftInfoTitle5_1}</span></li>
              <li className="dot space">{I18n.swapToken.leftInfoDesc5_1}</li>
              <li className="dot">{I18n.swapToken.leftInfoDesc5_2}</li>
            </ul>
          </div>
        </li>
        <li className="content">
          <span onClick={this.props.cancelSwap} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.swapToken.title}</h1>
          <h2>{I18n.swapToken.rightHeaderDesc5}</h2>
          <div className="scroll-holder">
						<div className="scroll">
							<div className="tabbox-holder exchange">
                <QuantitySetterContainer isLoggedIn={this.props.isLoggedIn} swapPage={true} gasLimit={this.props.gasLimit} gasPrice={this.props.gasPrice} getGasInfo={this.props.getGasInfo} checkGasInfo={this.checkGasInfo}/>
								<div className="group-holder">
									<ul className="message-holder">
										<li>{I18n.swapToken.gasInfo}</li>
									</ul>
								</div>

								<div className="group-holder">
									<p className="title">{I18n.swapToken.erc20AddressLabel}</p>
									<p className="key">{this.props.recipientAddress}</p>
									<ul className="message-holder line">
										<li>{I18n.swapToken.erc20AddressInfo1}</li>
										<li>{I18n.swapToken.erc20AddressInfo2}</li>
									</ul>
									<p className="title">{I18n.swapToken.icxAddressLabel}</p>
									<p className="key">{this.props.icxSwapAddress}</p>
									<ul className="message-holder line">
										<li>{I18n.swapToken.icxAddressInfo1}</li>
										<li>{I18n.swapToken.icxAddressInfo2}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
          <div className="btn-holder">
            <button onClick={this.handleSubmit} type="submit" className={`btn-type-normal ${this.props.gasLimit * this.props.gasPrice === 0  && 'disabled'}`}><span>{I18n.button.complete}</span></button>
					</div>
        </li>
      </ul>
    );
  }
}

export default SwapToken5;
