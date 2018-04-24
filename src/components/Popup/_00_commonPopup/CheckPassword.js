/* eslint-disable import/no-webpack-loader-syntax */

import React, { Component } from 'react';
import Worker from 'workers/wallet.worker.js';
import { LoadingComponent } from 'components/'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  pw: '',
  pwError: '',
  loading: false
}

@withLanguageProps
class CheckPassword extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      const { I18n } = this.props;
      if (!m.data) {
        this.setState({
          loading: false,
          pwError: I18n.error.pwConfirmError
        })
      } else {
        props.onSuccess(m.data);
      }
    }
  }

  changeInput = (e) => {
    this.setState({
      pw: e.target.value
    })
  }

  closePopup = () => {
    this.worker.terminate();
    this.props.onCancel();
  }

  validatePassword = () => {
      const { pw } = this.state;
      const { priv } = this.props;
      const data = {
        priv, pw, type: 'backupWallet'
      };
      const { I18n } = this.props;
      if (!pw) {
        this.setState({ pwError: I18n.error.pwErrorEnter })
        return false;
      }

      this.setState({ loading: true, pwError: '' }, () => {
        this.worker.postMessage(data);
      })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    if (this.state.loading) return false;
    this.validatePassword();
  }

  render() {
    const { pw, pwError, loading } = this.state;
    const { I18n } = this.props;
    return (
      <div>
        <span className="close"><em onClick={this.closePopup} className="_img"></em></span>
        <h1 className="title">{I18n.checkPassword.title}</h1>
        <h2>[{this.props.walletName}] {I18n.checkPassword.desc}</h2>
        <div className="scroll-holder">
  				<div className="scroll">
            <div className="tabbox-holder">
              <div>
                <p className="title">{I18n.checkPassword.input}</p>
                <input onChange={this.changeInput} onKeyPress={this.handleKeyPress} type="password" className={`txt-type-normal ${pwError && 'error'}`} placeholder={I18n.checkPassword.placeholder} name="pw" value={pw} />
                <p className="error">{pwError}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-holder">
          { loading ? (<button type="submit" className="btn-type-normal load"><span><LoadingComponent type="black" /></span></button>)
                    : (<button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.confirm}</span></button>)}
        </div>
      </div>
    );
  }
}

export default CheckPassword;
