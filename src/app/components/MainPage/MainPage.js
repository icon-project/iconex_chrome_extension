import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class MainPage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  createWallet = () => {
    this.props.openPopup({
      popupType: 'createWallet'
    });
  }

  importWallet = () => {
    this.props.openPopup({
      popupType: 'importWallet'
    });
  }

  connectLedger = () => {
    this.props.openPopup({
      popupType: 'connectLedger'
    });
  }

  render() {
    const { I18n } = this.props
    return (
    		<div className={`content-wrap`}>
    			<div className="content-holder">
    				<div className="logo"><em className="_img"></em></div>
    				<p className="txt">{I18n.mainPageDesc}</p>
    				<ul>
    					<li onClick={() => this.createWallet()} className="create">
    						<div className="box">
    							<p className="title">{I18n.mainPageCreateWallet}</p>
                  <span><em className="_img"></em></span>
    							<p>{I18n.mainPageCreateWalletDesc}</p>
    						</div>
    					</li>
              <li onClick={() => this.importWallet()} className="import">
    						<div className="box">
    							<p className="title">{I18n.mainPageImportWallet}</p>
                  <span><em className="_img"></em></span>
    							<p>{I18n.mainPageImportWalletDesc}</p>
    						</div>
    					</li>
    					<li onClick={() => this.connectLedger()} className="ledger">
    						<div className="box">
    							<p className="title">{I18n.mainPageConnectLedger}</p>
    							<span><em className="_img"></em></span>
    						  <p>{I18n.mainPageConnectLedgerDesc}</p>
                </div>
              </li>
    				</ul>
    			</div>
    		</div>
    );
  }
}

export default MainPage;
