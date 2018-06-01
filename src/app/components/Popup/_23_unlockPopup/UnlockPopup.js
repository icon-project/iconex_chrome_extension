import React, { Component } from 'react';
import { routeConstants as ROUTE } from 'constants/index';
import { Alert } from 'app/components/'
import hash from 'hash.js'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  passcode: '',
  passcodeError: '',
  showAlertSuccess: false
}

@withLanguageProps
class UnlockPopup extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE
  }

  closePopup = () => {
    this.props.togglePopup();
  }

  handleSubmit = () => {
    const { I18n } = this.props;
    const { passcode } = this.state
    if (!passcode) {
      this.setState({ passcodeError: I18n.error.passcodeEnter })
      return false;
    }

    const passcodeHash = hash.sha256().update(passcode).digest('hex')
    if (passcodeHash !== this.props.passcodeHash) {
      this.setState({ passcodeError: I18n.error.currentPasscodeFail })
      return
    }

    this.props.setLock('', '')

    this.setState({
      showAlertSuccess: true
    })
  }

  handleInput = (e) => {
    const value = e.target.value
    if (isNaN(value) || value.length > 6) {
      return
    }
    this.setState({
      passcode: value,
      passcodeError: ''
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  closeAlert = () => {
    this.props.togglePopup();
    this.props.history.push(ROUTE['mywallet']);
  }

  render() {
    const { passcode, passcodeError, showAlertSuccess } = this.state
    const { I18n } = this.props;
    return (
      <div>
        <div className="dimmed"></div>
        <div className="popup size-medium2">
          <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.unlockPopup.title}</h1>
          <h2>{I18n.unlockPopup.desc}</h2>
          <div className="scroll-holder">
            <div className="scroll">
              <div className="tabbox-holder">
                <div>
                  <p className="title">{I18n.unlockPopup.subTitle}</p>
                  <input onChange={this.handleInput} type="password" className="txt-type-normal" placeholder={I18n.unlockPopup.placeholder} value={passcode} onKeyPress={this.handleKeyPress} />
                  {passcodeError && <p className="error">{passcodeError}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="btn-holder">
            <button onClick={this.handleSubmit} type="submit" className={'btn-type-normal'}><span>{I18n.button.confirm}</span></button>
          </div>
        </div>
        {
          showAlertSuccess && (
            <Alert
              handleSubmit={this.closeAlert}
              text={I18n.unlockPopup.success}
              submitText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

export default UnlockPopup;
