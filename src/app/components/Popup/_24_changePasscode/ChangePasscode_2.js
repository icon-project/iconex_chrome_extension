import React, { Component } from 'react';
import { NewPasscodeInput } from 'app/components/'
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
    this.setState(valueObject)
  }

  changePasscode = () => {
    const { first, second } = this.state
    const { I18n } = this.props;

    if (first === '') {
      this.setState({firstError: I18n.error.passcodeEnter})
      return
    }
    if (second === '') {
      this.setState({secondError: I18n.error.passcodeEnter})
      return
    }
    if (first.length !== 6) {
      this.setState({firstError: I18n.error.passcodeSix})
      return
    }
    if (first !== second) {
      this.setState({secondError: I18n.error.passcodeSame})
      return
    }
    const passcodeHash = hash.sha256().update(first).digest('hex')
    this.props.setLock(passcodeHash)
    this.closePopup()
  }

  render() {
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
      </div>
    );
  }
}

export default ChangePasscode2;
