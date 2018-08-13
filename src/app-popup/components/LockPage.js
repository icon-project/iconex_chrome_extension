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
class LockPage extends Component {
  constructor(props) {
    super(props);

    this.state = INIT_STATE
  }

  componentDidMount() {
    this.passwordInput.focus();
  }

  handleChange = (e) => {
    let value = e.target.value
    if (isNaN(value) || value.length > 6) {
      return
    }
    this.setState({
      passcode: value,
      error: ''
    })
  }

  checkPasscode = () => {
    const {passcode} = this.state
    if (passcode === '') {
      this.setState({error: 'lockPasscode'})
      return
    }

    const {passcodeHash} = this.props
    if (passcodeHash !== hash.sha256().update(this.state.passcode).digest('hex')) {
      this.setState({error: 'lockPasscodeExactly'})
      return
    }
    window.chrome.extension.sendMessage({ type: 'UNLOCK' })
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
    return (
      <div>
        <div className="wrap home">
          <div className='content-wrap lock'>
      			<div className="content-holder">
      				<div className="logo"><img src={logo} alt="logo" /></div>
      				<div className="pw-group">
      					<input type="password" className="txt-type-normal _img" placeholder={I18n.lockPageInputPlaceholder}
                  value={this.state.passcode}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  ref={(input) => { this.passwordInput = input; }}
                />
      					{this.state.error !== '' && <p className="error"><em className="_img"></em>{I18n.error[this.state.error]}</p>}
      				</div>
              <div className="guide-holder">
      				    <p className="forget" onClick={this.handleForgotButtonClick}>{I18n.lockPageInputForget}</p>
              </div>
      			</div>
          </div>
        </div>
        <div onClick={this.checkPasscode} className="footer home">
          <p>{I18n.button.confirm}</p>
        </div>
      </div>
    );
  }
}

export default LockPage;
