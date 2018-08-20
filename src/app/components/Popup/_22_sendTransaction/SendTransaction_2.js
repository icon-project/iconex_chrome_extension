import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withLanguageProps from 'HOC/withLanguageProps';
import { convertNumberToText } from 'utils';
import { IS_V3 } from 'constants/config.js'
import { LoadingComponent } from 'app/components/'


@withRouter
@withLanguageProps
class SendTransaction2 extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading && !nextProps.loading) {
      this.props.setPopupNum(3);
    }
  }

  closePopup = () => {
    switch(this.props.pageType) {
      case 'swap': {
        this.props.openPopup({
          popupType: 'swapToken',
          popupNum: 6
        });
        break;
      }
      case 'contract':
      case 'transaction': {
        this.props.closePopup();
        break;
      }
      default:
        break;
    }
  }

  handleSubmit = () => {
     const {
       selectedAccount,
       selectedTokenId,
       isToken,
       recipientAddress,
       coinQuantity,
       txFeeLimit,
       txFeePrice,
       wallets,
       data,
       privKey,
       loading,
       isLedger,
       ledgerSignedRawTx
     } = this.props;

     switch(this.props.pageType) {
       case 'contract': {
         this.props.executeFunc();
         break;
       }
       case 'swap':
       case 'transaction': {
         if (loading) return;
         if (isLedger) {
           this.props.sendCall('', ledgerSignedRawTx, true);
         } else {
           const sendData = {
             from: selectedAccount,
             to: recipientAddress,
             contractAddress: !isToken ? null : selectedTokenId,
             tokenDefaultDecimal: !isToken ? 18 : wallets[selectedAccount].tokens[selectedTokenId].defaultDecimals,
             tokenDecimal: !isToken ? 18 : wallets[selectedAccount].tokens[selectedTokenId].decimals,
             value: coinQuantity,
             data: data,
             txFeeLimit: txFeeLimit,
             txFeePrice: txFeePrice,
             coinType: wallets[selectedAccount].type
           }
           this.props.sendCall(privKey, sendData);
         }
         break;
       }
       default:
         break;
     }
   }

   renderPageTypeSwitch = () => {
     const { I18n, funcList, txLoading, selectedAccount, selectedFuncIndex, funcInput, coinQuantity, recipientAddress, calcData, pageType, icxSwapAddress, wallets, swapWalletName, isLedger, ledgerTimer, isLedgerConfirmed, language } = this.props;
     const txFee = calcData.txFee

     switch(pageType) {
       case 'swap': {
         return (
           <div className="popup send">
       			<p className="txt_box">{I18n.sendTransaction.titleInfo}</p>
       			<p><span>{I18n.sendTransaction.swapQuantity} : </span><em>{`${convertNumberToText(coinQuantity, 'transaction', true)}`}<i>{`${calcData.coinType.toUpperCase()}`}</i></em></p>
            <p><span>
                 { I18n.sendTransaction.txFeeEth } :
               </span>
               <em>{txFee}
                       <i>{`${calcData.walletCoinType.toUpperCase()}`}</i>
               </em>
            </p>
       		  <p><span>{I18n.sendTransaction.address} : </span><em style={{paddingBottom: '6px'}}>{swapWalletName || wallets[icxSwapAddress].name}</em><em>{icxSwapAddress}</em></p>
       			<div className="btn-holder">
       				<button onClick={this.closePopup} className="btn-type-fill size-del"><span>{I18n.button.cancel}</span></button>
              {
                txLoading ? (<button style={{paddingBottom: 14, paddingTop: 11}} className="btn-type-normal size-del"><span><LoadingComponent type="white" /></span></button>)
                          : (<button onClick={this.handleSubmit} className="btn-type-normal size-del"><span>{I18n.button.swap}</span></button>)
              }
       			</div>
       		</div>
         )
       }
       case 'contract': {
         return (
             <div className="popup">
         			<p className="txt_box">{I18n.sendTransaction.confirmData}</p>
         			<div className="scroll-holder">
         				<div className="scroll">
                  {
                    funcList[selectedFuncIndex].inputs.map((input) => {
                      if (funcInput[input.name]) {
                        return (
                            <div key={input.name}>
                              <p className="title">{input.name}<span>{input.type}</span></p>
                              <p className="address">{funcInput[input.name]}</p>
                            </div>
                        )
                      }
                    })
                  }
                  <p className="title">{I18n.sendTransaction.walletAddress}</p>
                  <p className="address">{selectedAccount}</p>
                  { !!coinQuantity && (<p className="title">{I18n.sendTransaction.sendQuantity}</p>)}
                  { !!coinQuantity && (<p className="address">{`${coinQuantity} ICX`}</p>)}
                  <p className="title">{I18n.sendTransaction.maximumFee}</p>
                  <p className="address">{`${txFee} ICX`}</p>
         				</div>
         			</div>

         			<div className="btn-holder">
         				<button onClick={this.closePopup} className="btn-type-fill size-del"><span>{I18n.button.cancel}</span></button>
         				<button onClick={this.handleSubmit}  className="btn-type-normal size-del"><span>{I18n.button.write}</span></button>
         			</div>
         		</div>
         )
       }
       case 'transaction': {
         const ledgerH1Text = () => {
           if (!isLedgerConfirmed) {
             if (language === 'kr') {
               return `${ledgerTimer}초 내에 Ledger Wallet 제품의 확인 버튼을 누르면 아래 송금 버튼이 활성화 됩니다.`
             } else {
               return `Please press the “Confirm” button on your Ledger within ${ledgerTimer} seconds to activate the “Transfer” button below.`
             }
           } else {
             if (language === 'kr') {
               return `Ledger Wallet 확인이 완료되었습니다. 송금 버튼을 클릭해주세요.`
             } else {
               return `Ledger Wallet has verified your request. Please press the “Transfer” button.`
             }
           }
         }
         return (
           <div className="popup send">
       			<p className="txt_box">{isLedger ? ledgerH1Text() : I18n.sendTransaction.titleInfo}</p>
       			<p><span>{I18n.sendTransaction.quantity} : </span><em>{`${convertNumberToText(coinQuantity, 'transaction', true)}`}<i>{`${calcData.coinType.toUpperCase()}`}</i></em></p>
             <p><span>
                 {
                   calcData.walletCoinType === 'icx'
                     ? I18n.sendTransaction.txFeeIcx
                     : I18n.sendTransaction.txFeeEth
                 } :
               </span>
               <em>{`${calcData.walletCoinType === 'icx'
                       ? (!IS_V3 ? 0.01 : txFee)
                       : txFee }`}
                       <i>{`${calcData.walletCoinType.toUpperCase()}`}</i>
               </em>
             </p>
       		   <p><span>{I18n.sendTransaction.address} : </span><em>{recipientAddress}</em></p>
       			<div className="btn-holder">
       				<button onClick={this.closePopup} className="btn-type-fill size-del"><span>{I18n.button.cancel}</span></button>
       				{
                txLoading ? (<button style={{paddingBottom: 14, paddingTop: 11}} className="btn-type-normal size-del"><span><LoadingComponent type="white" /></span></button>)
                          : (<button disabled={isLedger ? !isLedgerConfirmed : false} onClick={this.handleSubmit} className="btn-type-normal size-del"><span>{I18n.button.transfer}</span></button>)
              }
       			</div>
       		</div>
         )
       }
       default:
         break;
     }
  }

  render() {
    return this.renderPageTypeSwitch()
  }
}


export default SendTransaction2;
