import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { nToBr } from 'utils';
import { ValidationForm, LoadingComponent } from 'app/components/';

const INIT_STATE = {
  loading: false,
}

@withLanguageProps
class SwapToken3 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  handleSubmit = () => {
    if(!this.state.loading) {
      this.validationForm.validateForm(['walletName', 'pw', 'pwConfirm'], 'submit');
    }
  }

  toggleCheckbox = () => {
    this.setState({
      checked: !this.state.checked
    })
  }

  onSuccess = (walletName, pw) => {
    this.props.setWalletNameAndPasswordForSwap(walletName, pw)
    this.props.setPopupNum(4);
  }

  goBack = () => {
    this.props.setWalletName('');
    this.props.setPopupNum(2);
  }

  render() {
    const { loading } = this.state;
    const { I18n } = this.props;
    return (
      <ul className="layout">
        <li className="swap">
          <div className="tab-holder">
            <h1 className="title">Step 2</h1>
            <span className="img"><em className="_img step2"></em></span>
            <ul>
              <li>{nToBr(I18n.swapToken.step1)}</li>
              <li className="on">{nToBr(I18n.swapToken.step2)}</li>
              <li>{nToBr(I18n.swapToken.step3)}</li>
              <li>{nToBr(I18n.swapToken.step4)}</li>
              <li>{nToBr(I18n.swapToken.step5)}</li>
            </ul>
          </div>
          <div className="info">
            <ul>
              <li>{I18n.swapToken.leftInfoTitle2_1}</li>
              <li>{I18n.swapToken.leftInfoTitle2_2}</li>
              <li className="dot space">{I18n.swapToken.leftInfoDesc2_1}</li>
            </ul>
          </div>
        </li>
        <li className="content">
          <span onClick={this.props.cancelSwap} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.swapToken.title}</h1>
          <h2>{I18n.swapToken.rightHeaderDesc2}</h2>
          <ValidationForm
            type="createWallet"
            initialName={''}
            ref={instance => { this.validationForm = instance; }}
            onSuccess={(walletName, pw) => this.onSuccess(walletName, pw)}
            {...this.props}
            handleSubmit={this.handleSubmit}
          />
          <div className="btn-holder">
            <button onClick={this.goBack} type="submit" className="btn-type-fill"><span>{I18n.button.back}</span></button>
            { loading ? <button type="submit" className="btn-type-normal load"><span><LoadingComponent type="black"/></span></button>
                      : <button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.next}</span></button>}
          </div>
        </li>
      </ul>
    );
  }
}

export default SwapToken3;
