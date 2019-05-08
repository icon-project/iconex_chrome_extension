import React, { Component } from 'react';
import { coinNameKorean as COIN_NAME_KOREAN, coinName as COIN_NAME } from 'constants/index';
import { makeWalletArray, convertNumberToText, isEmpty } from 'utils'
import withClickOut from 'HOC/withClickOut';
import { LoadingComponent  } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  showWalletList: false
}

@withLanguageProps
class WalletSelector extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  toggleWalletList = () => {
    this.setState({
      showWalletList: !this.state.showWalletList
    })
  }

  setWallet = (account) => {
    this.props.setEXTRLogInState({
      isLoggedIn: false
    })
    this.props.setSelectedWallet({
      account
    });
    this.setState({ showWalletList: false });
    this.props.openPopup({
      popupType: `sendTransaction_transaction`
    });
  }

  render() {
    const {
      wallets,
      isLoggedIn,
      selectedAccount,
      I18n,
      isContractPage,
      walletSelectorError,
      isLedger,
      ledgerWallet,
      totalResultLoading
    } = this.props

    const walletsArr = makeWalletArray(wallets);
    const walletName = wallets[selectedAccount] ? wallets[selectedAccount].name : I18n.transferPagePlaceholder3
    const walletIcon = wallets[selectedAccount] ? `${wallets[selectedAccount].type === 'eth' ? 'ethereum' : '' } ${!isEmpty(wallets[selectedAccount].tokens) ? 'three' : '' } _icon` : ''

    if (isContractPage) {
      return (
        <div className="-group">
					<p className="title">{I18n.transferPageLabel4}</p>
            <span className="money-group" onClick={this.toggleWalletList}>{walletName}<em className="_img"></em>
              {this.state.showWalletList &&
                <WalletList
                  walletsArr={walletsArr.filter((wallet) => wallet.type === 'icx')}
                  selectedAccount={selectedAccount}
                  setWallet={this.setWallet}
                  onClickOut={this.toggleWalletList}
                  totalResultLoading={totalResultLoading}
                  isContractPage
                />
              }
            </span>
            { isLoggedIn && (<p className="have">{I18n.contractBalance} {wallets[selectedAccount].balance.toString()}<em>ICX</em></p>) }
            <p className="error">{I18n.error[walletSelectorError]}</p>
				</div>
      )
    }

    return (
      <div className="name-holder">
        <div className="group">
          <span className="label">{I18n.transferPageLabel4}</span>
          { isLedger ? (
  					<span className="money-group connect">{`${ledgerWallet.account} (${ledgerWallet.path})`}</span>
          ) : (
            <span className="money-group" onClick={this.toggleWalletList}>
              <i className={walletIcon}></i>
              {` ${walletName}`}
              <em className="_img"></em>
              {this.state.showWalletList &&
                <WalletList
                  walletsArr={walletsArr}
                  selectedAccount={selectedAccount}
                  setWallet={this.setWallet}
                  onClickOut={this.toggleWalletList}
                  totalResultLoading={totalResultLoading}
                />
              }
            </span>
          )}
          {
            !isLedger && (
              <div className="-holder">
    						<button
                  onClick={() => this.props.openPopup({
                    popupType: 'connectLedger'
                  })}
                  className="btn-type-copy size-ledger">
                  <span>{I18n.button.connectLedger}</span>
                </button>
    					</div>
            )
          }
        </div>
      </div>
    );
  }
}

@withClickOut
@withLanguageProps
class WalletList extends Component {

  setWallet = (account) => {
    this.props.setWallet(account);
  }

  render() {
    const {
      selectedAccount,
      isContractPage,
      totalResultLoading
    } = this.props;

    return (
      <div className="drop-box">
        <div className="drop-layer">
          <ul>
            {this.props.walletsArr.map((w, i) => {
              const tokens = Object.values(w.tokens);
              return(
                <li key={i} disabled={w.account === selectedAccount} className={w.account === selectedAccount ? "on" : ""} onClick={() => this.setWallet(w.account)}>
                  <i className={`_icon ${w.type === 'icx' ? "" : "ethereum"} ${tokens.length > 0 ? 'three' : ''}`}></i>
                  <span className="a">{`${w.name}`}</span>
                  {
                    !isContractPage && (
                      totalResultLoading
                        ? (<span className="b load"><LoadingComponent type="black"/></span>)
                        : (<span className="b">{`${convertNumberToText(w.balance, 'transaction', true)}`}</span>)
                    )
                  }
                  { !isContractPage && (<span className="c">{`${w.type.toUpperCase()}`}</span>) }
                  { !isContractPage && tokens.length > 0 && !totalResultLoading && (
                    <div className="tag-group">
                      {
                        tokens.map((token, i) => (
                          <em key={i}>{convertNumberToText(token.balance, 'transaction', true)} {token.symbol.toUpperCase()}</em>
                        ))
                      }
                    </div>
                    ) }
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default WalletSelector;
