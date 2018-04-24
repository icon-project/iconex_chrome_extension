/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react';
import { ValidationForm, LoadingComponent, Alert } from 'components/'
import Worker from 'workers/wallet.worker.js';

import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  curPw: '',
  curPwError: '',
  loading: false
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
          curPwError: I18n.error.pwConfirmError
        })
      } else {
        this.setState({
          loading: false,
          showAlertChanged: true
        }, () => {
          props.updatePassword(props.selectedAccount, m.data);
        });
      }
    }
  }

  changeCurPw = (e) => {
    this.setState({
      curPw: e.target.value
    })
  }

  validateCurPwForm = (e) => {
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

  closePopup = () => {
    this.worker.terminate();
    this.setState(INIT_STATE);
    this.props.initPopupState();
  }

  handleSubmit = () => {
    if (!this.state.curPw) {
      this.validateCurPwForm();
      return false;
    }
    this.validationForm.validateForm(['pw', 'pwConfirm'], 'submit');
  }

  handleSuccess = (newPw) => {
    const { wallets, selectedAccount } = this.props;
    this.setState({
      loading: true
    }, () => {
      this.worker.postMessage({
        coinType: wallets[selectedAccount].type,
        priv: wallets[selectedAccount].priv,
        curPw: this.state.curPw,
        newPw: newPw,
        type: 'updatePassword'
      });
    })
  }

  logIn = () => {
    this.props.logIn()
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
        <div className="dimmed"></div>
        <div className="popup">
          <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.updatePassword.title}</h1>
          <h2>{I18n.updatePassword.desc}</h2>
          <div className="scroll-holder">
    				<div className="scroll">
              <div className="tabbox-holder">
                <div className="name-group">
                  <p className="title">{I18n.updatePassword.inputLabel1}</p>
                  <input onChange={this.changeCurPw} onBlur={this.validateCurPwForm} type="password" className={`txt-type-normal ${curPwError && 'error'}`} placeholder={I18n.updatePassword.inputPlaceHolder1} value={curPw} />
                  <p className='error'>{curPwError}</p>
                </div>
                <ValidationForm
                  type="updatePassword"
                  ref={instance => { this.validationForm = instance; }}
                  onSuccess={(newPw) => { this.handleSuccess(newPw); }}
                  onlyPwGroup={true}
                  {...this.props}
                  handleSubmit={this.handleSubmit}
                />
              </div>
              <div className="message-holder">
                <i className="_img"></i>
                {I18n.updatePassword.infoBoxTitle}
              </div>
              <div className="message-holder line">
                <ul>
                  <li>{I18n.updatePassword.infoBoxDesc1}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="btn-holder">
            { loading ? (<button type="submit" className={'btn-type-normal load'}><span><LoadingComponent type="black" /></span></button>)
                      : (<button onClick={this.handleSubmit} type="submit" className={'btn-type-normal'}><span>{I18n.button.change}</span></button>)}
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
