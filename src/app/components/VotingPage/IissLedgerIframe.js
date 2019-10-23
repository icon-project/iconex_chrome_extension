import React, { Component } from 'react';
import { LedgerIframe } from 'app/components/';
import withLanguageProps from 'HOC/withLanguageProps';
import { Alert, LoadingComponent } from 'app/components'
import { makeIcxRawTx } from 'utils';
import { ZERO_ADDRESS } from 'constants/index'

@withLanguageProps
class IissLedgerIframe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ledgerTimer: 25,
      ledgerError: ''
    }

    this.timerId = setInterval(this.ledgerTimer, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLedgerConfirmed !== nextProps.isLedgerConfirmed && nextProps.isLedgerConfirmed) {
      clearInterval(this.timerId)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
    this.props.resetLedgerReducer()
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

  handleLedgerSuccess = async (event) => {
    const { data } = event
    const parsedData = JSON.parse(data)
    const { method, payload } = parsedData

    switch (method) {
      case 'setRawTx':
        this.props.confirmLedger(payload)
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

  handleSubmit = () => {
    this.props.handleSubmit()
  }

  makeQuery = () => {
    const { input, from, txFeeLimit, methodName } = this.props
    const _txObj = Object.assign({}, {
      from,
      txFeeLimit,
      contractAddress: ZERO_ADDRESS,
      methodName,
      inputObj: input,
    })
    const rawTx = makeIcxRawTx(true, _txObj);
    return rawTx
  }

  render() {

    const {
      I18n,
      txLoading,
      isLedgerConfirmed,
      ledgerWallet,
      language,
      handleCancel,
    } = this.props
    const {
      ledgerError,
      ledgerTimer
    } = this.state
    const ledgerH1Text = () => {
      if (!isLedgerConfirmed) {
        if (language === 'kr') {
          return `${ledgerTimer}초 내에 Ledger Wallet 제품의 확인 버튼을 누르면 아래 완료 버튼이 활성화 됩니다.`
        } else {
          return `Please press the “Confirm” button on your Ledger within ${ledgerTimer} seconds.`
        }
      } else {
        if (language === 'kr') {
          return `Ledger Wallet 확인이 완료되었습니다. 완료 버튼을 클릭해주세요.`
        } else {
          return `Ledger Wallet has verified your request. Please press the “Submit”.`
        }
      }
    }

    return (
      <div id="alert" style={{ position: 'fixed' }} className='popup-wrap ledger alert'>
        <div>
          <div className="dimmed fade-in"></div>
          <div className="popup send">
            <p style={{paddingTop: 56}} className="txt_box">{ledgerH1Text()}</p>
            <div className="btn-holder full">
              <button
                onClick={handleCancel}
                className="btn-type-fill size-half">
                <span>{I18n.button.cancel}</span>
              </button>
              {
                txLoading
                  ? (<button
                    style={{ paddingBottom: 14, paddingTop: 11 }}
                    className="btn-type-normal size-half">
                    <span><LoadingComponent type="white" /></span>
                  </button>)
                  : (<button
                    disabled={!isLedgerConfirmed}
                    onClick={this.handleSubmit}
                    className="btn-type-normal size-half">
                    <span>{I18n.button.submit}</span>
                  </button>)
              }
            </div>
          </div>
          {
            !ledgerError && (
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
                handleCancel={handleCancel}
                text={this.getErrorText()}
                cancelText={I18n.button.confirm}
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default IissLedgerIframe;