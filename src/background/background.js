import NotificationManager from 'lib/notification-manager.js'
import { icx_callScoreExternally } from 'redux/api/walletIcxApi'
import { getWalletApi } from 'redux/api/walletApi'
import autoSign from './AutoSign'

const notificationManager = new NotificationManager();
const MIN = 60000
const TIMER_TIME = MIN * 10;
const TAB_ARR = [];

let TIMER;
let IS_LOCKED = _initIsAppLocked();

window.chrome.browserAction.setPopup({ popup: './popup.html' })

window.chrome.runtime.onConnect.addListener(portFrom => {
	if (portFrom.name === 'iconex-background-content') {
		portFrom.onMessage.addListener(async message => {
			const { type } = message
			const popupId = notificationManager.getPopupId()
			const isShown = await notificationManager.isShown(popupId)
			const tabId = portFrom.sender.tab.id
			
			switch (type) {
				case 'REQUEST_HAS_ACCOUNT': {
					const wallets = await getWalletApi()
					const hasAccount = Object.keys(wallets).some(address => wallets[address].type === 'icx')
					window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_HAS_ACCOUNT', payload: { hasAccount } });
					break;
				}
				case 'REQUEST_HAS_ADDRESS': {
					const { payload } = message
					const wallets = await getWalletApi()
					const hasAddress = Object.keys(wallets).some(address => address === payload)
					window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_HAS_ADDRESS', payload: { hasAddress } });
					break;
				}
				case 'REQUEST_JSON-RPC': {
					if (message.payload.method !== 'icx_sendTransaction') {
						try {
							const result = await icx_callScoreExternally(message.payload)
							window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_JSON-RPC', payload: result });
						}
						catch (error) {
							window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_JSON-RPC', payload: error });
						}
					} else {
						const { host } = message
						const payload = { 
							tabId, 
							host,
							payload: message.payload
						}
						if (autoSign.isWhitelisted(payload)) {
							try {
								const signedTransaction = autoSign.sign(payload)
								console.log(signedTransaction)
								const result = await icx_callScoreExternally(signedTransaction)
								window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_JSON-RPC', payload: result });
							}
							catch (error) {
								console.log(error)
								window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_JSON-RPC', payload: error });
							}
						} else {
							if (isShown) {
								window.chrome.extension.sendMessage({ type, payload, host })
							} else {
								notificationManager.showPopup({ type, payload, host })
							}
						}
					}
					break
				}
				case 'REQUEST_ADDRESS':
				case 'REQUEST_SIGNING': {
					const { payload: data } = message
					const payload = { tabId, data }
					if (isShown) {
						window.chrome.extension.sendMessage({ type, payload })
					} else {
						notificationManager.showPopup({ type, payload })
					}
					break;
				}
				default:
					break;
			}
		});
	}
});

// if every tab closed, lock the app
window.chrome.tabs.onRemoved.addListener((tabId) => {
	// remove tab id
	const index = TAB_ARR.indexOf(tabId);
	if (index !== -1) TAB_ARR.splice(index, 1);
	// if tabArr empty, lock the app
	if (TAB_ARR.length < 1) {
		_setLockState(true);
	}
});

window.chrome.runtime.onMessage.addListener(message => {
	const { type, payload } = message
	switch (type) {
		case 'SET_AUTO_SIGN':
			autoSign.createTimer(payload)
			break;
		case 'ADD_TAB_ID':
			if (TAB_ARR.indexOf(message.payload) === -1) {
				TAB_ARR.push(message.payload);
			}
			break;
		case 'LOCK':
			if (TIMER) clearInterval(TIMER);
			TIMER = _setTimer();
			break;
		case 'UNLOCK':
			_setLockState(false);
			if (TIMER) clearInterval(TIMER);
			TIMER = _setTimer();
			break;
		case 'CLEAR_LOCK':
			if (TIMER) clearInterval(TIMER);
			break;
		case 'RESET_TIMER':
			if (!_isPasscodeExist()) return;
			if (TIMER) clearInterval(TIMER);
			TIMER = _setTimer();
			break;
		case 'CHECK_APP_LOCK_STATE':
			IS_LOCKED = _checkIsAppLocked();
			window.chrome.extension.sendMessage({ type: type + '_FULFILLED', payload: IS_LOCKED });
			break;
		case 'CHECK_POPUP_LOCK_STATE':
			IS_LOCKED = _checkIsPopupLocked();
			window.chrome.extension.sendMessage({ type: type + '_FULFILLED', payload: IS_LOCKED });
			break;
		case 'CLOSE_POPUP':
			notificationManager.closePopup()
			break;
		case 'REFRESH_LOCK_STATE':
			window.chrome.extension.sendMessage({ type: type + '_FULFILLED', payload: message.payload });
			break;
		default:
			break;
	}
});


function _setTimer() {
	let end = false;
	let timer = setInterval(function () {
		if (end) {
			_setLockState(true);
			clearInterval(timer);
		}
		end = true;
	}, TIMER_TIME);
	return timer;
}

function _initIsAppLocked() {
	const isLocked = _isPasscodeExist();
	return isLocked
}

function _checkIsAppLocked() {
	const passcodeHash = localStorage.getItem('redux') ? JSON.parse(localStorage.getItem('redux')).global.passcodeHash : false;
	const isLocked = passcodeHash ? IS_LOCKED : false
	console.log(passcodeHash, TAB_ARR, isLocked)
	return isLocked
}

function _checkIsPopupLocked() {
	if (TAB_ARR.length > 0) {
		return IS_LOCKED
	} else {
		const passcodeHash = localStorage.getItem('redux') ? JSON.parse(localStorage.getItem('redux')).global.passcodeHash : false;
		console.log(passcodeHash)
		return !!passcodeHash
	}
}

function _setLockState(lockState) {
	IS_LOCKED = (localStorage.getItem('redux') && JSON.parse(localStorage.getItem('redux')).global.passcodeHash) ? lockState : false
	window.chrome.extension.sendMessage({ type: 'SET_LOCK_STATE', payload: IS_LOCKED })
}

function _isPasscodeExist() {
	return (localStorage.getItem('redux') && JSON.parse(localStorage.getItem('redux')).global.passcodeHash) ? true : false
}
