import React, { Component } from 'react';
import { NewPasscodeInput, Alert } from 'app/components/'
import hash from 'hash.js'

import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class ChangePasscode2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      second: '',
      firstError: undefined,
      secondError: undefined,
      showPasscodeChangingSuccess: false
    }
  }

  closePopup = () => {
    this.props.closePopup();
  }

  clearError = () => {
    this.setState({
      firstError: undefined,
      secondError: undefined
    })
  }

  setValue = (valueObject) => {
    const { I18n } = this.props;
    const key = Object.keys(valueObject)[0]
    const value = valueObject[key]

    valueObject[`${key}Error`] = undefined

    if (value === '') {
      valueObject[`${key}Error`] = I18n.error.passcodeEnter
    } else if (value.length !== 6) {
      valueObject[`${key}Error`] = I18n.error.passcodeSix
    }

    this.setState(valueObject, () => {
      const { first, second, firstError, secondError } = this.state;
      if (first && second && !firstError && !secondError) this.validatePasscode();
    })
  }

  validatePasscode = () => {
    const { first, second } = this.state
    const { I18n } = this.props;

    if (first === '') {
      this.setState({firstError: I18n.error.passcodeEnter})
      return false
    }
    if (first.length !== 6) {
      this.setState({firstError: I18n.error.passcodeSix})
      return false
    }
    if (second === '') {
      this.setState({secondError: I18n.error.passcodeEnter})
      return false
    }
    if (second.length !== 6) {
      this.setState({secondError: I18n.error.passcodeSix})
      return false
    }
    const newPasscodeHash = hash.sha256().update(first).digest('hex')
    if (this.props.passcodeHash === newPasscodeHash) {
      this.setState({firstError: I18n.error.currentPasscodeSame})
      return false
    }
    if (first !== second) {
      this.setState({secondError: I18n.error.passcodeSame})
      return false
    }
    return true;
  }

  changePasscode = () => {
    const result = this.validatePasscode();
    if (result) {
      const passcodeHash = hash.sha256().update(this.state.first).digest('hex')
      this.props.setLock(passcodeHash)
      this.setState({
        showPasscodeChangingSuccess: true
      });
    }
  }

  closeAlert = () => {
    this.closePopup();
  }

  render() {
    const { showPasscodeChangingSuccess } = this.state;
    const { I18n } = this.props;
    return (
      <div className="popup-wrap">
        <div className="dimmed"></div>
        <div className="popup">
          <span className="close" onClick={this.closePopup}><em className="_img"></em></span>
          <h1 className="title">{I18n.changePasscode.title}</h1>
          <h2>{I18n.changePasscode.desc2}</h2>
          <div className="scroll-holder">
    				<div className="scroll">
              <div className="tabbox-holder">
                <NewPasscodeInput
                  clearError={this.clearError}
                  divClassName="name-group"
                  title={I18n.changePasscode.inputLabel1}
                  placeholder={I18n.changePasscode.inputPlaceHolder2}
                  error={this.state.firstError}
                  setInputValue={(value)=>{this.setValue({first: value})}}
                />
                <NewPasscodeInput
                  clearError={this.clearError}
                  divClassName="pw-group"
                  title={I18n.changePasscode.inputLabel2}
                  placeholder={I18n.changePasscode.inputPlaceHolder2}
                  error={this.state.secondError}
                  setInputValue={(value)=>{this.setValue({second: value})}}
                />
              </div>
            </div>
          </div>
          <div className="btn-holder">
            <button type="submit" className="btn-type-normal" onClick={this.changePasscode}><span>{I18n.button.reset}</span></button>
          </div>
        </div>
        { showPasscodeChangingSuccess && (
          <Alert
            handleSubmit={this.closeAlert}
            text={I18n.myPageLockChangeSuccess}
            submitText={I18n.button.confirm}
          />
        )}
      </div>
    );
  }
}

export default ChangePasscode2;
