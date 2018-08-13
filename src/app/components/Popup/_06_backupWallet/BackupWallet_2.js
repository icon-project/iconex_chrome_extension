import React, { Component } from 'react';
import { CopyButton } from 'app/components/';
import { printDom, downloadFile } from 'utils';
import FileSaver from 'lib/FileSaver.min.js';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class BackupWallet2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'name': this.props.wallets[this.props.selectedAccount].name,
      'type': this.props.wallets[this.props.selectedAccount].type,
      'priv': this.props.wallets[this.props.selectedAccount].priv,
      'toggleKey': 'on'
    };
  }

  closePopup = () => {
    this.setState({
      'name': '',
      'type': '',
      'priv': ''
    });
    this.props.closePopup();
    this.props.resetSelectedWallet();
    this.props.setPrivKeyAndV3ForBackup({privKey: '', v3: ''});
  }

  handleDownload = () => {
    const {
      selectedAccount, v3
    } = this.props;
    downloadFile(selectedAccount, v3, FileSaver);
  }

  handlePrint = (walletName, coinType, address, privateKey) => {
    printDom(walletName, coinType, address, privateKey, this.props.language);
  }

  toggleKey = () => {
    this.setState({
      toggleKey: this.state.toggleKey === 'on' ? '' : 'on'
    })
  }

  render() {
    const {
      selectedAccount,
      privKey,
    } = this.props;

    const {
      name,
      type,
      toggleKey
    } = this.state;

    const { I18n } = this.props;

    return (
      <div>
        <div className="popup">
          <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.backupWallet.title}</h1>
          <h2>{I18n.backupWallet.desc}</h2>
          <div className="scroll-holder backup">
    				<div className="scroll">
    					<div className="message-holder"><i className="_img"></i>
    						{I18n.backupWallet.infoBoxTitle1_1}
    					</div>
    					<div className="message-holder line">
    						<ul>
    							<li>{I18n.backupWallet.infoBoxDesc1_1}</li>
    							<li>{I18n.backupWallet.infoBoxDesc1_2}</li>
    						</ul>
    					</div>
    					<div className="tabbox-holder ">
    						<div className="download">
                  <button type="submit" onClick={this.handleDownload} className="btn-type-normal size-full"><span>{I18n.button.download}</span></button>
    						</div>
    					</div>
    					<div className="tabbox-holder ">
    						<div className="key-group">
                  <p className={`key ${toggleKey}`}>{toggleKey === '' ? privKey : '*'.repeat(64)}<em onClick={this.toggleKey} className={`_img ${toggleKey}`}></em></p>
    						</div>
    					</div>
    					<div className="message-holder"><i className="_img"></i>
    						{I18n.backupWallet.infoBoxTitle2_1}
    					</div>
    					<div className="message-holder line">
    						<ul>
    							<li>{I18n.backupWallet.infoBoxDesc2_1}</li>
    							<li>{I18n.backupWallet.infoBoxDesc2_2}</li>
    						</ul>
    					</div>
              <div className="tabbox-holder end">
                <CopyButton target={privKey} text={I18n.button.copy} defaultSize={true} copyFinish={I18n.button.copyFinish}/>
                <button onClick={() => this.handlePrint(name, type, selectedAccount, privKey)} className="btn-type-normal"><span>{I18n.button.print}</span></button>
              </div>
    				</div>
    			</div>
        </div>
      </div>
    );
  }
}

export default BackupWallet2;
