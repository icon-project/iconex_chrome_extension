import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { nToBr, generateIconexObject, downloadFile } from 'utils';
import Worker from 'workers/wallet.worker.js';
import { LoadingComponent, Alert } from 'app/components/'
import FileSaver from 'lib/FileSaver.min.js';

const INIT_STATE = {
  isDownloaded: false,
  loading: false,
  showAlertPassWithoutDownload: false,
  showAlertDownloadSuccess: false
}

@withLanguageProps
class SwapToken4 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      if (!m.data) {
        this.setState({loading: false})
      }
      else {
        downloadFile(props.address, m.data, FileSaver);
        this.setIconexObject(m.data);
        this.setState({
          isDownloaded: true,
          loading: false
        });
      }
    }
  }

  componentWillUnmount() {
    this.worker.terminate();
  }

  handleSubmit = () => {
    if (this.state.isDownloaded) {
      this.props.setPopupNum(5);
    }
    else {
      this.setState({showAlertPassWithoutDownload: true})
    }
  }

  handleDownload = () => {
    const data = { walletObj: this.props.walletObj, pw: this.props.pw, coinType: this.props.coinType, type: 'createWallet' };
    this.setState({ loading: true }, () => {
      this.worker.postMessage(data);
    });
  }

  setIconexObject = (v3) => {
    this.setState({showAlertDownloadSuccess: true})
    const { address, coinType, walletName } = this.props;
    const iconexObj = generateIconexObject(address, coinType, walletName, v3);
    this.props.setIconexObject(iconexObj);
  }

  goBack = () => {
    this.props.setPopupNum(3);
  }

  passPopup = () => {
    this.props.setPopupNum(5);
  }

  closeAlert = () => {
    this.setState({
      showAlertDownloadSuccess: false,
      showAlertPassWithoutDownload: false
    })
  }

  render() {
    const { showAlertDownloadSuccess, showAlertPassWithoutDownload } = this.state;
    const { I18n } = this.props;
    return (
      <ul className="layout">
        <li className="swap">
          <div className="tab-holder">
            <h1 className="title">Step 3</h1>
            <span className="img"><em className="_img step3"></em></span>
            <ul>
              <li>{nToBr(I18n.swapToken.step1)}</li>
              <li>{nToBr(I18n.swapToken.step2)}</li>
              <li className="on">{nToBr(I18n.swapToken.step3)}</li>
              <li>{nToBr(I18n.swapToken.step4)}</li>
              <li>{nToBr(I18n.swapToken.step5)}</li>
            </ul>
          </div>
          <div className="info">
            <ul>
              <li>{I18n.swapToken.leftInfoTitle3_1}</li>
              <li className="dot space">{I18n.swapToken.leftInfoDesc3_1}</li>
              <li className="dot">{I18n.swapToken.leftInfoDesc3_2}</li>
              <li className="dot">{I18n.swapToken.leftInfoDesc3_3}</li>
            </ul>
          </div>
        </li>
        <li className="content">
          <span onClick={this.props.cancelSwap} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.swapToken.title}</h1>
          <h2>{I18n.swapToken.rightHeaderDesc3}</h2>
          <div className="scroll-holder">
						<div className="scroll">
							<div className="tabbox-holder">
                <div className="download">
                  { this.state.loading ? (<button type="submit" className="btn-type-fill size-full load"><span><LoadingComponent type="white" /></span></button>)
                            : (<button onClick={this.handleDownload} type="submit" className="btn-type-fill size-full"><span>{I18n.button.download}</span></button>)}
    						</div>
							</div>
						</div>
					</div>
          <div className="btn-holder">
            <button onClick={this.goBack} type="submit" className="btn-type-fill"><span>{I18n.button.back}</span></button>
            <button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.next}</span></button>
					</div>
        </li>
        {
          showAlertPassWithoutDownload && (
            <Alert
              handleCancel={this.closeAlert}
              handleSubmit={this.passPopup}
              text={I18n.createWallet.passWithoutDownload}
              cancelText={I18n.button.no}
              submitText={I18n.button.yes}
              btnBottom={true}
            />
          )
        }
        {
          showAlertDownloadSuccess && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.createWallet.downloadSuccess}
              cancelText={I18n.button.confirm}
              btnBottom={true}
            />
          )
        }
      </ul>
    );
  }
}

export default SwapToken4;
