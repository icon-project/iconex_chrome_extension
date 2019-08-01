/* eslint-disable array-callback-return */

import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { TxFeeTableContainer } from 'app/containers'
import { LoadingComponent, ClaimIScoreAlerts } from 'app/components'
import { withRouter } from 'react-router-dom';
import {
  routeConstants as ROUTE
} from 'constants/index.js';

const INIT_STATE = {
  alert: '',
}

const ALERT_MSG = {
  SHOW_LEDGER: 'SHOW_LEDGER',
  NO_BALANCE: 'NO_BALANCE',
  SUCCESS: 'SUCCESS',
}

@withRouter
@withLanguageProps
class ClaimIScore extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentDidMount() {
    this.props.getData()
  }

  componentWillUnmount() {
    if (this.props.location.pathname === ROUTE['home']) {
      this.props.resetReducer()
    }
  }

  closePopup = () => {
    this.props.closePopup()
  }

  handleSubmit = () => {
    const {
      loading,
      txLoading,
      claimIScore,
      isNotEnoughBalance,
      isLedger,
    } = this.props

    if (isNotEnoughBalance) {
      this.setState({
        alert: ALERT_MSG.NO_BALANCE,
      })
      return
    }

    if (!loading && !txLoading) {
      if (isLedger) {
        this.setState({
          alert: ALERT_MSG.SHOW_LEDGER,
        })
      } else {
        claimIScore()
      }
    }
  }

  resetAlert = () => {
    this.setState({
      alert: '',
    })
  }

  render() {
    const {
      I18n,
      iScore,
      estimatedICX,
      loading,
      txLoading,
      walletName,
    } = this.props;
    const {
      alert
    } = this.state
    const Title = <p className="txt_box">{I18n.claimIcx.title} <span>({walletName})</span></p>

    return (
      <div>
        <div className="dimmed"></div>
        <div className="popup moving-down">
          {Title}
          {
            loading ? (
              <div style={{ height: '540px' }}>
                <LoadingComponent type='black' />
              </div>
            ) : (
                <div>
                  <div className="box">
                    <p className="txt">{I18n.myStatusIScore_p1} (I-Score)<span>{`${iScore} I-Score`}</span></p>
                    <div className="dot"></div>
                    <p className="txt">{I18n.myStatusIScore_p2} (ICX)<span>{`${estimatedICX} ICX`}</span></p>
                  </div>
                  <TxFeeTableContainer />
                  <div className="btn-holder">
                    <button 
                      onClick={this.closePopup} 
                      className="btn-type-fill size-half">
                        <span>{I18n.button.cancel}</span>
                    </button>
                    <button
                      onClick={this.handleSubmit}
                      className="btn-type-normal size-half">
                      {
                        txLoading
                          ? (<LoadingComponent type='white' />)
                          : (<span>{I18n.button.claim}</span>)
                      }
                    </button>
                  </div>
                </div>
              )
          }
        </div>
        <ClaimIScoreAlerts
          ALERT_MSG={ALERT_MSG}
          alert={alert}
          resetAlert={this.resetAlert}
          {...this.props} />
      </div>
    );
  }
}

export default ClaimIScore;
