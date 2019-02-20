import React, { Component } from 'react';
import { WalletSection } from 'app/components/';
import { makeWalletArray } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  showMenuIndex: -1
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

  render() {
    const {
      isCoinView,
      data
    } = this.props;

    const {
      showMenuIndex
    } = this.state

    let dataArr = this.walletDataToArr(data, isCoinView);

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
                  walletSectionData={data}
                  {...this.props}
                />
            ))
        }
      </div>
    )
  }
}

export default WalletSectionList;
