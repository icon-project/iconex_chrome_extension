/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react';
import { CopyButton, LoadingComponent, Alert } from 'app/components/'
import Worker from 'workers/wallet.worker.js';
import { printDom } from 'utils/print';
import withLanguageProps from 'HOC/withLanguageProps';
import { nToBr, isEmpty, generateIconexObject } from 'utils';

const INIT_STATE = {
  isDone: false,
  toggleKey: 'on',
  showAlertCancelCreateWalletNotDownload: false,
  loading: false
}

@withLanguageProps
class CreateWallet4 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      if (!m.data) {
        this.setState({
          loading: false
        })
      } else {
        this.setIconexObject(m.data);
        this.setState({
          loading: false
        });
      }
    }
  }

  setIconexObject = (v3) => {
    const { walletName, coinType, address } = this.props;
    const iconexObj = generateIconexObject(address, coinType, walletName, v3)
    this.props.createWallet(iconexObj);
    this.props.logIn();
  }

  handlePrint = (walletName, coinType, address, privateKey) => {
    printDom(walletName, coinType, address, privateKey, this.props.language);
  }

  toggleKey = () => {
    this.setState({
      toggleKey: this.state.toggleKey === 'on' ? '' : 'on'
    })
  }

  handleSubmit = (e) => {
    if (isEmpty(this.props.iconexObj)) {
      const data = { walletObj: this.props.walletObj, pw: this.props.pw, coinType: this.props.coinType, type: this.props.popupType };
      this.setState({ loading: true }, () => {
        this.worker.postMessage(data);
      });
    } else {
      this.props.createWallet(this.props.iconexObj);
      this.props.logIn();
    }
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.logIn();
  }

  closeAlert = () => {
    this.setState({
      showAlertCancelCreateWalletNotDownload: false
    })
  }

  handleCloseButton = () => {
    this.setState({
      showAlertCancelCreateWalletNotDownload: true
    })
  }

  goBack = () => {
    this.setState(INIT_STATE, () => {
      this.props.setPopupNum(3);
    });
  }

  render() {

    const { toggleKey, loading, showAlertCancelCreateWalletNotDownload } = this.state;

    const {
      walletName,
      address,
      coinType,
      privateKey
    } = this.props;

    const { I18n } = this.props;

    return (
      <ul className="layout">
        <li className="step">
					<div className="tab-holder">
						<h1 className="title">STEP 4</h1>
						<span className="img"><em className="_img step4"></em></span>
						<ul>
              <li>{I18n.createWallet.step1}</li>
              <li>{I18n.createWallet.step2}</li>
              <li>{I18n.createWallet.step3}</li>
              <li className="on">{nToBr(I18n.createWallet.step4)}</li>
						</ul>
					</div>
					<div className="info">
						<ul>
							<li>{I18n.createWallet.leftInfoTitle4_1}</li>
							<li className="dot space">{I18n.createWallet.leftInfoDesc4_1}</li>
							<li className="dot">{I18n.createWallet.leftInfoDesc4_2}</li>
							<li className="dot">{I18n.createWallet.leftInfoDesc4_3}</li>
						</ul>
					</div>
				</li>{/*
      */}<li className="content">
          <span onClick={this.handleCloseButton} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.createWallet.title}</h1>
          <h2>{I18n.createWallet.desc4}</h2>
          <div className="scroll-holder">
						<div className="scroll">
							<div className="tabbox-holder ">
								<div className="key-group">
									<p className="title">{I18n.createWallet.privateKey}</p>
                  {/* {toggleKey === '' ? privateKey : '*'.repeat(64)} */}
                  <p className="key">{privateKey}<em onClick={this.toggleKey} className={`_img ${toggleKey}`}></em></p>
								</div>
								<div className="btn-group">
                  <CopyButton target={privateKey} text={I18n.button.copyPrivateKey} type="small" defaultSize={true} copyFinish={I18n.button.copyFinish}/>
									<button className="btn-type-copy" onClick={() => this.handlePrint(walletName, coinType, address, privateKey)}><span>{I18n.button.print}</span></button>
								</div>
							</div>
						</div>
					</div>
          <div className="btn-holder">
            {loading ? (<button type="submit" className="btn-type-normal load"><span><LoadingComponent type="black" /></span></button>): (<button onClick={this.handleSubmit} type="submit" className="btn-type-next size-full"><span>{I18n.button.submit}</span></button>)}
          </div>
        </li>
        {
          showAlertCancelCreateWalletNotDownload && (
            <Alert
              handleCancel={this.closeAlert}
              handleSubmit={this.closePopup}
              text={I18n.createWallet.cancelCreateWalletNotDownload}
              cancelText={I18n.button.no}
              submitText={I18n.button.yes}
              btnBottom={true}
            />
          )
        }
      </ul>
    );
  }
}

export default CreateWallet4;
