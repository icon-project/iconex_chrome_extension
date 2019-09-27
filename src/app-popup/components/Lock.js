import React, { Component } from 'react';
import hash from 'hash.js'
import { openApp } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';
import logo from 'app-popup/image/preview/logo.svg'

const INIT_STATE = {
  passcode: '',
  error: ''
}

@withLanguageProps
class Lock extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE
    this.disableInput = false
    document.body.classList.add('lock');
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.body.classList.remove('lock');
  }

  handleKeyDown = (e) => {
    const { passcode } = this.state;

    if (!this.disableInput) {
      if (!isNaN(e.key)) {
        const inputPasscode = `${passcode}${e.key}`;
        this.setState({
          passcode: inputPasscode
        }, () => {
          if (inputPasscode.length > 5) {
            this.checkPasscode()
          }
        })
      }

      if (e.key === "Backspace") {
        this.setState({
          passcode: passcode.slice(0, passcode.length - 1)
        })
      }
    }
  }

  checkPasscode = () => {
    const { passcodeHash, setLockState } = this.props
    const { passcode } = this.state

    this.disableInput = true
    if (passcodeHash !== hash.sha256().update(passcode).digest('hex')) {
      window.loginChkFx(false)
      window.chrome.extension.sendMessage({ type: 'UNLOCK_APP', payload: passcode })
      window.setTimeout(() => {
        this.setState({
          passcode: ''
        })
        this.disableInput = false
      }, 300)
      return
    }

    window.loginChkFx(true)
    window.chrome.extension.sendMessage({ type: 'UNLOCK_APP', payload: passcode })
    window.setTimeout(() => {
      window.chrome.extension.sendMessage({ type: 'UNLOCK', })
      setLockState(false)
    }, 2000)
  }

  handleForgotButtonClick = () => {
    this.props.setShowChangePasscodePopup(true);
    openApp();
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.checkPasscode();
    }
  }

  render() {
    const { I18n } = this.props;
    const { passcode } = this.state;
    return (
      <div className="lock-wrap">
        <div className="content-holder">
          <div className="logo">
            <i className="_img"></i>
            <i className="_img"></i>
          </div>
          <div className="pw-group">
            <p>{I18n.lockPageInputPlaceholder}</p>
            <ul id={passcode.length === 0 ? 'empty' : ''}>
              {
                Array(6).fill(0).map((_, i) => (
                  <li key={i} className={i === passcode.length - 1 ? 'on' : ''}><span></span></li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="footer-wrap">
          <p className="forget" onClick={this.handleForgotButtonClick}>{I18n.lockPageInputForget}</p>
        </div>
      </div>
    );
  }
}

export default Lock;
