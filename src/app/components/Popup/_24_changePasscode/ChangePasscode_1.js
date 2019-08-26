/* eslint-disable import/no-webpack-loader-syntax */

import React, { Component } from 'react';
import { makeWalletArray } from 'utils'
import Worker from 'workers/wallet.worker.js';
import { LoadingComponent } from 'app/components/'

import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class ChangePasscode1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '0',
      pw: '',
      error: ''
    };
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      if (!m.data) {
        const { I18n } = this.props;
        this.setState({
          loading: false,
          error: I18n.error.pwConfirmError
        })
      }
      else {
        this.props.setPasscodeStep()
      }
    }
  }

  componentDidMount() {
    this.props.getWallet({
      fetchWithoutBalance: true
    });
  }

  componentWillUnmount() {
    this.worker.terminate()
  }

  closePopup = () => {
    this.props.closePopup();
  }

  handleRadioChange = (e) => {
    this.setState({ selected: e.target.value })
  }

  handleChange = (e) => {
    this.setState({
      pw: e.target.value,
      error: ''
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.validatePassword()
    }
  }

  validatePassword = () => {
    const { pw } = this.state;
    if (pw === '') {
      const { I18n } = this.props;
      this.setState({ error: I18n.error.pwErrorEnter })
      return
    }
    const walletsArr = makeWalletArray(this.props.wallets)
    const wallet = walletsArr[Number(this.state.selected)]
    const { priv } = wallet;
    const data = {
      priv, pw, type: 'backupWallet'
    }
    this.setState({ loading: true }, () => {
      this.worker.postMessage(data)
    })
  }

  render() {
    const walletsArr = makeWalletArray(this.props.wallets)
    const { error } = this.state
    const { I18n } = this.props;
    return (
      <div className="popup-wrap">
        <div className="dimmed fade-in"></div>
        <div className="popup moving-down">
          <span className="close" onClick={this.closePopup}><em className="_img"></em></span>
          <h1 className="title">{I18n.changePasscode.title}</h1>
          <h2>{I18n.changePasscode.desc1}</h2>
          <div className="scroll-holder">
            <div className="scroll line">
              <div className="tabbox-holder">
                <div className="wallet-group">
                  <ul>
                    {walletsArr.map((w, i) => {
                      const checked = this.state.selected === i.toString()
                      return (
                        <li key={i}>
                          <input id={`rbox-${i}`} className="rbox-type" type="radio" name="rbox-1" value={i.toString()} onChange={this.handleRadioChange} checked={checked} />
                          <label htmlFor={`rbox-${i}`} className="_img">{w.name}</label>{/*<span className="icx">{w.balance.toFixed(3)}<em>{w.type.toUpperCase()}</em></span>*/}
                          {checked &&
                            <div className="pw-add">
                              <input type="password" className={`txt-type-normal ${error && 'error'}`} placeholder={I18n.changePasscode.inputPlaceHolder1}
                                value={this.state.pw}
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                              />
                              {error && <p className="error">{error}</p>}
                            </div>
                          }
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-holder">
            {this.state.loading ? (<button type="submit" className="btn-type-normal load"><span><LoadingComponent type="black" /></span></button>)
              : (<button onClick={this.validatePassword} type="submit" className="btn-type-normal"><span>{I18n.button.next}</span></button>)}
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePasscode1;
