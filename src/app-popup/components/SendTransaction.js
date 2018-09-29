import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { convertNumberToText } from 'utils'
import { icx_getStepPrice } from 'redux/api/walletIcxApi'
import { routeConstants as ROUTE } from 'constants/index.js';

@withLanguageProps
class SendTransaction extends Component {

	constructor(props) {
		super(props)
		this.state = {
			stepLimit: this.props.transaction.stepLimit || '',
			stepLimitError: '',
			stepPrice: '',
		}
		this.cancelClicked = false
	}

	componentWillMount() {
		this.props.getRate('usd')
		this.getStepPrice()

		window.onunload = () => {
			if (!this.cancelClicked) {
				this.cancelTransaction(true)
			}
		}
	}

	getStepPrice = async () => {
		const stepPrice = await icx_getStepPrice()
		this.setState({ stepPrice })
	}

	handleChange = (e) => {
		if (!isNaN(e.target.value)) {
			this.setState({ stepLimit: e.target.value })
		}
	}

	closePopup = () => {
		this.props.initExternalState()
		window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
	}

	confirmTransaction = () => {
		const { stepLimit } = this.state
		if (!stepLimit) {
			this.setState({ stepLimitError: 'Step 한도를 입력해주세요.' })
			return
		}

		this.cancelClicked = true
		const { stepPrice } = this.state
		const stepPriceIcx = window.web3.fromWei(stepPrice, 'ether')
		const maxStepIcx = stepLimit * stepPriceIcx
		this.props.setTransactionStep({ stepLimit, maxStepIcx })
		this.props.history.push(ROUTE['check'])
	}

	cancelTransaction = closed => {
		this.cancelClicked = true
		window.chrome.tabs.sendMessage(this.props.tabId, { type: 'CANCEL_TRANSACTION' });
		if (!closed) {
			this.closePopup()
		}
	}

	render() {
		const { stepLimit, stepLimitError, stepPrice } = this.state
		const { rate, transaction } = this.props
		const { icx: icxRate } = rate
		const { wallet, raw } = transaction
		const { to, value } = raw

		const walletName = wallet ? wallet.name : ''
		const walletBalance = wallet ? wallet.balance : 0

		const stepPriceIcx = window.web3.fromWei(stepPrice, 'ether')
		const stepPriceGloop = window.web3.fromWei(stepPrice, 'Gwei')
		const stepPriceUsd = stepPriceIcx * icxRate
		const maxStepIcx = stepLimit * stepPriceIcx
		const maxStepUsd = maxStepIcx * icxRate
		const balanceIcx = walletBalance - maxStepIcx
		const balanceUsd = balanceIcx * icxRate

		return (
			<div className="wrap remittance">
				<div className="tab-holder">
					<ul className="one">
						<li>송금</li>
					</ul>
				</div>
				<div className="content-wrap">
					<div className="scroll">
						<div className="list-holder">
							<span className="name">지갑 이름</span>
							<div className="align-r">
								<input type="text" className="txt-type-normal" placeholder={walletName} value="" spellCheck="false" disabled />
							</div>

						</div>
						<div className="list-holder coin-num">
							<span className="name">송금할 코인 수량</span>
							<div className="align-r">
								<p>{convertNumberToText(value, 'icx', true)}<em>ICX</em></p>
								<p className="zero">{convertNumberToText(icxRate, 'usd', false)}<em>USD</em></p>
								<p>{convertNumberToText(value * icxRate, 'usd', false)}<em>USD</em></p>
							</div>
						</div>
						<div className="list-holder">
							<span className="name">송금 받는 주소</span>
							<div className="align-r">
								<p>{to}</p>
							</div>
						</div>
						<div className="list-holder">
							<span className="name">Step 한도</span>
							<div className="align-r">
								<input type="text" className={`txt-type-normal${stepLimitError ? ' error' : ''}`} spellCheck="false"
									placeholder="Step 한도 입력"
									value={stepLimit}
									onChange={this.handleChange}
								/>
								{stepLimitError && <p className="error">{stepLimitError}</p>}
							</div>
						</div>
						<div className="list-holder price">
							<span className="name">Step 가격</span>
							<div className="align-r">
								<p>
									{convertNumberToText(stepPriceIcx, 'icx', true)}
									<em>ICX ({convertNumberToText(stepPriceGloop, 'icx', true)} Gloop)</em>
									<i className="_img"></i>
									<em>{convertNumberToText(stepPriceUsd, 'usd', false)} USD</em>
								</p>
							</div>
						</div>
						<div className="list-holder">
							<ul className="change-holder">
								<li>
									<span className="a">예상 최대 수수료</span>
									<span className="b">{convertNumberToText(maxStepIcx, 'icx', true)}<em>ICX</em></span>
									<span className="c"><i className="_img"></i><em>{convertNumberToText(maxStepUsd, 'usd', false)}</em><em>USD</em></span>
								</li>
								<li>
									<span className="a">송금 후 예상 잔액</span>
									<span className="b">{convertNumberToText(balanceIcx, 'icx', true)}<em>ICX</em></span>
									<span className="c"><i className="_img"></i><em>{convertNumberToText(balanceUsd, 'usd', false)}</em><em>USD</em></span>
								</li>
							</ul>
						</div>
					</div>


				</div>
				<div className="footer cols-2">
					<button className="btn-type-normal" onClick={() => { this.cancelTransaction() }}><span>취소</span></button>
					<button className="btn-type-ok" onClick={this.confirmTransaction} disabled={!stepLimit || !stepPrice}><span>송금</span></button>
				</div>

			</div>
		);
	}
}

export default SendTransaction;
