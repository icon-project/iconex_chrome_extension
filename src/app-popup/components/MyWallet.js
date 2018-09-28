import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/'
import WalletBar from './WalletBar'
import { makeWalletArray, openApp, isEmpty } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';
import Worker from 'workers/wallet.worker.js';
import queryString from 'query-string'
import { signHashcode } from 'utils/iconex'

const INIT_STATE = {
	tab: 'icx',
	data: {
		'icx': [],
		'eth': []
	},
	password: '',
	pwError: '',
	tabId: '',
	error: '',
	confirmLoading: false
}

@withLanguageProps
class MyWallet extends Component {

	constructor(props) {
		super(props);
		this.state = INIT_STATE;

		this.cancelClicked = false
		this.afterCall = false

		this.worker = new Worker();
		this.worker.onmessage = (m) => {
			const { I18n } = this.props;
			const privKey = m.data
			if (!privKey) {
				this.setState({
					confirmLoading: false,
					pwError: I18n.error.pwConfirmError
				})
			}
			else {
				this.afterCall = true
				const { tabId, transaction, score, signing } = this.props;
				if (transaction.raw) {
					this.props.callSendTransaction({
						tabId,
						privKey,
						raw: transaction.raw
					})
				}
				else if (score.param) {
					this.props.callScore({
						tabId,
						privKey,
						param: score.param
					})
				}
				else if (signing.hash) {
					this.props.callSigning({
						tabId,
						privKey,
						hash: signing.hash
					})
				}
			}
		}
	}

	componentWillMount() {
		if (!this.props.walletsLoading) {
			this.props.fetchAll(this.props.wallets);
		}

		window.onunload = () => {
			if (!this.cancelClicked && !this.afterCall) {
				this.cancelPassword()
			}
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.props.walletsLoading !== nextProps.walletsLoading && nextProps.walletsLoading) {
			this.setState(INIT_STATE);
		}

		if (this.props.totalResultLoading !== nextProps.totalResultLoading && !nextProps.totalResultLoading) {
			this.calcData();
		}
	}	

	closePopup = () => {
		this.props.initExternalState()
		this.setState(INIT_STATE)
		window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
	}

	sendAddress = address => {
		window.chrome.tabs.sendMessage(this.props.tabId, { type: 'RESPONSE_ADDRESS', payload: address });
		this.closePopup()
	}

	confirmPassword = fromAddress => {
		const { password } = this.state;
		if (!password) {
			const { I18n } = this.props;
			this.setState({ pwError: I18n.error.pwErrorEnter })
			return
		}

		this.setState({
			confirmLoading: true,
			pwError: ''
		}, () => {
			const { wallets } = this.props;
			const { priv } = wallets[fromAddress];
			this.worker.postMessage({
				priv, pw: password, type: 'sendTransaction'
			});
		})
	}

	cancelPassword = () => {
		this.cancelClicked = true
		
		const { transaction, score, signing } = this.props;
		let type = 'CANCEL'
		if (transaction.raw) {
			type += '_TRANSACTION'
		}
		else if (score.param) {
			type += '_SCORE'
		}
		else if (signing.hash) {
			type += '_SIGNING'
		}

		window.chrome.tabs.sendMessage(this.props.tabId, { type });
		this.closePopup()
	}

	calcData = () => {
		const { wallets } = this.props;
		let { data, tab } = this.state;
		let walletArr = makeWalletArray(wallets);

		walletArr.map((wallet) => {
			data[wallet.type].push(wallet)
			return true
		})

		if (data['icx'].length < 1) {
			tab = 'eth'
		}

		this.setState({
			tab: tab,
			data: data
		})
	}

	goApp = () => {
		openApp();
		window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
	}

	handleTabChange = (e) => {
		const newTab = e.target.getAttribute('data-name');
		this.setState({
			tab: newTab
		});
	}

	handleChange = (e) => {
		this.setState({ password: e.target.value })
	}

	render() {
		const { tab, data, password, pwError, confirmLoading } = this.state;
		const { I18n, totalResultLoading } = this.props;
		const { addressRequest, transaction, score, signing } = this.props
		return (
			<div className="wrap">
				{
					(totalResultLoading || data.length < 1) ? (
						<div style={{ height: '100%' }}>
							<LoadingComponent type="black" />
						</div>
					) : (
							<div>
								<div className="tab-holder">
									<ul className={data['icx'].length > 0 && data['eth'].length > 0 ? 'two' : 'one'}>
										{data['icx'].length > 0 && (<li onClick={this.handleTabChange} data-name={'icx'} className={data['icx'].length > 0 && data['eth'].length > 0 && tab === "icx" ? "on" : ''}>ICX</li>)}
										{data['eth'].length > 0 && (<li onClick={this.handleTabChange} data-name={'eth'} className={data['icx'].length > 0 && data['eth'].length > 0 && tab === "eth" ? "on" : ''}>ETH</li>)}
									</ul>
								</div>

								<div className="content-wrap">
									<div className="scroll">
										<ul className="list-holder">
											{
												data[tab].map((wallet, i) => {
													const from = transaction.from || score.from || signing.from
													const isPwInput = wallet.account === from
													return (
														<WalletBar key={i}
															index={i}
															wallet={wallet}
															password={password}
															handleChange={this.handleChange}
															pwError={pwError}
															confirmLoading={confirmLoading}

															isPwInput={isPwInput}
															sendAddress={this.sendAddress}
															confirmPassword={this.confirmPassword}
															cancelPassword={this.cancelPassword}
															addressRequest={addressRequest}
														/>
													)
												})
											}
										</ul>
									</div>
								</div>
							</div>
						)
				}
				<div onClick={this.goApp} className="footer">
					<p>{I18n.button.goToWallet}<em className="_img"></em></p>
				</div>
			</div>
		);
	}
}

export default MyWallet;
