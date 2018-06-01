module.exports = {
    "manifest_version": 2,
    "name": prodDev("ICONex Beta", "ICONex Testnet"),
    "short_name": "ICX Wallet",
    "description": prodDev("ICONex Beta", "ICONex Testnet"),
    "version": process.env.NODE_ENV === 'development' ? `0.${process.env.APP_VERSION}` : `1.${process.env.APP_VERSION}`,
    "background": {
      "scripts": [
        "static/js/store.bundle.js"
      ],
      "persistent": true
    },
    "content_scripts": [
  		{
  			"matches": [
  				"<all_urls>"
  			],
  			"js": [
  				"static/js/contentScript.bundle.js"
  			]
  		}
  	],
    "content_security_policy": "script-src 'self' https://ssl.google-analytics.com; object-src 'self'",
    "icons": { "16": prodDev("icon_16.png", "icon_16_test.png"),
              "32": prodDev("icon_32.png", "icon_32_test.png"),
              "48": prodDev("icon_48.png", "icon_48_test.png"),
              "128": prodDev("icon_128.png", "icon_128_test.png")
              },
    "browser_action": {
      "default_title": prodDev("ICONex Beta", "ICONex Testnet"),
    //  "default_popup": "popup.html"
    },
    "permissions": [
        "storage",
        prodDev("https://wallet.icon.foundation/*", "https://testwallet.icon.foundation/*")
    ]
};

function prodDev(prod, dev) {
  return process.env.NODE_ENV === 'production' ? prod : dev;
}
