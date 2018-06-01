import NotificationManager from 'lib/notification-manager.js'
const notificationManager = new NotificationManager()

window.chrome.browserAction.setPopup({ popup: './popup.html' })

window.chrome.runtime.onConnect.addListener(portFrom => {
	if (portFrom.name === 'iconex-background-content') {
		portFrom.onMessage.addListener(message => {
			const { type } = message
			const popupId = notificationManager.getPopupId()
			switch (type) {
				case 'REQUEST_ADDRESS':
					if (popupId) {
						window.chrome.extension.sendMessage({ type })
					}
					else {
						notificationManager.showPopup({ type })
					}
					break;
				case 'REQUEST_TRANSACTION':
					const { payload } = message
					if (popupId) {
						window.chrome.extension.sendMessage({ type, payload })
					}
					else {
						notificationManager.showPopup({ type, payload: JSON.stringify(payload) })
					}
					break;
				default:
			}
		});
	}
});

window.chrome.runtime.onMessage.addListener(message => {
	const { type } = message
	switch (type) {
		case 'CLOSE_POPUP':
			notificationManager.closePopup()
			break;
		default:
	}
});
