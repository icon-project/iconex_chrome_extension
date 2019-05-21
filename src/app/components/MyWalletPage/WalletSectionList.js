import React, { Component } from 'react';
import { WalletSection, Alert } from 'app/components/';
import { makeWalletArray } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  showMenuIndex: -1,

  showAlertNoBalance: false,
  showAlertNoSwapBalance: false,
  showAlertNoSwapGasBalance: false,
  showAlertNoTxFeeBalance: false
}

@withLanguageProps
class WalletSectionList extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  walletDataToArr = (data, isCoinView) => {
    let dataArr = [];
    if (!isCoinView) {
      dataArr = data;
    } else {
      let coinArr = makeWalletArray(data['coin']);
      let tokenArr = makeWalletArray(data['token']);
      for (let coin of coinArr) {
        const tokenArrWithSameCoinType = tokenArr.filter((token) => token.walletCoinType === coin.coinType);
        dataArr = [ ...dataArr, coin, ...tokenArrWithSameCoinType ]
      }
    }
    return dataArr;
  }

  makeTokenArr = (data, isCoinView) => {
    if(!isCoinView) {
      return;
    }
    let tokenListArr = makeWalletArray(data['token']);
    const tokenList = tokenListArr.map((token) => token.coinType)
    return tokenList
  }

  showMenuBar = (index) => {
    this.setState({
      showMenuIndex: index
    })
  }

  closeMenuBar = () => {
    this.setState({
      showMenuIndex: -1
    })
  }

  showAlert = (type, value = true) => {
    this.setState({
      [type]: value
    })
  }

  closeAlert = () => {
    this.setState({
      showAlertNoBalance: false,
      showAlertNoSwapBalance: false,
      showAlertNoSwapGasBalance: false,
      showAlertNoTxFeeBalance: false
    })
  }

  render() {
    const {
      isCoinView,
      data,
      I18n,
    } = this.props;

    const {
      showMenuIndex,

      showAlertNoBalance, 
      showAlertNoSwapBalance, 
      showAlertNoSwapGasBalance, 
      showAlertNoTxFeeBalance,
    } = this.state

    let dataArr = this.walletDataToArr(data, isCoinView);

    // get a list of tokens
    let tokenArray = this.makeTokenArr(data, isCoinView)

    return (
      <div>
        {
            dataArr.map((data, i) => (
                <WalletSection
                  key={i}
                  index={i}
                  showMenuIndex={showMenuIndex}
                  showMenuBar={this.showMenuBar}
                  closeMenuBar={this.closeMenuBar}
                  showAlert={this.showAlert}
                  walletSectionData={data}
                  tokenArray={tokenArray}
                  {...this.props}
                />
            ))
        }
        {
          showAlertNoBalance && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertNoBalance}
              cancelText={I18n.button.confirm}
            />
          )
        }
        {
          showAlertNoSwapBalance && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertNoSwapBalance}
              cancelText={I18n.button.confirm}
            />
          )
        }
        {
          showAlertNoSwapGasBalance && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertNoSwapGasBalance}
              cancelText={I18n.button.confirm}
            />
          )
        }
        {
          showAlertNoTxFeeBalance && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertNoTxFeeBalance(showAlertNoTxFeeBalance)}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    )
  }
}

export default WalletSectionList;
