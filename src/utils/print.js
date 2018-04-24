import QRCode from 'qrcode';
import { coinLabel as COIN_LABEL } from 'constants/index';
import bg from 'image/ticket/bg.png'
import { formatDate } from 'utils'
import i18n from 'constants/i18n'

const OPTION = {
  margin: 0,
  scale: 7,
  color: {
    light: '#fff' // Transparent background
  }
}

function printDom(walletName, coinType, account, privKey, language) {
  return new Promise(resolve => {
    QRCode.toString(account, OPTION, function (err1, accountQr) {
      if (err1) throw err1
      QRCode.toString(privKey, OPTION, function (err2, privKeyQr) {
        if (err2) throw err2
        const I18n = i18n[language ? language : 'kr']

        const htmlString = `
        <head>
        	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
        	<meta http-equiv="X-UA-Compatible" content="IE=edge">
        	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
        	<meta name="format-detection" content="telephone=no">
        	<title>ICONex Paper Wallet</title>
          <script src="static/js/print.bundle.js"></script>
        </head>
        <body>
        	<div class="wrap ticket">
        		<div class="back"><img src="${bg}"></div>
        		<div class="header-wrapper">
        		</div>
        		<div class="content-wrapper">
        			<ul>
        				<li>
        					<div class="txt">
        						<p class="title">${I18n.printPage.addressLabel}</p>
        						<p class="qr">${accountQr}</p>
        						<p class="key">${account}</p>
        						<p class="etc">${I18n.printPage.addressInfo}</p>
        					</div>
        				</li>
        				<li>
        					<div class="label-group txt">
        						<p class="name">${walletName}</p>
        						<p>${formatDate()}</p>
        						<p>${COIN_LABEL[coinType]}</p>
        					</div>
        				</li>
        				<li>
        					<div class="txt">
        						<p class="title">${I18n.printPage.privateKeyLabel}</p>
        						<p class="qr">${privKeyQr}</p>
        						<p class="key">${privKey}</p>
        						<p class="etc">${I18n.printPage.privateKeyInfo}</p>
        					</div>
        				</li>
        			</ul>
        		</div>
        	</div>
        </body>
        `
        resolve(htmlString);
      })
    })
  }).then((dom) => {
    let winPrint = window.open('', '', 'left=0,top=0,toolbar=0,scrollbars=0,status=0');
    winPrint.document.write(dom);
    winPrint.document.close();

    setTimeout(() => {
      winPrint.focus();
      winPrint.print();
    }, 3500)
  });
}

export {
  printDom
}
