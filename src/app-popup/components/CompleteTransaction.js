import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { txidUrl as TXID_URL } from 'constants/config.js'

@withLanguageProps
class CompleteTransaction extends Component {

	closePopup = () => {
		this.props.initExternalState()
		window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
	}

	checkTransaction = url => {
		window.open(url, '_blank');
		this.closePopup()
	}

	render() {
		const { I18n, transaction } = this.props;
		const { txHash, error } = transaction
		const txUrl = TXID_URL['icx'] + txHash
		const Content = () => {
			if (!!txHash) {
				return (
					<div className="wrap remittance complete">
						<div className="content-wrap">
							<div className="scroll">
								<i className="_img"></i>
								<p ref={ref => {if (ref) ref.innerHTML = I18n.completeTransaction.success}}></p>
								<a href={txUrl} target="_blank"><span>{I18n.sendTransaction.openTracker}</span></a>
							</div>
						</div>
						<div className="footer cols-2">
							<button className="btn-type-normal" onClick={this.closePopup} ><span>{I18n.button.close}</span></button>
							<button className="btn-type-ok" onClick={() => { this.checkTransaction(txUrl) }}><span>{I18n.button.checkTransction}</span></button>
						</div>
					</div>
				)
			}
			else if (!!error) {
				return (
					<div className="wrap remittance fail">
						<div className="content-wrap">
							<div className="scroll">
								<i className="_img"></i>
								<p ref={ref => {if (ref) ref.innerHTML = I18n.completeTransaction.fail}}></p>
							</div>
						</div>
						<div className="footer cols-2">
							<button className="btn-type-normal" onClick={this.closePopup} ><span>{I18n.button.close}</span></button>
						</div>
					</div>
				)
			}
			else {
				return (
					<div className="wrap remittance"></div>
				)
			}
		}
		return Content()
	}
}

export default CompleteTransaction;
