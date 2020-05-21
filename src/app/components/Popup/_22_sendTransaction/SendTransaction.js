import React, { Component } from 'react';
import { SendTransaction1, SendTransaction2, SendTransaction3, LedgerIframe } from 'app/components/';
import withLanguageProps from 'HOC/withLanguageProps';
import { Alert } from 'app/components'
import { customValueToTokenValue, makeIcxRawTx } from 'utils';
import BigNumber from 'bignumber.js';

@withLanguageProps
class SendTransaction extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ledgerTimer: 25,
      ledgerError: ''
    }

    if (props.isLedger) {
      this.timerId = setInterval(this.ledgerTimer, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLedgerConfirmed !== nextProps.isLedgerConfirmed && nextProps.isLedgerConfirmed) {
      clearInterval(this.timerId)
    }
  }

  componentWillUnmount() {
    if (this.props.isLedger) {
      clearInterval(this.timerId)
      this.props.resetLedgerReducer()
    }
    this.props.submitCall(false);
  }

  ledgerTimer = () => {
    this.setState({
      ledgerTimer: this.state.ledgerTimer - 1
    })
    if (this.state.ledgerTimer < 1) {
      this.setState({
        ledgerError: 'timeExceed'
      })
      clearInterval(this.timerId);
    }
  }

  funcInputToHexData(input, inputType) {
    return inputType.reduce((acc, cur) => {
      if (cur.hasOwnProperty('default') && !input[cur.name]) {
        return acc
      }
      if (cur.type === 'int') {
        acc[cur.name] = window.web3.toHex(input[cur.name])
      } else if (cur.type === 'bool') {
        acc[cur.name] = input[cur.name] ? '0x1' : '0x0'
      } else {
        acc[cur.name] = input[cur.name]
      }
      return acc
    }, {});
  }

  makeQuery = () => {
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
      dataType,
      isLedger,
      ledgerWallet,
      contractAddress,

      funcList,
      selectedFuncIndex,
      funcInput,
    } = this.props;


    let selectedWallet;
    selectedWallet = isLedger ? ledgerWallet : wallets[selectedAccount]


    let queryObj = {
      from: selectedAccount,
      to: recipientAddress,
      contractAddress: contractAddress || (!isToken ? null : selectedTokenId),
      tokenDefaultDecimal: !isToken ? 18 : selectedWallet.tokens[selectedTokenId].defaultDecimals,
      tokenDecimal: !isToken ? 18 : selectedWallet.tokens[selectedTokenId].decimals,
      value: coinQuantity,
      data: data,
      messageType: dataType,
      txFeeLimit: txFeeLimit,
      txFeePrice: txFeePrice,
      coinType: selectedWallet.type
    }


    if (isToken) {
      const sendAmount = customValueToTokenValue(new BigNumber(coinQuantity), selectedWallet.tokens[selectedTokenId].defaultDecimals, selectedWallet.tokens[selectedTokenId].decimals).times(Math.pow(10, selectedWallet.tokens[selectedTokenId].defaultDecimals)).toString();
      queryObj = Object.assign({}, queryObj, {
        methodName: 'transfer',
        inputObj: {
          "_to": recipientAddress,
          "_value": window.web3.toHex(sendAmount)
        }
      })
    } else if (!!queryObj.contractAddress) {
      const func = funcList[selectedFuncIndex];
      let funcInputHex;
      if (func.inputs.length > 0) {
        funcInputHex = this.funcInputToHexData(funcInput, func.inputs)
      }
      queryObj = Object.assign({}, queryObj, {
        methodName: func['name'],
        inputObj: funcInputHex,
      });
    }

    return makeIcxRawTx(!!queryObj.contractAddress, queryObj)
  }

  handleLedgerSuccess = async (event) => {
    const { data } = event
    const parsedData = JSON.parse(data)
    const { method, payload } = parsedData

    switch (method) {
      case 'setRawTx':
        this.props.confirmLedger(payload)
        // const result = await icx_sendtransaction_v2(payload);
        // source.postMessage(result, '*')
        break;
      default:
        break;
    }
  }

  handleLedgerError = (e) => {
    clearInterval(this.timerId)
    let error;
    if (e.name === 'TransportStatusError' && e.statusCode === 27013) {
      error = 'deniedByUser'
    } else {
      error = 'connectionError'
    }
    this.setState({
      ledgerError: error
    })
  }

  getErrorText = () => {
    const { I18n } = this.props;
    const { ledgerError } = this.state;
    switch (ledgerError) {
      case 'timeExceed':
        return I18n.error.ledgerTimeout
      case 'deniedByUser':
        return I18n.error.deniedByUser
      case 'connectionError':
      default:
        return I18n.error.ledgerError;
    }
  }

  render() {
    const {
      I18n, popupNum, tx, txLoading, funcLoading, funcResult, pageType, wallets, selectedAccount, isLedger, ledgerWallet, language
    } = this.props;
    const { ledgerError, ledgerTimer } = this.state;
    const selectedWallet = isLedger ? ledgerWallet : wallets[selectedAccount]


    let currentPayload;
    let currentLoading;
    if(pageType === 'contract') {
      if(isLedger) {
        currentPayload = tx;
        currentLoading = txLoading;
      } else {
        currentPayload = funcResult[0];
        currentLoading = funcLoading;
      }
    } else {
      if(isLedger) {
        currentPayload = tx;
        currentLoading = txLoading;
      } else {
        currentPayload = tx;
        currentLoading = txLoading;
      }
    }

    const content = (num) => {
      switch (num) {
        case 1:
          return <SendTransaction1
            // payload={pageType === 'contract' ? funcResult[0] : tx}
            // loading={pageType === 'contract' ? funcLoading : txLoading}
            payload={currentPayload}
            loading={currentLoading}
            {...this.props}
          />
        case 2:
          return <SendTransaction2
            // payload={pageType === 'contract' ? funcResult[0] : tx}
            // loading={pageType === 'contract' ? funcLoading : txLoading}
            payload={currentPayload}
            loading={currentLoading}
            ledgerTimer={ledgerTimer}
            {...this.props}
          />
        case 3:
          return <SendTransaction3
            // payload={pageType === 'contract' ? funcResult[0] : tx}
            // loading={pageType === 'contract' ? funcLoading : txLoading}
            payload={currentPayload}
            loading={currentLoading}
            selectedWallet={selectedWallet}
            {...this.props}
          />
        default:
          break;
      }
    }

    return (
      <div>
        <div className="dimmed fade-in"></div>
        {content(popupNum)}
        {
          isLedger && !ledgerError && (
            <LedgerIframe
              method={'sendTransaction'}
              path={ledgerWallet.path}
              language={language}
              query={this.makeQuery()}
              handleSuccess={this.handleLedgerSuccess}
              handleError={this.handleLedgerError}
              isHidden={true} />
          )
        }
        {
          ledgerError && (
            <Alert
              handleCancel={this.props.closePopup}
              text={this.getErrorText()}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

export default SendTransaction;
