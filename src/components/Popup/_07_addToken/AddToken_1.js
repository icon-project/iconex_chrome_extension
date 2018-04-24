import React, { Component } from 'react';
import { tokenList as TOKEN_LIST } from 'constants/index';
import { Alert } from 'components/'
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
    this.setState({
      ownTokens: Object.keys(this.props.wallets[this.props.selectedAccount].tokens),
      tokenListArr: tokenListArr,
      selectedTokens: Array(tokenListArr.length).fill({})
    })
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.initPopupState();
  }

  handleSubmit = () => {
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

      for (let i=0; i<selectedTokensFiltered.length; i++) {
        const tokenObj = Object.assign({}, selectedTokensFiltered[i], {
          defaultName: selectedTokensFiltered[i].name,
          defaultSymbol: selectedTokensFiltered[i].symbol,
          defaultDecimals: selectedTokensFiltered[i].decimals,
          createdAt: Date.now().toString(),
          recent: []
        });
        selectedTokensFiltered[i] = tokenObj;
      }

      this.props.addToken(this.props.selectedAccount, selectedTokensFiltered, this.props.wallets[this.props.selectedAccount].type);
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
        <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
        <h1 className="title">{I18n.addToken.title1}</h1>
        <h2>{I18n.addToken.desc1}</h2>
        <div className="scroll-holder">
  				<div className=" token-list scroll">
            <div className="tabbox-holder">
              <div className="wallet-group">
                <ul>
                  {
                    tokenListArr.map((token, i) => {
                      if(ownTokens.includes(token.address)) {
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
        <div className="token-input-holder">
          <span>{I18n.addToken.info}</span><button onClick={() => this.props.setPopupNum(2)} type="submit" className="btn-type-copy2"><span>{I18n.button.tokenInfo}</span></button>
        </div>
        <div className="btn-holder">
          <button disabled={isLoading} onClick={this.handleSubmit} type="submit" className="btn-type-fill"><span>{I18n.button.add}</span></button>
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
        <input onChange={this.toggleCheckbox} checked={isChecked} data-checked={disabled} disabled={disabled} id={'cbox-' + index} className="cbox-type" type="checkbox"/>
        <label htmlFor={'cbox-' + index} className="label _img">{token.symbol}</label>
      </li>
    )
  }
}

export default AddToken1;
