/* eslint-disable import/no-webpack-loader-syntax */

import React, { Component } from 'react';
import Worker from 'workers/wallet.worker.js';
import { LoadingComponent } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';
import { nToBr } from 'utils';

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
    const { priv, type, coinType = '' } = this.props;
    const data = {
      priv, pw, type, coinType
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
              <h3 className="search-pw tooltip"><i className="_img info-no"></i>{I18n.checkPassword.forgotPassword}
                <div style={{
                  left: 'inherit',
                  right: 0,
                  bottom: 30,
                  width: 300,
                }} className="help-layer">
                  <p>{nToBr(I18n.checkPassword.forgotPasswordDesc)}</p>
                </div>
              </h3>
            </div>
          </div>
        </div>
        <div className="btn-holder full">
          <button onClick={this.closePopup} className="btn-type-fill size-half"><span>{I18n.button.cancel}</span></button>
          {loading ? (<button type="submit" className="btn-type-normal size-half"><span><LoadingComponent type="black" /></span></button>)
            : (<button onClick={this.handleSubmit} type="submit" className="btn-type-normal size-half"><span>{I18n.button.confirm}</span></button>)}
        </div>
      </div>
    );
  }
}

export default CheckPassword;
