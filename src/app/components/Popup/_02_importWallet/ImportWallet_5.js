import React, { Component } from 'react';
import { ValidationForm, Alert } from 'app/components/';
import { check0xPrefix, generateIconexObject } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  showAlertImportSuccess: false,
  showAlertAccountSame: false
}

@withLanguageProps
class ImportWallet5 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.togglePopup();
  }

  handleSubmit = () => {
    if(!this.props.loading) {
      this.validationForm.validateForm(['walletName'], 'submit');
    }
  }

  createWallet = (walletName) => {
    const { v3Obj, wallets, loading } = this.props;
    const type = v3Obj.coinType || 'eth';
    const key = type === 'icx' ? v3Obj.address : check0xPrefix(v3Obj.address)

    // check whether wallet already exists
    if (wallets[key]) {
      this.setState({
        showAlertAccountSame: true
      })
      return;
    }

    const iconexObj = generateIconexObject(key, type, walletName, JSON.stringify(v3Obj));

    if(!loading) {
      this.props.createWallet(iconexObj);
      this.setState({
        showAlertImportSuccess: true
      })
    }
  }

  logIn = () => {
    this.props.logIn();
  }

  closeAlert = () => {
    this.setState({
      showAlertAccountSame: false
    })
  }

  render() {
    const { showAlertImportSuccess, showAlertAccountSame } = this.state;
    const { I18n } = this.props;
    return (
      <div>
          <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.importWallet.title}</h1>
          <h2>{I18n.importWallet.desc5}</h2>
          <ValidationForm
            type="importWallet_file"
            initialName={''}
            ref={instance => { this.validationForm = instance; }}
            onSuccess={(walletName, pw) => this.createWallet(walletName)}
            {...this.props}
            handleSubmit={this.handleSubmit}
            />
          <div className="btn-holder">
            <button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.import}</span></button>
          </div>
          {
            showAlertAccountSame && (
              <Alert
                handleCancel={this.closeAlert}
                text={I18n.error.alertAccountSame}
                cancelText={I18n.button.confirm}
              />
            )
          }
          {
            showAlertImportSuccess && (
              <Alert
                handleSubmit={this.logIn}
                text={I18n.importWallet.importSuccessAlert}
                submitText={I18n.button.confirm}
              />
            )
          }
      </div>
    );
  }
}

export default ImportWallet5;
