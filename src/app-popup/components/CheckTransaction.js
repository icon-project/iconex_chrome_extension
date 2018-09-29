import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { convertNumberToText } from 'utils'
import { routeConstants as ROUTE } from 'constants/index.js';

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
		const { transaction } = this.props
		const { raw, maxStepIcx } = transaction
		const { from, to, value } = raw
		return (
			<div className="wrap remittance">
				<div className="tab-holder">
					<ul className="one">
						<li>수량과 주소를 한 번 더 확인해 주세요.</li>
					</ul>
				</div>
				<div className="content-wrap">
					<div className="scroll">
						<div className="list-holder">
							<span className="name">보내는 주소</span>
							<div className="align-r">
								<p>{from}</p>
							</div>
						</div>
						<div className="list-holder coin-num">
							<span className="name">송금 수량</span>
							<div className="align-r">
								<p>{convertNumberToText(value, 'icx', true)}<em>ICX</em></p>
							</div>
						</div>
						<div className="list-holder coin-num">
							<span className="name">예상 최대 수수료</span>
							<div className="align-r">
								<p>{convertNumberToText(maxStepIcx, 'icx', true)}<em>ICX</em></p>
							</div>
						</div>
						<div className="list-holder">
							<span className="name">받는 주소</span>
							<div className="align-r">
								<p>{to}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="footer cols-2">
					<button className="btn-type-normal" onClick={this.revertTransaction}><span>이전</span></button>
					<button className="btn-type-ok" onClick={this.confirmTransaction}><span>송금</span></button>
				</div>
			</div>
		);
	}
}

export default CheckTransaction;
