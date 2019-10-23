import React, { Component } from 'react';
import Wallet from 'ethereumjs-wallet';
import withLanguageProps from 'HOC/withLanguageProps';
import { isPrivateKey } from 'utils/utils';

const CoinTypes = [{
  label: 'ICON (ICX)',
  type: 'icx'
}, {
  label: 'Ethereum (ETH)',
  type: 'eth'
}]

const INIT_STATE = {
  coinTypeIndex: 0,

  privateKey: '',
  privateKeyError: '',
  pw: '',
  pwError: '',
  isPwCorrect: false,
  isPrivKeyCorrect: false,

  wallet: '',
}

@withLanguageProps
class ImportWallet3 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  changeInput = (e) => {
    const target = e.target.name
    if (e.target.value.charAt(0) === " ") return;
    if (e.target.value !== '' && !(/^\S+$/.test(e.target.value))) return;
    this.setState({
      [target]: e.target.value,
      privateKeyError: ''
    })
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.closePopup();
  }

  handleSubmit = () => {
    new Promise((resolve, reject) => {
      if (!isPrivateKey(this.state.privateKey)) reject();
      const wallet = Wallet.fromPrivateKey(Buffer.from(this.state.privateKey, 'hex'));
      resolve(wallet);
    }).then((result) => {
      this.setState({
        wallet: result,
        isPrivKeyCorrect: true
      }, () => {
        this.validateForm(['privateKey'], 'submit')
      })
    }).catch((e) => {
      this.setState({
        isPrivKeyCorrect: false
      }, () => {
        this.validateForm(['privateKey'])
      })
    })
  }

  validateForm = (e, state = "") => {
    const target = Array.isArray(e) ? e : [e.target.name];
    let privateKeyError = this.state.privateKeyError;
    let pwError = this.state.pwError;

    for (let i = 0; i < target.length; i++) {
      switch (target[i]) {
        case 'privateKey':
          const { I18n } = this.props;
          if (!this.state.privateKey) {
            privateKeyError = I18n.error.privateKeyEnter
            break;
          } else if (!this.state.isPrivKeyCorrect) {
            privateKeyError = I18n.error.privateKeyConfirm
            break;
          } else {
            privateKeyError = ''
            break;
          }
        default:
          break;
      }
    }

    this.setState({
      privateKeyError: privateKeyError,
      pwError: pwError
    }, () => {
      if (state === 'submit' && !(privateKeyError || pwError)) {
        this.props.setWalletObject(this.state.wallet);
        this.props.setCoinType(this.state.coinTypeIndex === 0 ? 'icx' : 'eth')
        this.props.setPopupNum(4);
      }
    });
  }

  selectCoinType = (index) => {
    this.setState({ coinTypeIndex: index })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {

    const {
      privateKey,
      privateKeyError,
    } = this.state;

    const { I18n } = this.props;

    return (
      <div>
        <div className="header">
          <span className="close"><em onClick={this.closePopup} className="_img"></em></span>
          <h1 className="title">{I18n.importWallet.title}</h1>
          <h2>{I18n.importWallet.desc3}</h2>
        </div>
        <div className="scroll-holder">
          <div className="scroll">
            <div className="tabbox-holder">
              <div className="name-group abs">
                <p className="title">{I18n.importWallet.inputLabel3_1}</p>
                <MoneyGroup types={CoinTypes} index={this.state.coinTypeIndex} selectCoinType={this.selectCoinType} />
              </div>
              <div className="pw-group">
                <p className="title">{I18n.importWallet.inputLabel3_2}</p>
                <input onKeyPress={this.handleKeyPress} onChange={this.changeInput} type="text" className={`txt-type-normal ${privateKeyError && 'error'}`} placeholder={I18n.importWallet.inputPlaceHolder3_2} name="privateKey" value={privateKey} spellCheck="false" />
                <p className="error">{privateKeyError}</p>
              </div>
            </div>
            <div className="message-holder">
              · {I18n.importWallet.infoBox3_1}
            </div>
          </div>
        </div>
        <div className="btn-holder">
          <button onClick={this.handleSubmit} type="submit" className="btn-type-next size-full"><span>{I18n.button.import}</span></button>
        </div>
      </div>
    );
  }
}

class MoneyGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLayer: false
    }
  }

  onClick = (index) => {
    const { selectCoinType } = this.props
    this.setState({ showLayer: !this.state.showLayer })
    if (index !== undefined) selectCoinType(index)
  }

  render() {
    const { index, types, selectCoinType } = this.props
    return (
      <span className="money-group" onClick={() => { this.onClick() }}>{types[index].label}<em className="_img"></em>
        {this.state.showLayer &&
          // className="layer"
          <div className="drop-box">
            <div className="drop-layer">
              <ul>
                {types.map((t, i) => {
                  return (
                    <li key={i} className={(index === i) && 'on'} onClick={() => { selectCoinType(i) }}>
                      <span>{t.label}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        }
      </span>
    )
  }
}

export default ImportWallet3;
