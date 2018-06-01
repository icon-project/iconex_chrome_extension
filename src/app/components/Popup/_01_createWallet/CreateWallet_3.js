/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react';
import Worker from 'workers/wallet.worker.js';
import { LoadingComponent, Alert } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';
import FileSaver from 'lib/FileSaver.min.js';
import { nToBr, generateIconexObject, downloadFile } from 'utils';

const INIT_STATE = {
  isDownloaded: false,
  loading: false,
  showAlertCancelCreateWalletNotDownload: false,
  showAlertPassWithoutDownload: false,
  showAlertDownloadSuccess: false
}

@withLanguageProps
class CreateWallet3 extends Component {

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
        downloadFile(props.address, m.data, FileSaver);
        this.setIconexObject(m.data);
        this.setState({
          isDownloaded: true,
          loading: false
        });
      }
    }
  }

  handleSubmit = () => {
    if (this.state.isDownloaded) {
      this.props.setPopupNum(4);
    } else {
      this.setState({
        showAlertPassWithoutDownload: true
      })
    }
  }

  handleDownload = () => {
    const data = { walletObj: this.props.walletObj, pw: this.props.pw, coinType: this.props.coinType, type: this.props.popupType };
    this.setState({ loading: true }, () => {
      this.worker.postMessage(data);
    });
  }

  setIconexObject = (v3) => {
    const { address, coinType, walletName } = this.props;
    this.setState({
      showAlertDownloadSuccess: true
    })
    const iconexObj = generateIconexObject(address, coinType, walletName, v3);
    this.props.setIconexObject(iconexObj);
  }

  goBack = () => {
    this.worker.terminate();
    this.setState(INIT_STATE, () => {
      this.props.resetInfo();
      this.props.setPopupNum(2);
    });
  }


  handleCloseButton = () => {
    this.setState({
      showAlertCancelCreateWalletNotDownload: true
    })
  }

  closePopup = () => {
    this.worker.terminate();
    this.setState(INIT_STATE);
    this.props.logIn();
  }

  passPopup = () => {
    this.worker.terminate();
    this.setState(INIT_STATE, () => {
      this.props.setPopupNum(4);
    });
  }

  closeAlert = () => {
    this.setState({
      showAlertCancelCreateWalletNotDownload: false,
      showAlertDownloadSuccess: false,
      showAlertPassWithoutDownload: false
    })
  }

  render() {
    const { loading, showAlertDownloadSuccess, showAlertPassWithoutDownload, showAlertCancelCreateWalletNotDownload } = this.state;
    const { I18n } = this.props;
    return (
      <ul className="layout">
        <li className="step">
  				<div className="tab-holder">
  					<h1 className="title">Step 3</h1>
  					<span className="img"><em className="_img step3"></em></span>
  					<ul>
              <li>{I18n.createWallet.step1}</li>
              <li>{I18n.createWallet.step2}</li>
              <li className="on">{I18n.createWallet.step3}</li>
              <li>{nToBr(I18n.createWallet.step4)}</li>
  					</ul>
  				</div>
  				<div className="info">
  					<ul>
  						<li><span>{I18n.createWallet.leftInfoTitle3_1}</span></li>
  						<li className="dot space">{I18n.createWallet.leftInfoDesc3_1}</li>
              <li className="dot">{I18n.createWallet.leftInfoDesc3_2}</li>
  						<li className="dot">{I18n.createWallet.leftInfoDesc3_3}</li>
  					</ul>
  				</div>
  			</li>
        <li className="content">
          <span onClick={this.handleCloseButton} className="close"><em className="_img"></em></span>
					<h1 className="title">{I18n.createWallet.title}</h1>
					<h2>{I18n.createWallet.desc3}</h2>
          <div className="scroll-holder">
						<div className="scroll">
							<div className="tabbox-holder">
                <div className="download">
                  { loading ? (<button type="submit" className="btn-type-fill size-full load"><span><LoadingComponent type="white" /></span></button>)
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
          showAlertCancelCreateWalletNotDownload && (
            <Alert
              handleCancel={this.closeAlert}
              handleSubmit={this.closePopup}
              text={I18n.createWallet.cancelCreateWalletNotDownload}
              cancelText={I18n.button.no}
              submitText={I18n.button.yes}
              btnButtom={true}
            />
          )
        }
        {
          showAlertPassWithoutDownload && (
            <Alert
              handleCancel={this.closeAlert}
              handleSubmit={this.passPopup}
              text={I18n.createWallet.passWithoutDownload}
              cancelText={I18n.button.no}
              submitText={I18n.button.yes}
              btnButtom={true}
            />
          )
        }
        {
          showAlertDownloadSuccess && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.createWallet.downloadSuccess}
              cancelText={I18n.button.confirm}
              btnButtom={false}
            />
          )
        }
			</ul>
    );
  }
}

export default CreateWallet3;
