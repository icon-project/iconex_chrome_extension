import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class MainPage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  importWallet = () => {
    const { togglePopup, setPopupType } = this.props;
    togglePopup();
    setPopupType('importWallet');
  }

  createWallet = () => {
    const { togglePopup, setPopupType } = this.props;
    togglePopup();
    setPopupType('createWallet');
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
    				</ul>
    			</div>
    		</div>
    );
  }
}

export default MainPage;
