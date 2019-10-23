import React, { Component } from 'react';
import { tokenList as TOKEN_LIST } from 'constants/index';
import { Alert } from 'app/components/'
import { isEmpty } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  ownTokens: [],
  selectedTokens: [],
  isLoading: false,
  showAlertAddToken: false
}

@withLanguageProps
class AddToken1 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    const tokenListArr = Object.keys(TOKEN_LIST).map((k) => TOKEN_LIST[k]);
    const { isLedger, ledgerWallet, wallets, selectedAccount } = this.props;
    const currentWallet = isLedger ? ledgerWallet : wallets[selectedAccount]
    this.setState({
      ownTokens: Object.keys(currentWallet.tokens),
      tokenListArr: tokenListArr,
      selectedTokens: Array(tokenListArr.length).fill({})
    })
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.closePopup();
  }

  handleSubmit = () => {
    const { isLedger, ledgerWallet, wallets, selectedAccount } = this.props;
    const currentWallet = isLedger ? ledgerWallet : wallets[selectedAccount]

    const selectedTokensFiltered = this.state.selectedTokens.filter((item) => {
      return !isEmpty(item)
    })

    if (selectedTokensFiltered.length < 1) {
      this.setState({
        showAlertAddToken: true
      })
      return;
    }
    this.setState({
      isLoading: true
    }, () => {
      const selectedTokensFiltered = this.state.selectedTokens.filter((item) => {
        return !isEmpty(item)
      })

      for (let i = 0; i < selectedTokensFiltered.length; i++) {
        const tokenObj = Object.assign({}, selectedTokensFiltered[i], {
          defaultName: selectedTokensFiltered[i].name,
          defaultSymbol: selectedTokensFiltered[i].symbol,
          defaultDecimals: selectedTokensFiltered[i].decimals,
          createdAt: Date.now().toString(),
          recent: [],
          pendingTransaction: []
        });
        selectedTokensFiltered[i] = tokenObj;
      }

      this.props.addToken(selectedAccount, selectedTokensFiltered, currentWallet.type);
    })
  }

  updateChecklist = (i, checked) => {
    const arr = this.state.selectedTokens;
    if (checked) {
      arr[i] = this.state.tokenListArr[i]
      this.setState({
        selectedTokens: arr
      })
    } else {
      arr[i] = {}
      this.setState({
        selectedTokens: arr
      })
    }
  }

  closeAlert = () => {
    this.setState({
      showAlertAddToken: false
    })
  }

  render() {
    const {
      ownTokens,
      tokenListArr,
      isLoading,
      showAlertAddToken
    } = this.state;
    const { I18n } = this.props;
    return (
      <div>
        <h1 className="title">{I18n.addToken.title1}</h1>
        <h2>{I18n.addToken.desc1}</h2>
        <div className="scroll-holder">
          <div className="box">
            <div className="scroll">
              <div className="tabbox-holder">
                <div className="wallet-group">
                  <ul>
                    {
                      tokenListArr.map((token, i) => {
                        if (ownTokens.includes(token.address)) {
                          return (
                            <TokenBar
                              key={token.address}
                              token={token}
                              index={i}
                              disabled={true}
                              updateChecklist={(i, b) => this.updateChecklist(i, b)} />
                          )
                        } else {
                          return (
                            <TokenBar
                              key={token.address}
                              token={token}
                              index={i}
                              disabled={false}
                              updateChecklist={(i, b) => this.updateChecklist(i, b)} />
                          )
                        }
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="txt-holder">
          <h3 className='addtxt'>{I18n.addToken.info}</h3><button onClick={() => this.props.setPopupNum(2)} type="submit" className="btn-type-search2 auto"><span>{I18n.button.tokenInfo}</span></button>
        </div>
        <div className="btn-holder full">
          <button onClick={this.closePopup} className="btn-type-fill size-half"><span>{I18n.button.cancel}</span></button>
          <button disabled={isLoading} onClick={this.handleSubmit} type="submit" className="btn-type-normal size-half"><span>{I18n.button.add}</span></button>
        </div>
        {
          showAlertAddToken && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertAddToken}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

class TokenBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false
    }
  }

  toggleCheckbox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    }, () => {
      this.props.updateChecklist(this.props.index, this.state.isChecked);
    })
  }

  render() {
    const {
      token,
      index,
      disabled
    } = this.props;

    const {
      isChecked
    } = this.state;

    return (
      <li>
        <input onChange={this.toggleCheckbox} checked={isChecked} data-checked={disabled} disabled={disabled} id={'cbox-' + index} className="cbox-type" type="checkbox" />
        <label htmlFor={'cbox-' + index} className="label _img">{`${token.symbol}`}</label>
        <span>{token.address}</span>
      </li>
    )
  }
}

export default AddToken1;
