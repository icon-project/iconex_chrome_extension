module.exports = {
    "manifest_version": 2,
    "name": prodDev("ICONex", "ICONex Testnet", "ICONex Developer"),
    "short_name": "ICX Wallet",
    "description": prodDev("ICONex", "ICONex Testnet", "ICONex Developer"),
    "version": prodDev("1." + process.env.APP_VERSION, "0." + process.env.APP_VERSION),
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
    "icons": { "16": prodDev("icon_16.png", "icon_16_test.png", "icon_16_dev.png"),
              "32": prodDev("icon_32.png", "icon_32_test.png", "icon_32_dev.png"),
              "48": prodDev("icon_48.png", "icon_48_test.png", "icon_48_dev.png"),
              "128": prodDev("icon_128.png", "icon_128_test.png", "icon_128_dev.png")
              },
    "browser_action": {
      "default_title": prodDev("ICONex", "ICONex Testnet", "ICONex Developer"),
    },
    "permissions": [
        "storage",
        "https://wallet.icon.foundation/*",
        "https://test-ctz.solidwallet.io/*",
        "https://bicon.net.solidwallet.io/*"
    ]
};

function prodDev(prod, dev, devForDeveloper = '') {
  return process.env.NODE_ENV === 'production'
          ? prod
          : process.env.USER === 'developer' ? devForDeveloper : dev;
}
