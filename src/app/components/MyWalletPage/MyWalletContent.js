import React, { Component } from 'react';
import { WalletSectionList, LoadingComponent } from 'app/components/';
import withLanguageProps from 'HOC/withLanguageProps';
import { isEmpty } from 'utils';

const INIT_STATE = {
  subNav: 'walletView'
}

@withLanguageProps
class MyWalletContent extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  setSubTab = (e) => {
    const target = e.target.getAttribute('data-nav');
    if(target === this.state.subNav) return false;
    this.setState({
      subNav: target
    })
  }

  render() {
    const { subNav } = this.state;
    const { I18n, dataSortedByWallet, dataSortedByCoin, totalResultLoading, walletsLoading } = this.props;
    return (
        <div>
    			<div className="tab-holder">
    				<ul>
    					<li onClick={this.setSubTab} data-nav="walletView" className={this.state.subNav === "walletView" && "on"}>{I18n.myWalletContentWalletView}</li>
    					<li onClick={this.setSubTab} data-nav="coinView" className={this.state.subNav === "coinView" && "on"}>{I18n.myWalletContentCoinView}</li>
    					<li></li>
    				</ul>
            <div className="add-group">
    					<span onClick={() => this.props.openPopup({
                popupType: 'addWallet'
              })}>{I18n.myWalletContentAddWallet}</span>
              <em></em>
            <span onClick={() => this.props.openPopup({
                popupType: 'connectLedger'
              })}>{I18n.button.connectLedger}</span>
    				</div>
    			</div>
          {
            ((subNav === "walletView" && (dataSortedByWallet.length < 1 || walletsLoading)) || (subNav === "coinView" && (isEmpty(dataSortedByCoin) || totalResultLoading)))
              ? (<div className="content-holder load"><LoadingComponent /></div>)
              : (subNav === "walletView") ? (<WalletSectionList data={dataSortedByWallet} isCoinView={false} {...this.props} />)
                                          : (<WalletSectionList data={dataSortedByCoin} isCoinView={true} {...this.props} />)
          }
        </div>
    );
  }
}

export default MyWalletContent;
