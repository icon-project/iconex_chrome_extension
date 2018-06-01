import React, { Component } from 'react';
import { coinNameKorean as COIN_NAME_KOREAN, coinName as COIN_NAME } from 'constants/index';
import { makeWalletArray, convertNumberToText, calcTokenBalanceWithRate } from 'utils'
import withClickOut from 'HOC/withClickOut';
import { LoadingComponent  } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  showWalletList: false,
  walletBalanceWithRateArr: []
}

@withLanguageProps
class WalletSelector extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.totalResultLoading !== nextProps.totalResultLoading && !nextProps.totalResultLoading) {
      this.calcBalanceWithRate(nextProps.rate);
    }
  }

  calcBalanceWithRate = (rate) => {
    let resultArr = []
    let walletArr = makeWalletArray(this.props.wallets);
    for(let i=0; i<walletArr.length; i++) {
      let coinBalanceWithRate = walletArr[i].balance * rate[walletArr[i].type]
      let tokenBalanceWithRateArrSum = 0;
      const tokens = Object.values(walletArr[i].tokens);
      if(tokens.length > 0) {
        for(let v=0; v<tokens.length; v++){
          let tokenBalanceWithRate = calcTokenBalanceWithRate(tokens[v].balance, rate[walletArr[i].type], tokens[v].defaultDecimals, tokens[v].decimals)
          if (!tokenBalanceWithRate) {
            tokenBalanceWithRateArrSum += tokenBalanceWithRate;
          }
        }
      }
      let walletBalanceWithRate = coinBalanceWithRate + tokenBalanceWithRateArrSum;
      resultArr.push(walletBalanceWithRate)
    }

    this.setState({
      walletBalanceWithRateArr: resultArr
    })
  }

  toggleWalletList = () => {
    this.setState({
      showWalletList: !this.state.showWalletList
    })
  }

  setWallet = (address) => {
    this.props.setAccountAddress({
      isLoggedIn: false,
      accountAddress: address,
      coinTypeIndex: address
    });
    this.setState({
      showWalletList: false
    })
    this.props.togglePopup();
    this.props.setPopupType(`sendTransaction_${this.props.pageType}`);
  }

  render() {
    const {
      wallets,
      accountAddress,
      I18n
    } = this.props

    const walletName = wallets[accountAddress] ? wallets[accountAddress].name : I18n.transferPagePlaceholder3
    const walletsArr = makeWalletArray(wallets);

    return (
      <div className="name-holder">
        <div className="group">
          <span className="label">{I18n.transferPageLabel4}</span>
          <span className="money-group" onClick={this.toggleWalletList}>{walletName}<em className="_img"></em>
            {this.state.showWalletList &&
              <WalletList
                walletsArr={walletsArr}
                accountAddress={accountAddress}
                setWallet={this.setWallet}
                onClickOut={this.toggleWalletList}
                rate={this.props.rate}
                rateLoading={this.props.rateLoading}
                walletBalanceWithRateArr={this.state.walletBalanceWithRateArr}
              />
            }
          </span>
        </div>
      </div>
    );
  }
}

@withClickOut
@withLanguageProps
class WalletList extends Component {
  setWallet = (isEmpty, account) => {
    if (!(isEmpty)) {
      this.props.setWallet(account);
    }
  }
  render() {
    const {
      totalResultLoading,
      walletBalanceWithRateArr,
      accountAddress,
      I18n
    } = this.props;

    const loading = totalResultLoading || walletBalanceWithRateArr.length < 1 ? true : false;
    const coinNameObj = this.props.language === 'kr' ? COIN_NAME_KOREAN : COIN_NAME

    return (
      <div className="layer">
        <ul>
          {this.props.walletsArr.map((w, i) => {
            const isEmpty = false;
            const tokens = Object.values(w.tokens);
            return(
              <li key={i} disabled={w.account === accountAddress} className={w.account === accountAddress ? "on" : ""} onClick={() => this.setWallet(isEmpty, w.account)}>
                <span className="a">{w.name}</span>
                {
                  loading
                    ? (<span className="c load"><LoadingComponent type="white"/></span>)
                    : isEmpty
                      ? (<span className="c"><i className="zero">{`≈ ${convertNumberToText(walletBalanceWithRateArr[i], 'usd', false)} USD `}</i>{`/ ${coinNameObj[w.type]} ${tokens.length > 0 ? I18n.transferPageAndCoin + tokens.length : ''}`}</span>)
                      : (<span className="c">{`≈ ${convertNumberToText(walletBalanceWithRateArr[i], 'usd', false)} USD / ${coinNameObj[w.type]} ${tokens.length > 0 ? I18n.transferPageAndCoin + tokens.length : ''}`}</span>)
                }
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default WalletSelector;
