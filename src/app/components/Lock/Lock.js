import React, { Component } from 'react';
import hash from 'hash.js'
import withLanguageProps from 'HOC/withLanguageProps';
import { HeaderContainer, FooterContainer } from 'app/containers/'

const INIT_STATE = {
  passcode: '',
}

@withLanguageProps
class Lock extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE
    this.disableInput = false
    document.body.classList.add('lock');
  }

  componentWillMount() {
    if (this.props.showChangePasscode) {
      this.disableInput = true
      this.props.openPopup({
        popupType: 'changePasscode'
      });
      this.props.setShowChangePasscodePopup(false);
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    window.chrome.extension.onMessage.addListener(this.listener)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.popupType === "changePasscode" && prevProps.popupType !== this.props.popupType) {
      this.disableInput = false
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.body.classList.remove('lock');
    window.chrome.extension.onMessage.removeListener(this.listener)
  }

  listener = ({ type, payload }) => {
    if (type === "UNLOCK_APP") {
      this.setState({
        passcode: payload
      }, () => {
        this.checkPasscode()
      })
    } else if (type === "CHECK_PASSCODE_FULFILLED") {
      const { getWallet, closePopup, setLockState } = this.props
      if (!payload) {
        window.loginChkFx(false)
        window.setTimeout(() => {
          this.setState({
            passcode: ''
          })
          this.disableInput = false
        }, 300)
        return
      }

      window.loginChkFx(true)
      getWallet()
      window.setTimeout(() => {
        closePopup()
        setLockState(false)
      }, 2000)
    }
  }

  checkPasscode = () => {
    this.disableInput = true
    window.chrome.runtime.sendMessage({ type: 'CHECK_PASSCODE', payload: this.state.passcode })
  }

  handleForgotButtonClick = () => {
    this.disableInput = true
    this.props.openPopup({
      popupType: 'changePasscode'
    });
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

  render() {
    const { I18n } = this.props;
    const { passcode } = this.state;

    return (
      <div className="lock-wrap">
        <div className="dimmed"></div>
        <HeaderContainer />
        <div className="content-holder">
          <div className="logo">
            <em className="_img"></em>
            <em className="_img"></em>
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
