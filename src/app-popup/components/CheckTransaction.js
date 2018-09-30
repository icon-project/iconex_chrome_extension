import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { convertNumberToText } from 'utils'
import { routeConstants as ROUTE } from 'constants/index.js';
import { LoadingComponent } from 'app/components/'

@withLanguageProps
class CheckTransaction extends Component {
	constructor(props) {
		super(props)
		this.cancelClicked = false
	}

	componentWillMount() {
		window.onunload = () => {
			if (!this.cancelClicked) {
				window.chrome.tabs.sendMessage(this.props.tabId, { type: 'CANCEL_TRANSACTION' });
				this.props.initExternalState()
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		const { transactionLoading: currentLoading } = this.props
		const { transactionLoading: nextLoading, transaction } = nextProps
		const { txHash, error } = transaction
		if (currentLoading && !nextLoading && (txHash || error)) {
			this.props.history.push(ROUTE['complete'])
		}
	}

	revertTransaction = () => {
		this.props.history.push(ROUTE['send'])
	}

	confirmTransaction = () => {
		this.cancelClicked = true
		const { tabId, transaction } = this.props
		const { raw, privKey } = transaction
		this.props.callSendTransaction({ tabId, privKey, raw })
		// this.props.history.push(ROUTE['complete'])
	}

	render() {
		const { I18n, transaction, transactionLoading } = this.props
		const { raw, maxStepIcx } = transaction
		const { from, to, value } = raw
		return (
			<div className="wrap remittance">
				<div className="tab-holder no-pointer">
					<ul className="one">
						<li>{I18n.sendTransaction.titleInfo}</li>
					</ul>
				</div>
				<div className="content-wrap">
					<div className="scroll">
						<div className="list-holder">
							<span className="name">{I18n.sendTransaction.sendingAddress}</span>
							<div className="align-r">
								<p>{from}</p>
							</div>
						</div>
						<div className="list-holder coin-num">
							<span className="name">{I18n.sendTransaction.quantity}</span>
							<div className="align-r">
								<p>{convertNumberToText(value, 'icx', true)}<em>ICX</em></p>
							</div>
						</div>
						<div className="list-holder coin-num">
							<span className="name">{I18n.sendTransaction.txFeeIcx}</span>
							<div className="align-r">
								<p>{convertNumberToText(maxStepIcx, 'icx', true)}<em>ICX</em></p>
							</div>
						</div>
						<div className="list-holder">
							<span className="name">{I18n.sendTransaction.receivingAddress}</span>
							<div className="align-r">
								<p>{to}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="footer cols-2">
					<button className="btn-type-normal" onClick={this.revertTransaction} disabled={transactionLoading}><span>{I18n.button.back}</span></button>
					{transactionLoading ?
						<button className="btn-type-ok load">
							<span><LoadingComponent type="black" style={{height: '8px', display: '-webkit-inline-box'}}/></span>
						</button>
						:
						<button className="btn-type-ok" onClick={this.confirmTransaction}>
							<span>{I18n.button.transfer}</span>
						</button>
					}
				</div>
			</div>
		);
	}
}

export default CheckTransaction;
