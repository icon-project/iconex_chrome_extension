import React, { Component } from 'react';
import { ValidationForm, Alert } from 'app/components/';
import { check0xPrefix, generateIconexObject } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  showAlertImportSuccess: false,
}

@withLanguageProps
class ImportWallet5 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.closePopup();
  }

  handleSubmit = () => {
    if (!this.props.loading) {
      this.validationForm.validateForm(['walletName'], 'submit');
    }
  }

  createWallet = (walletName) => {
    const { v3Obj, wallets, loading } = this.props;
    const type = v3Obj.coinType || 'eth';
    const key = type === 'icx' ? v3Obj.address : check0xPrefix(v3Obj.address)
    const iconexObj = generateIconexObject(key, type, walletName, JSON.stringify(v3Obj));

    if (!loading) {
      this.props.createWallet(iconexObj);
      this.setState({
        showAlertImportSuccess: true
      })
    }
  }

  logIn = () => {
    this.props.logIn();
  }

  render() {
    const { showAlertImportSuccess } = this.state;
    const { I18n } = this.props;
    return (
      <div>
        <div className="header">
          <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.importWallet.title}</h1>
          <h2>{I18n.importWallet.desc5}</h2>
        </div>
        <ValidationForm
          type="importWallet_file"
          initialName={''}
          ref={instance => { this.validationForm = instance; }}
          onSuccess={(walletName, pw) => this.createWallet(walletName)}
          {...this.props}
          handleSubmit={this.handleSubmit}
        />
        <div className="btn-holder">
          <button onClick={this.handleSubmit} type="submit" className="btn-type-next size-full"><span>{I18n.button.import}</span></button>
        </div>
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
