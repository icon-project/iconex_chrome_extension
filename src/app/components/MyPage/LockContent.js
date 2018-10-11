import React, { Component } from 'react';
import hash from 'hash.js'
import { PasswordSetter, Alert } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class LockContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.passcodeHash === '' ? 0 : 1,
      current: '',
      currentError: undefined,
      first: '',
      firstError: undefined,
      second: '',
      secondError: undefined,
      showPasscodeSettingSuccess: false,
      showPasscodeChangingSuccess: false
    }
  }

  componentWillMount() {
  }

  clearError = () => {
    // this.setState({
    //   currentError: undefined,
    //   firstError: undefined,
    //   secondError: undefined
    // })
  }

  closeAlert = () => {
    this.setState({
      showPasscodeSettingSuccess: false,
      showPasscodeChangingSuccess: false
    })
  }

  validatePasscode = (changing) => {
    const { current, first, second } = this.state

    if (changing && current === '') {
      this.setState({currentError: 'currentPasscodeEnter'})
      return false
    }

    if (changing && current.length !== 6) {
      this.setState({currentError: 'passcodeSix'})
      return false
    }

    if (first === '') {
      this.setState({firstError: 'passcodeEnter'})
      return false
    }

    if (first.length !== 6) {
      this.setState({firstError: 'passcodeSix'})
      return false
    }

    if (second === '') {
      this.setState({secondError: 'passcodeEnter'})
      return false
    }

    if (second.length !== 6) {
      this.setState({secondError: 'passcodeSix'})
      return false
    }

    const currentHash = hash.sha256().update(current).digest('hex')
    if (changing && this.props.passcodeHash !== currentHash) {
      this.setState({currentError: 'currentPasscodeFail'})
      return false
    }

    const passcodeHash = hash.sha256().update(first).digest('hex')
    if (changing && passcodeHash === currentHash) {
      this.setState({firstError: 'currentPasscodeSame'})
      return false
    }

    if (first !== second) {
      this.setState({secondError: 'passcodeSame'})
      return false
    }

    return true
  }

  setValue = (valueObject, callback) => {
    const key = Object.keys(valueObject)[0]
    const value = valueObject[key]

    valueObject[`${key}Error`] = undefined

    if (value === '') {
      valueObject[`${key}Error`] = key !== 'current' ? 'passcodeEnter' : 'currentPasscodeEnter'
    } else if (value.length !== 6) {
      valueObject[`${key}Error`] = 'passcodeSix'
    }

    this.setState(valueObject, () => {
      const { status, first, second, current, firstError, secondError, currentError } = this.state;
      if (typeof callback === 'function') {
        callback()
      } else {
        if (status === 0) {
          if (first && second && !firstError && !secondError) this.validatePasscode(false);
        } else {
          if (first && second & current && !firstError && !secondError && !currentError) this.validatePasscode(true);
        }
      }
    })
  }

  goToChangingStatus = (status) => {
    this.setState({status: status})
  }

  changeToNewPasscode = () => {
    const result = this.validatePasscode(true)
    if (result) {
      const passcodeHash = hash.sha256().update(this.state.first).digest('hex')
      this.props.setLock(passcodeHash, '')
      window.chrome.tabs.getCurrent((tab) => {
        window.chrome.runtime.sendMessage({ type: 'REFRESH_LOCK_STATE', payload: tab.id });
      })
      this.setState({
        status: 1,
        current: '',
        currentError: undefined,
        first: '',
        firstError: undefined,
        second: '',
        secondError: undefined,
        showPasscodeChangingSuccess: true
      })
    }
  }

  unlock = () => {
    this.props.openPopup({
      popupType: 'unlockPopup'
    })
  }

  handleSettingSuccess = () => {
    const { first } = this.state
    this.props.setLock(hash.sha256().update(first).digest('hex'), '')

    this.setState({
      status: 1,
      current: '',
      currentError: undefined,
      first: '',
      firstError: undefined,
      second: '',
      secondError: undefined,
      showPasscodeSettingSuccess: false
    })

    window.chrome.tabs.getCurrent((tab) => {
      window.chrome.runtime.sendMessage({ type: 'REFRESH_LOCK_STATE', payload: tab.id });
    })
  }

  setNewPasscode = () => {
    const passcodeResult = this.validatePasscode(false)
    if (!passcodeResult) {
      return
    }

    this.setState({
      showPasscodeSettingSuccess: true
    })
  }

  render() {
    const { status, showPasscodeSettingSuccess, showPasscodeChangingSuccess } = this.state
    const { I18n } = this.props;

    return (
      <div>
        <div className="wrap-holder">
          <PasswordSetter {...this.props}
                          {...this.state}
                          status={status}
                          setValue={this.setValue}
                          clearError={this.clearError}
                          goToChangingStatus={this.goToChangingStatus}
                          setNewPasscode={this.setNewPasscode}
                          changeToNewPasscode={this.changeToNewPasscode}
          />
          {status === 0 &&
          <div className="btn-holder in">
  					<button className="btn-type-fill2" onClick={this.setNewPasscode}><span>{I18n.button.submit}</span></button>
  				</div>
          }
          {status === 2 &&
          <div className="btn-holder in">
  					<button className="btn-type-fill2" onClick={this.changeToNewPasscode}><span>{I18n.button.change}</span></button>
  				</div>
          }
  			</div>
        {((this.props.passcodeHash !== '' && status === 1)) &&
          <div className="txt-holder">
            <p className="lock-txt">{I18n.myPageUnlock}<em onClick={this.unlock}>{I18n.button.unlock}</em></p>
          </div>
        }
        { showPasscodeSettingSuccess && (
          <Alert
            handleSubmit={this.handleSettingSuccess}
            handleCancel={this.closeAlert}
            text={I18n.myPageLockSuccess}
            submitText={I18n.button.confirm}
            cancelText={I18n.button.cancel}
          />
        )}
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

export default LockContent;
