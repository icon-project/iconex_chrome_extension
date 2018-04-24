import React, { Component } from 'react';
import { ValidationForm, LoadingComponent, Alert } from 'components/';
import { check0xPrefix } from 'utils';
import Worker from 'workers/wallet.worker.js';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  buttonLoading: false,
  showAlertImportFail: false,
  showAlertImportSuccess: false,
  showAlertAccountSame: false
}

@withLanguageProps
class ImportWallet4 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      if (!m.data) {
        this.setState({
          buttonLoading: !this.state.buttonLoading,
          showAlertImportFail: true
        })
      }
      else {
        const { iconexObj } = m.data;
        if(!this.props.loading) {
          this.props.createWallet(iconexObj);
          this.setState({
            showAlertImportSuccess: true
          })
        }
      }
    }
  }

  closePopup = () => {
    this.worker.terminate();
    this.setState(INIT_STATE);
    this.props.togglePopup();
  }

  handleSubmit = () => {
    if(!this.props.loading) {
      this.validationForm.validateForm(['walletName', 'pw', 'pwConfirm'], 'submit');
    }
  }

  createWallet = (walletName, pw) => {
    const { coinType, walletObj, wallets } = this.props;
    const key = coinType === 'icx' ? walletObj.getAddressIcx().toString('hex') : check0xPrefix(walletObj.getAddress().toString('hex'))

    // check whether wallet already exists
    if (wallets[key]) {
      this.setState({
        showAlertAccountSame: true
      });
      return;
    }

    this.worker.postMessage({
      walletName: walletName,
      privKey: walletObj._privKey,
      pw: pw,
      type: 'importWallet_4',
      coinType: coinType
    });

    this.setState({
      buttonLoading: !this.state.buttonLoading
    });
  }

  logIn = () => {
    this.props.logIn();
  }

  closeAlert = () => {
    this.setState({
      showAlertImportFail: false,
      showAlertAccountSame: false
    })
  }

  render() {
    const { buttonLoading, showAlertAccountSame, showAlertImportFail, showAlertImportSuccess } = this.state;
    const { I18n } = this.props;
    return (
      <div>
          <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.importWallet.title}</h1>
          <h2>{I18n.importWallet.desc4}</h2>
          <ValidationForm
            type="importWallet_privKey"
            initialName={''}
            ref={instance => { this.validationForm = instance; }}
            onSuccess={(walletName, pw) => this.createWallet(walletName, pw)}
            {...this.props}
            handleSubmit={this.handleSubmit}
            />
          <div className="btn-holder">
            { buttonLoading ? (<button type="submit" className="btn-type-normal load"><span><LoadingComponent type="black" /></span></button>)
                      : (<button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.import}</span></button>)}
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
            showAlertImportFail && (
              <Alert
                handleCancel={this.closeAlert}
                text={I18n.importWallet.importFailAlert}
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

export default ImportWallet4;
