import React, { Component } from 'react';
import { ValidationForm, Alert } from 'app/components/';
import { nToBr } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  showAlertCancelCreateWallet: false
}

@withLanguageProps
class CreateWallet2 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.walletObj !== nextProps.walletObj && nextProps.walletObj) {
      nextProps.setPopupNum(3);
    }
  }

  handleSubmit = () => {
    if(!this.props.loading) {
      this.validationForm.validateForm(['walletName', 'pw', 'pwConfirm'], 'submit');
    }
  }

  goBack = () => {
    this.setState(INIT_STATE, () => {
      this.props.setWalletName('');
      this.props.setPopupNum(1);
    });
  }

  handleCloseButton = () => {
    this.setState({
      showAlertCancelCreateWallet: true
    })
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.logIn();
  }

  closeAlert = () => {
    this.setState({
      showAlertCancelCreateWallet: false
    })
  }

  render() {
    const { showAlertCancelCreateWallet } = this.state;
    const { coinType, I18n } = this.props;
    return (
      <ul className="layout">
        <li className="step">
          <div className="tab-holder">
            <h1 className="title">Step 2</h1>
            <span className="img"><em className="_img step2"></em></span>
            <ul>
              <li>{I18n.createWallet.step1}</li>
              <li className="on">{I18n.createWallet.step2}</li>
              <li>{I18n.createWallet.step3}</li>
              <li>{nToBr(I18n.createWallet.step4)}</li>
            </ul>
          </div>
          <div className="info">
            <ul>
              <li>{I18n.createWallet.leftInfoTitle2_1}</li>
              <li>{I18n.createWallet.leftInfoTitle2_2}</li>
              <li className="dot space">{I18n.createWallet.leftInfoDesc2_1}</li>
            </ul>
          </div>
        </li>
        <li className="content">
          <span onClick={this.handleCloseButton} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.createWallet.title}</h1>
          <h2>{I18n.createWallet.desc2}</h2>
          <ValidationForm
            type="createWallet"
            initialName={""}
            ref={instance => { this.validationForm = instance; }}
            onSuccess={(walletName, pw) => this.props.generateWallet(walletName, pw, coinType)}
            {...this.props}
            handleSubmit={this.handleSubmit}
            />
          <div className="btn-holder">
            <button onClick={this.goBack} type="submit" className="btn-type-fill"><span>{I18n.button.back}</span></button>
            <button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.next}</span></button>
          </div>
        </li>
        {
          showAlertCancelCreateWallet && (
            <Alert
              handleCancel={this.closeAlert}
              handleSubmit={this.closePopup}
              text={I18n.createWallet.cancelCreateWallet}
              cancelText={I18n.button.no}
              submitText={I18n.button.yes}
              btnButtom={true}
            />
          )
        }
      </ul>
    );
  }
}

export default CreateWallet2;
