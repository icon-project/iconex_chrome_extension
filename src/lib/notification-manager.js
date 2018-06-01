const extension = require('extensionizer')
const width = 420
const height = 510

function objectToQuery(obj) {
	if (!obj) return ''
	const keys = Object.keys(obj)
	const length = keys.length
	let result = ''
	keys.forEach((key, index) => {
		const last = index === (length - 1)
		result += `${key}=${obj[key]}${last ? '' : '&'}`
	})
	return result
}

class NotificationManager {

  /**
   * A collection of methods for controlling the showing and hiding of the notification popup.
   *
   * @typedef {Object} NotificationManager
   *
   */

  /**
   * Either brings an existing MetaMask notification window into focus, or creates a new notification window. New
   * notification windows are given a 'popup' type.
   *
   */

  popupId = undefined

	getPopupId () {
		return this.popupId
	}

  showPopup (query) {
    this._getPopup((err, popup) => {
      if (err) throw err

      // Bring focus to chrome popup
      if (popup) {
        // bring focus to existing chrome popup
        // extension.windows.update(popup.id, { focused: true })
				extension.windows.switch(popup.id, { focused: true })

      } else {
        // create new notification popup
        extension.windows.create({
          url: `./popup.html?context=notification&${(!!query && typeof query === 'object') ? objectToQuery(query) : ''}`,
          type: 'popup',
          width,
          height,
        }, popup => {this.popupId = popup.id})
      }
    })
  }

  /**
   * Closes a MetaMask notification if it window exists.
   *
   */
  closePopup () {
    // closes notification popup
    this._getPopup((err, popup) => {
      if (err) throw err
      if (!popup) return

      extension.windows.remove(popup.id, () => {this.popupId = null})
    })
  }

  /**
   * Checks all open MetaMask windows, and returns the first one it finds that is a notification window (i.e. has the
   * type 'popup')
   *
   * @private
   * @param {Function} cb A node style callback that to whcih the found notification window will be passed.
   *
   */
  _getPopup (cb) {
    this._getWindows((err, windows) => {
      if (err) throw err
      cb(null, this._getPopupIn(windows))
    })
  }

  /**
   * Returns all open MetaMask windows.
   *
   * @private
   * @param {Function} cb A node style callback that to which the windows will be passed.
   *
   */
  _getWindows (cb) {
    // Ignore in test environment
    if (!extension.windows) {
      return cb()
    }

    extension.windows.getAll({}, (windows) => {
      cb(null, windows)
    })
  }

  /**
   * Given an array of windows, returns the first that has a 'popup' type, or null if no such window exists.
   *
   * @private
   * @param {array} windows An array of objects containing data about the open MetaMask extension windows.
   *
   */
  _getPopupIn (windows) {
    return windows ? windows.find((win) => {
      // Returns notification popup
      return (win && win.type === 'popup')
    }) : null
  }

}

module.exports = NotificationManager
