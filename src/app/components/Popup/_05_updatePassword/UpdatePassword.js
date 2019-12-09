/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react';
import { ValidationForm, LoadingComponent, Alert } from 'app/components/'
import Worker from 'workers/wallet.worker.js';

import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  curPw: '',
  curPwError: '',
  newV3: {},
  loading: false,
  isFail: false
}

@withLanguageProps
class UpdatePassword extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      const { I18n } = this.props;
      if (!m.data) {
        this.setState({
          loading: false,
          curPwError: I18n.error.pwConfirmError,
          newV3: {},
          isFail: true
        }, () => {
          this.validationForm.validateForm(['pw', 'pwConfirm'], 'submit');
        })
      } else {
        this.setState({
          loading: false,
          newV3: m.data,
          isFail: false
        }, () => {
          this.validationForm.validateForm(['pw', 'pwConfirm'], 'submit');
        });
      }
    }
  }

  changeCurPw = (e) => {
    this.setState({
      curPw: e.target.value
    })
  }

  validateCurPwFormOnBlur = (e) => {
    let pwError = this.state.curPwError;
    if (!this.state.curPw) {
      const { I18n } = this.props;
      pwError = I18n.error.pwErrorEnter
      this.setState({
        curPwError: pwError
      });
    } else {
      this.setState({
        curPwError: ''
      });
    }
  }

  validateCurPwForm = (e) => {
    const { wallets, selectedAccount } = this.props;
    console.log(this.validationForm.getPassword())
    this.setState({
      loading: true
    }, () => {
      this.worker.postMessage({
        coinType: wallets[selectedAccount].type,
        priv: wallets[selectedAccount].priv,
        curPw: this.state.curPw,
        newPw: this.validationForm.getPassword(),
        type: 'updatePassword'
      });
    })
  }

  closePopup = () => {
    this.worker.terminate();
    this.setState(INIT_STATE);
    this.props.closePopup();
    this.props.resetSelectedWallet();
  }

  handleSubmit = () => {
    if (!this.state.curPw) {
      this.validateCurPwFormOnBlur();
      return false;
    }
    this.validateCurPwForm();
  }

  handleSuccess = (newPw) => {
    if (!this.state.isFail) {
      this.setState({
        showAlertChanged: true
      });
      this.props.updatePassword(this.props.selectedAccount, this.state.newV3);
    }
  }

  logIn = () => {
    this.props.logIn()
    this.props.resetSelectedWallet();
  }

  render() {
    const {
      curPw,
      curPwError,
      loading,
      showAlertChanged
    } = this.state;

    const { I18n } = this.props;

    return (
      <div>
        <div className="dimmed fade-in"></div>
        <div className="popup moving-down">
          <h1 className="title">{I18n.updatePassword.title}</h1>
          <h2>{I18n.updatePassword.desc}</h2>
          <div className="scroll-holder">
            <div className="scroll">
              <div className="tabbox-holder">
                <div className="name-group">
                  <p className="title">{I18n.updatePassword.inputLabel1}</p>
                  <input onChange={this.changeCurPw} onBlur={this.validateCurPwFormOnBlur} type="password" className={`txt-type-normal ${curPwError && 'error'}`} placeholder={I18n.updatePassword.inputPlaceHolder1} value={curPw} />
                  <p className='error'>{curPwError}</p>
                </div>
                <ValidationForm
                  type="updatePassword"
                  ref={instance => { this.validationForm = instance; }}
                  onSuccess={(newPw) => { this.handleSuccess(newPw); }}
                  onlyPwGroup={true}
                  {...this.props}
                  handleSubmit={this.handleSubmit}
                  isLoading={loading}
                />
              </div>
              <div className="message-holder">
                <ul>
                  <li>{I18n.updatePassword.infoBoxTitle}</li>
                  <li>{I18n.updatePassword.infoBoxDesc1}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="btn-holder full">
            <button onClick={this.closePopup} className="btn-type-fill size-half"><span>{I18n.button.cancel}</span></button>
            {loading ? (<button type="submit" className={'btn-type-normal size-half load'}><span><LoadingComponent type="black" /></span></button>)
              : (<button onClick={this.handleSubmit} type="submit" className={'btn-type-normal size-half'}><span>{I18n.button.change}</span></button>)}
          </div>
        </div>
        {
          showAlertChanged && (
            <Alert
              handleSubmit={this.logIn}
              text={I18n.updatePassword.changed}
              submitText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

export default UpdatePassword;
