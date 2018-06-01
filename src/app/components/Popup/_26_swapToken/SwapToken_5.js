import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { nToBr, isEmpty, generateIconexObject } from 'utils';
import { printDom } from 'utils/print';
import Worker from 'workers/wallet.worker.js';
import { CopyButton, LoadingComponent, Alert } from 'app/components/'

const INIT_STATE = {
  toggleKey: '',
  loading: false,
  showAlertCompleteInfo: false
}

@withLanguageProps
class SwapToken5 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      this.setState({loading: false});
      if (m.data) {
        this.setIconexObject(m.data);
      }
    }
  }

  componentWillUnmount() {
    this.worker.terminate();
  }

  setIconexObject = (v3) => {
    const { walletName, coinType, address } = this.props;
    const iconexObj = generateIconexObject(address, coinType, walletName, v3)
    this.props.setIcxSwapAddress(address)
    this.props.createWallet(iconexObj);
    this.goToFinalStep()
  }

  handlePrint = () => {
    const { walletName, address, coinType,  privateKey } = this.props;
    printDom(walletName, coinType, address, privateKey, this.props.language);
  }

  toggleKey = () => {
    this.setState({
      toggleKey: this.state.toggleKey === 'on' ? '' : 'on'
    })
  }

  handleSubmit = (e) => {
    if (isEmpty(this.props.iconexObj)) {
      const data = { walletObj: this.props.walletObj, pw: this.props.pw, coinType: this.props.coinType, type: 'createWallet' };
      this.setState({ loading: true }, () => {
        this.worker.postMessage(data);
      });
    }
    else {
      const { address } = this.props;
      this.props.setIcxSwapAddress(address)
      this.props.createWallet(this.props.iconexObj);
      this.goToFinalStep()
    }
  }

  goToFinalStep = () => {
    this.setState({showAlertCompleteInfo: true})
    // ** swap function
    // const _isDevelopment = isDevelopment()
    // if (_isDevelopment) {
    //   this.props.setPopupNum(6)
    // }
    // else {
    //   this.setState({showAlertCompleteInfo: true})
    // }
  }

  goToHome = () => {
    this.setState(INIT_STATE)
    this.props.initPopupState();
    this.props.logIn();
  }

  goBack = () => {
    this.props.setPopupNum(4);
  }

  render() {
    const { toggleKey, loading, showAlertCompleteInfo } = this.state;
    const { I18n, privateKey } = this.props;

    return (
      <ul className="layout">
        <li className="swap">
          <div className="tab-holder">
            <h1 className="title">Step 4</h1>
            <span className="img"><em className="_img step4"></em></span>
            <ul>
              <li>{I18n.swapToken.step1}</li>
              <li>{nToBr(I18n.swapToken.step2)}</li>
              <li>{nToBr(I18n.swapToken.step3)}</li>
              <li className="on">{nToBr(I18n.swapToken.step4)}</li>
              <li>{nToBr(I18n.swapToken.step5)}</li>
            </ul>
          </div>
          <div className="info">
            <ul>
              <li>{I18n.swapToken.leftInfoTitle4_1}</li>
              <li className="dot space">{I18n.swapToken.leftInfoDesc4_1}</li>
              <li className="dot">{I18n.swapToken.leftInfoDesc4_2}</li>
            </ul>
          </div>
        </li>
        <li className="content">
          <span onClick={this.props.cancelSwap} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.swapToken.title}</h1>
          <h2>{I18n.swapToken.rightHeaderDesc4}</h2>
          <div className="scroll-holder">
						<div className="scroll">
							<div className="tabbox-holder ">
								<div className="key-group">
									<p className="title">{I18n.createWallet.privateKey}</p>
                  <p className="key">{toggleKey === 'on' ? privateKey : '*'.repeat(64)}<em onClick={this.toggleKey} className={`_img ${toggleKey}`}></em></p>
								</div>
								<div className="btn-group">
                  <CopyButton target={privateKey} text={I18n.button.copyPrivateKey} type="small" defaultSize={true} copyFinish={I18n.button.copyFinish}/>
									<button className="btn-type-copy2" onClick={this.handlePrint}><span>{I18n.button.print}</span></button>
								</div>
							</div>
						</div>
					</div>
          <div className="btn-holder">
            <button onClick={this.goBack} type="submit" className="btn-type-fill"><span>{I18n.button.back}</span></button>
            {loading ? (<button type="submit" className="btn-type-normal load2"><span><LoadingComponent type="black" /></span></button>)
                     : (<button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.swapToken.walletFinish}</span></button>)}
					</div>
        </li>
        {showAlertCompleteInfo &&
          <Alert
            handleSubmit={this.goToHome}
            text={I18n.swapToken.alertCompleteInfo}
            submitText={I18n.button.confirm}
            btnButtom={true}
          />
        }
      </ul>
    );
  }
}

export default SwapToken5;
