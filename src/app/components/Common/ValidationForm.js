/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { charFreq, isWalletNameExists, isValidWalletName } from 'utils';

const INIT_STATE = {
  walletNameError: '',

  pw: '',
  pwError: '',
  togglePw: 'on',

  pwConfirm: '',
  pwConfirmError: '',
  togglePwConfirm: 'on',
}

class ValidationForm extends Component {

  constructor(props) {
    super(props);
    const { I18n } = this.props;
    this.state = Object.assign({}, INIT_STATE, {
      walletName: this.props.initialName ? this.props.initialName : '',
      pwDivClass: this.props.type === 'updatePassword' ? 'pw-new' : '',
      isWalletNameFormExist: this.props.type === 'createWallet' || this.props.type === 'importWallet_file' || this.props.type === 'importWallet_privKey' ? true : false,
      isPasswordFormExist: this.props.type === 'importWallet_file' ? false : true,
      passwordLabel: this.props.type === 'updatePassword' ? I18n.validationForm.newPassword :
        this.props.type === 'exportWallet' ? I18n.validationForm.bundlePassword : I18n.validationForm.walletPassword
    });
  }

  changeInput = (e) => {
    const target = e.target.name
    const { value } = e.target
    if (target === 'walletName' && !isValidWalletName(value)) return
    if ((target === 'pw' || target === 'pwConfirm') && !(/^[a-zA-Z0-9?!:\.,%+-/*<>{}\(\)\[\]`"'~_^\\|@#$&]*$/.test(e.target.value))) return
    this.setState({
      [target]: value
    })
  }

  toggleInput = (e) => {
    const target = e.target.getAttribute('data-name')
    let value = '';
    if (this.state[target] === '') {
      value = 'on'
    } else {
      value = ''
    }
    this.setState({
      [target]: value
    })
  }

  handleSuccess = () => {
    const walletNameTrim = this.state.walletName.trim()
    switch (this.props.type) {
      case 'createWallet':
        this.props.onSuccess(walletNameTrim, this.state.pw);
        break;
      case 'importWallet_file':
        this.props.onSuccess(walletNameTrim);
        break;
      case 'importWallet_privKey':
        this.props.onSuccess(walletNameTrim, this.state.pw);
        break;
      case 'exportWallet':
        this.props.onSuccess(this.state.pw);
        break;
      case 'updatePassword':
        this.props.onSuccess(this.state.pw);
        break;
      default:
        break;
    }
  }

  validateForm = (e, state = "") => {

    const target = Array.isArray(e) ? e : [e.target.name];
    let haveThreeSameCharacter = false;
    let walletNameError = this.state.walletNameError;
    let pwError = this.state.pwError;
    let pwConfirmError = this.state.pwConfirmError;

    const { I18n } = this.props;

    for (let i = 0; i < target.length; i++) {
      switch (target[i]) {
        case 'walletName':
          if (!this.state.walletName) {
            walletNameError = I18n.error.alertWalletName
            break;
          } else if (this.state.walletName.indexOf(' ') >= 0 && !this.state.walletName.trim()) {
            walletNameError = I18n.error.pwErrorEmpty
            break;
          } else if (isWalletNameExists(this.props.wallets, this.state.walletName.trim())) {
            walletNameError = I18n.error.alertWalletNameSame
            break;
          } else {
            walletNameError = ''
            break;
          }
        case 'pw':
          const counter = charFreq(this.state.pw);
          for (let key in counter) {
            if (counter[key] >= 3) {
              haveThreeSameCharacter = true;
            }
          }

          if (!this.state.pw) {
            pwError = I18n.error.pwErrorEnter
            break;
          } else if (this.state.pw.indexOf(' ') >= 0) {
            pwError = I18n.error.pwErrorEmpty
            break;
          } else if (this.state.pw.length < 8) {
            pwError = I18n.error.pwErrorEight
            break;
          } else if (!(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[?!:\.,%+-/*<>{}\(\)\[\]`"'~_^\\|@#$&]).{8,}$/.test(this.state.pw))) {
            pwError = I18n.error.pwErrorMix
            break;
          } else if ((/(.)\1\1/.test(this.state.pw))) {
            pwError = I18n.error.pwErrorSame
            break;
          } else {
            pwError = ''
            break;
          }
        case 'pwConfirm':
          if (!this.state.pwConfirm) {
            pwConfirmError = I18n.error.pwConfirmError
            break;
          } else if (this.state.pw !== this.state.pwConfirm) {
            pwConfirmError = I18n.error.pwConfirmErrorSame
            break;
          } else {
            pwConfirmError = ''
            break;
          }
        default:
          break;
      }
    }

    this.setState({
      walletNameError: walletNameError,
      pwError: pwError,
      pwConfirmError: pwConfirmError
    }, () => {
      if (state === 'submit' && !(walletNameError || pwError || pwConfirmError)) {
        this.handleSuccess();
      }
    });
  }

  getPassword = () => {
    return this.state.pw
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const { handleSubmit } = this.props
      if (typeof handleSubmit === 'function') {
        handleSubmit()
      }
    }
  }

  handlePaste = e => {
    e.preventDefault();
  }

  render() {
    const {
      walletName,
      walletNameError,
      pw,
      pwError,
      togglePw,
      pwConfirm,
      pwConfirmError,
      togglePwConfirm,

      pwDivClass,
      isWalletNameFormExist,
      passwordLabel,
      isPasswordFormExist
    } = this.state;

    const { I18n } = this.props;
    const content = (_onlyPwGroup) => {
      if (_onlyPwGroup) {
        const style = typeof _onlyPwGroup ? _onlyPwGroup : ''
        return (
          <div className={`pw-group ${style}`}>
            <p className="title">{passwordLabel}</p>
            <input onChange={this.changeInput} onBlur={this.validateForm} onKeyPress={this.handleKeyPress} type={togglePw === 'on' ? 'password' : 'text'} className={`txt-type-normal ${pwError && 'error'}`} name="pw" placeholder={I18n.validationForm.inputPlaceHolder1} value={pw} />
            <p onClick={(e) => this.toggleInput(e)} className="btn"><em data-name="togglePw" className={`_img ${togglePw}`}></em></p>
            <p className='error'>{pwError}</p>
            <input onChange={this.changeInput} onBlur={this.validateForm} onKeyPress={this.handleKeyPress} type={togglePwConfirm === 'on' ? 'password' : 'text'} className={`txt-type-normal gap ${pwConfirmError && 'error'}`} name="pwConfirm" placeholder={I18n.validationForm.inputPlaceHolder2} value={pwConfirm} />
            <p onClick={(e) => this.toggleInput(e)} className="btn"><em data-name="togglePwConfirm" className={`_img ${togglePwConfirm}`}></em></p>
            <p className='error'>{pwConfirmError}</p>
          </div>
        )
      }
      else {
        return (
          <div className="scroll-holder">
            <div className="scroll">
              <div className={`${pwDivClass} tabbox-holder`}>
                {isWalletNameFormExist && (
                  <div className="name-group">
                    <p className="title">{I18n.validationForm.walletNameLabel}</p>
                    <input 
                      onChange={this.changeInput} 
                      onBlur={this.validateForm} 
                      onPaste={this.handlePaste}
                      onKeyPress={this.handleKeyPress} 
                      name="walletName" 
                      type="text" 
                      className={`txt-type-normal 
                      ${walletNameError && 'error'}`} 
                      placeholder={I18n.validationForm.walletNamePlaceHolder} 
                      value={walletName} 
                      spellCheck="false" />
                    <p className='error'>{walletNameError}</p>
                  </div>
                )}
                {
                  isPasswordFormExist && (
                    <div className="pw-group">
                      <p className="title">{passwordLabel}</p>
                      <input onChange={this.changeInput} onBlur={this.validateForm} onKeyPress={this.handleKeyPress} type={togglePw === 'on' ? 'password' : 'text'} className={`txt-type-normal ${pwError && 'error'}`} name="pw" placeholder={I18n.validationForm.inputPlaceHolder1} value={pw} />
                      <p onClick={(e) => this.toggleInput(e)} className="btn"><em data-name="togglePw" className={`_img ${togglePw}`}></em></p>
                      <p className='error'>{pwError}</p>
                      <input onChange={this.changeInput} onBlur={this.validateForm} onKeyPress={this.handleKeyPress} type={togglePwConfirm === 'on' ? 'password' : 'text'} className={`txt-type-normal gap ${pwConfirmError && 'error'}`} name="pwConfirm" placeholder={I18n.validationForm.inputPlaceHolder2} value={pwConfirm} />
                      <p onClick={(e) => this.toggleInput(e)} className="btn"><em data-name="togglePwConfirm" className={`_img ${togglePwConfirm}`}></em></p>
                      <p className='error'>{pwConfirmError}</p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    }

    return (
      content(this.props.onlyPwGroup)
    );
  }
}

export default ValidationForm;
