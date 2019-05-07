import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { convertNumberToText, fromHexToDec } from 'utils'
import { setIcxWalletServer, icx_getStepPrice, icx_fetchCoinBalanceApi } from 'redux/api/walletIcxApi'
import { routeConstants as ROUTE } from 'constants/index.js';
import { getCurrentServer, icxServerList } from 'constants/config'
import withClickOut from 'HOC/withClickOut'

@withLanguageProps
class SendTransaction extends Component {

	constructor(props) {
		super(props)
		const { wallet, stepLimit } = this.props.transaction
		const { account, name, balance } = wallet || {}
		this.state = {
			account,
			name,
			balance,
			stepLimit: stepLimit || '',
			stepLimitError: '',
			stepPrice: '',
			showServerList: false,
			showTimeList: false,
			time: 0,
			timeList: [0, 15, 30, 45, 60]
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

	updateBalance = async () => {
		const { account } = this.state
		const balance = await icx_fetchCoinBalanceApi(account)
		this.setState({ balance })
	}

	handleChange = (e) => {
		if (!isNaN(e.target.value)) {
			this.setState({ stepLimit: e.target.value })
		}
	}

	handleKeyPress = (e) => {
		if (this.state.stepLimit && e.key === 'Enter') {
			this.confirmTransaction();
		}
	}

	listClick = () => {
		this.setState({ showServerList: true })
	}

	listClickOut = () => {
		this.setState({ showServerList: false })
	}

	closePopup = () => {
		this.props.initExternalState()
		window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
	}

	confirmTransaction = () => {
		const { I18n } = this.props
		const { stepLimit } = this.state
		if (stepLimit) {
			this.cancelClicked = true
			const { stepPrice } = this.state
			this.props.setScoreStep({ stepLimit, stepPrice })
			this.props.history.push(ROUTE['check'])
		}
		else {
			this.setState({ stepLimitError: I18n.error.enterGasPrice_step })
		}
	}

	cancelTransaction = closed => {
		this.cancelClicked = true
		window.chrome.tabs.sendMessage(this.props.tabId, { type: 'CANCEL_JSON-RPC' });
		if (!closed) {
			this.closePopup()
		}
	}

	toggleList = () => {
		this.setState({
			showTimeList: !this.state.showTimeList
		})
	}

	setTime = (t) => {
		this.setState({
			time: t
		})
	}

	render() {
		const { name, balance, stepLimit, stepLimitError, stepPrice, showServerList, showTimeList, time, timeList } = this.state
		const { I18n, rate, transaction } = this.props
		const { icx: icxRate } = rate
		const { param } = transaction
		const { params } = param
		const { to, value } = params

		const valueIcx = window.web3.fromWei(fromHexToDec(value), 'ether')
		const valueUsd = valueIcx * icxRate
		const stepPriceNum = !isNaN(stepPrice) ? stepPrice : 0
		const stepPriceIcx = window.web3.fromWei(stepPriceNum, 'ether')
		const stepPriceGloop = window.web3.fromWei(stepPriceNum, 'Gwei')
		const stepPriceUsd = stepPriceIcx * icxRate
		const maxStepIcx = stepLimit * stepPriceIcx
		const maxStepUsd = maxStepIcx * icxRate
		const balanceNum = !isNaN(balance) ? balance : 0
		const balanceIcx = balanceNum - maxStepIcx
		const balanceUsd = balanceIcx * icxRate

		const currentServer = getCurrentServer('icx')

		return (
			<div className="wrap remittance">
				<div className="tab-holder">
					<ul className="one no-pointer">
						<li>{I18n.transfer}</li>
					</ul>
					<p className="mainnet b-none" onClick={this.listClick}>{currentServer.toUpperCase()}<em className="_img"></em></p>
					{showServerList &&
						<ServerList
							currentServer={currentServer}
							onClickOut={this.listClickOut}
							getStepPrice={this.getStepPrice}
							updateBalance={this.updateBalance}
						/>
					}
				</div>
				<div className="content-wrap">
					<div className="scroll">
						<div className="list-holder">
							<span className="name">{I18n.transferPageLabel4}</span>
							<div className="align-r">
								<input type="text" className="txt-type-normal" placeholder={name} value="" spellCheck="false" disabled />
							</div>
						</div>
						<div className="list-holder coin-num">
							<span className="name">{I18n.transferPageLabel1}</span>
							<div className="align-r">
								<p>{convertNumberToText(valueIcx, 'icx', true)}<em>ICX</em></p>
								<p className="zero">{convertNumberToText(icxRate, 'usd', false)}<em>USD</em></p>
								<p>{convertNumberToText(valueUsd, 'usd', false)}<em>USD</em></p>
							</div>
						</div>
						<div className="list-holder">
							<span className="name">{I18n.transferPageLabel3}</span>
							<div className="align-r">
								<p>{to}</p>
							</div>
						</div>
						<div className="list-holder">
							<span className="name">{I18n.transferPageLabel7_icx}</span>
							<div className="align-r">
								<input type="text" className={`txt-type-normal${stepLimitError ? ' error' : ''}`} spellCheck="false"
									placeholder={I18n.transferPagePlaceholder5_icx}
									value={stepLimit}
									onChange={this.handleChange}
									onKeyPress={this.handleKeyPress}
								/>
								{stepLimitError && <p className="error">{stepLimitError}</p>}
							</div>
						</div>
						<div className="list-holder price">
							<span className="name">{I18n.transferPageLabel10_icx}</span>
							<div className="align-r">
								<p>
									{convertNumberToText(stepPriceIcx, 'icx', true)}
									<em>ICX ({convertNumberToText(stepPriceGloop, 'icx', true)} Gloop)</em>
									<i className="_img"></i>
									<em>{convertNumberToText(stepPriceUsd, 'usd', false)} USD</em>
								</p>
							</div>
						</div>

						<div className="signing-holder">
							<span className="name">Enable auto signing</span>
							<div className="layer-group" onClick={this.toggleList}>{time === 0 ? 'Don’t automatically sign' : time + ' minutes'}<i className="_img"></i>
							{
								showTimeList &&
								<div className="drop-box">
									<div className="drop-layer">
										<ul>
											{timeList.map((t, i) => {
												return <li key={i} className={timeList[i] === time ? 'on' : ''} onClick={() => {this.setTime(t)}}><span>{t === 0 ? 'Don’t automatically sign' : t + ' minutes'}</span></li>
											})}
										</ul>
									</div>
								</div>
							}    
							</div>

							<p>This allows to <span>www.abcd.com</span> to automatically sign similar transactions on your behalf. Automatic signing is valid until the given.</p>
						</div>

						<div className="list-holder">
							<ul className="change-holder">
								<li>
									<span className="a">{I18n.transferPageLabel5_2}</span>
									<p>
										<span className="b">{convertNumberToText(maxStepIcx, 'icx', true)}<em>ICX</em></span>
										<span className="c"><i className="_img"></i><em>{convertNumberToText(maxStepUsd, 'usd', false)}</em><em>USD</em></span>
									</p>
								</li>
								<li>
									<span className="a">{I18n.transferPageLabel6_2}</span>
									<p>
										<span className="b">{convertNumberToText(balanceIcx, 'icx', true)}<em>ICX</em></span>
										<span className="c"><i className="_img"></i><em>{convertNumberToText(balanceUsd, 'usd', false)}</em><em>USD</em></span>
									</p>
								</li>
							</ul>
						</div>
					</div>


				</div>
				<div className="footer cols-2">
					<button className="btn-type-normal" onClick={() => { this.cancelTransaction() }}><span>{I18n.button.cancel}</span></button>
					<button className="btn-type-ok" onClick={this.confirmTransaction} disabled={!stepLimit || !stepPrice}><span>{I18n.button.transfer}</span></button>
				</div>

			</div>
		);
	}
}

@withClickOut
class ServerList extends Component {
	handleClick = server => {
		this.props.onClickOut()
		if (this.props.currentServer !== server) {
			localStorage.setItem(`icxServer`, server);
			setIcxWalletServer()
			this.props.getStepPrice()
			this.props.updateBalance()	
		}
	}
	render() {
		return (
			<ul className="layer">
				{Object.keys(icxServerList).map(
					(key, index) => {
						const server = icxServerList[key]
						return <li key={index} onClick={() => { this.handleClick(server) }}><span>{server.toUpperCase()}</span></li>
					}
				)}
			</ul>
		)
	}
}

export default SendTransaction;
