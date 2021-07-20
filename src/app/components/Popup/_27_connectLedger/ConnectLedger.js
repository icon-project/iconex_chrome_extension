/** @format */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withLanguageProps from "HOC/withLanguageProps";
import { LedgerIframe, Alert } from "app/components";
import { routeConstants as ROUTE } from "constants/index";
import { icx_fetchCoinBalanceApi } from "redux/api/walletIcxApi";
import { getStake } from "redux/api/pRepIissApi";
import { trackerAccountUrl as TRACKER_ACCOUNT_URL } from "constants/config.js";

const INIT_STATE = {
  ledgerInit: false,
  ledgerLoading: false,
  showBalanceError: false,
  error: "",
};

const POPUP_TYPE = {
  INITIAL: "INITIAL",
  VOTING: "VOTING",
  TRANSFER: "TRANSFER",
};

@withRouter
@withLanguageProps
class ConnectLedger extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.closePopup();
  };

  handleStartLedger = () => {
    this.setState({
      ledgerInit: true,
      ledgerLoading: true,
    });
  };

  handleLedgerSuccess = async (event) => {
    console.log("handleLedgerSuccess", event);
    const {
      popupNum,
      history,
      setSelectedWallet,
      setLogInStateForLedger,
      setPopupNum,
      closePopup,
      fetchMyStatusData,
    } = this.props;

    // const { data, source } = event;
    // const parsedData = JSON.parse(data);

    const parsedData = JSON.parse(event);
    const { method, payload, action = "" } = parsedData;

    console.log("parsedData", parsedData);
    if (popupNum === 1) setPopupNum(2);

    switch (method) {
      case "icx_getBalance":
        const balanceArr = await Promise.all([
          await icx_fetchCoinBalanceApi(payload[0]),
          await icx_fetchCoinBalanceApi(payload[1]),
          await icx_fetchCoinBalanceApi(payload[2]),
          await icx_fetchCoinBalanceApi(payload[3]),
          await icx_fetchCoinBalanceApi(payload[4]),
        ]);
        const stakedArr = await Promise.all([
          await getStake({ account: payload[0] }),
          await getStake({ account: payload[1] }),
          await getStake({ account: payload[2] }),
          await getStake({ account: payload[3] }),
          await getStake({ account: payload[4] }),
        ]);
        const isStakedValueNoneArr = stakedArr.map((staked) => {
          return (
            !!staked.error ||
            (!Number(staked.payload.stake) &&
              (!staked.payload.unstake || staked.payload.unstakes.length === 0))
          );
        });
        const resultArr = balanceArr.map((balance, i) => {
          return {
            balance: balance.toString(),
            isStakedValueNone: isStakedValueNoneArr[i],
          };
        });
        // source.postMessage(resultArr, "*");
        console.log("icx_getBalance result Arr", resultArr);
        return resultArr;

      case "setWallet":
        setLogInStateForLedger({
          isLoggedIn: true,
          ledgerWallet: payload,
        });
        setSelectedWallet({
          account: payload.account,
        });
        closePopup();
        if (action === POPUP_TYPE.TRANSFER) {
          if (!(this.getPopupType() === POPUP_TYPE.TRANSFER)) {
            history.push({
              pathname: ROUTE["transaction"],
            });
          }
        }
        if (action === POPUP_TYPE.VOTING) {
          if (!(this.getPopupType() === POPUP_TYPE.VOTING)) {
            history.push({
              pathname: ROUTE["voting"],
            });
          }
        }
        break;
      case "openAccountInfoOnTracker":
        window.open(`${TRACKER_ACCOUNT_URL["icx"]}${payload}`);
        break;
      case "setBalanceError":
        this.setState({
          showBalanceError: true,
        });
        break;
      default:
        break;
    }
  };

  handleLedgerError = (error) => {
    this.props.setPopupNum(1);
    this.setState({
      ledgerInit: false,
      ledgerLoading: false,
      error,
    });
  };

  closeAlert = () => {
    this.setState({
      showBalanceError: false,
    });
  };

  getPopupType = () => {
    const { pathname } = this.props.location;
    switch (pathname) {
      case "/":
        return POPUP_TYPE.INITIAL;
      case "/voting":
        return POPUP_TYPE.VOTING;
      case "/transaction":
        return POPUP_TYPE.TRANSFER;
      default:
        return POPUP_TYPE.INITIAL;
    }
  };

  render() {
    const { I18n, popupNum, language, location } = this.props;

    const { ledgerLoading, ledgerInit, showBalanceError, error } = this.state;
    const popupType = this.getPopupType();

    return (
      <div>
        <div className="dimmed fade-in"></div>
        <div
          style={popupNum === 2 ? { height: 508 } : {}}
          className={`
            popup
            ${popupNum === 2 ? "address wallet" : ""}
            ${error ? "fail" : ""}
            moving-down
            `}
        >
          {popupNum === 1 && (
            <div>
              <p className="txt_box">
                {!error
                  ? I18n.connectLedger.title
                  : I18n.connectLedger.connectError}
              </p>
              {ledgerLoading ? (
                <div className="loading-holder">
                  <i className="loading black"></i>
                </div>
              ) : (
                <p
                  className="txt"
                  ref={(ref) => {
                    if (ref)
                      ref.innerHTML = !error
                        ? I18n.connectLedger.desc
                        : I18n.connectLedger.descError;
                  }}
                />
              )}
              <a
                href={`./resource/${I18n.connectLedger.manualFileName}.pdf`}
                target="_blank"
              >
                <p className="mint">{I18n.connectLedger.info}</p>
              </a>
              <div className="btn-holder full">
                <button
                  onClick={this.closePopup}
                  className="btn-type-fill size-half"
                >
                  <span>{I18n.button.close}</span>
                </button>
                <button
                  onClick={this.handleStartLedger}
                  className="btn-type-normal size-half"
                >
                  <span>
                    {!error ? I18n.button.connect : I18n.button.retry}
                  </span>
                </button>
              </div>
            </div>
          )}
          {popupNum === 2 && (
            <div>
              <span className="close" onClick={this.closePopup}>
                <em className="_img"></em>
              </span>
              <h1 className="title">
                {I18n.connectLedger.connectWallet}
                <span>{`(44'/4801368'/0'/0')`}</span>
              </h1>
            </div>
          )}

          {ledgerInit && (
            <LedgerIframe
              method={"getBalance"}
              popupType={popupType}
              language={language}
              handleSuccess={this.handleLedgerSuccess}
              handleError={this.handleLedgerError}
              isHidden={popupNum === 1}
            />
          )}
          {showBalanceError && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.noBalance}
              cancelText={I18n.button.confirm}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ConnectLedger;
