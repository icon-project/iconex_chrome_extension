import React, { Component } from 'react';
import { WalletSection } from 'app/components/';
import { makeWalletArray } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  data: []
}

@withLanguageProps
class WalletSectionList extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  walletDataToArr = (data, isCoinView) => {
    let dataArr;
    if (!isCoinView) {
      dataArr = data;
    } else {
      let coinArr = makeWalletArray(data['coin']);
      let tokenArr = makeWalletArray(data['token']);
      dataArr = [...coinArr, ...tokenArr];
    }
    return dataArr;
  }

  openPopup = (type) => {
    this.props.togglePopup();
    this.props.setPopupType(type);
  }

  render() {
    const {
      isCoinView,
      data
    } = this.props;

    let dataArr = this.walletDataToArr(data, isCoinView);
    const { I18n } = this.props;

    return (
      <div>
        {
            dataArr.map((data, i) => (
                <WalletSection
                  key={i}
                  walletSectionData={data}
                  {...this.props}
                />
            ))
        }
        { !isCoinView && (
          <div className="add-wallet">
            <span onClick={() => this.openPopup("addWallet")}>
              <em className="_img"></em>
              {I18n.myWalletContentAddWallet}
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default WalletSectionList;
