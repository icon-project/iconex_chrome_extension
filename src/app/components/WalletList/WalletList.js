/** @format */

import React, { Component } from "react";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Icx from "@ledgerhq/hw-app-icx";
// import "./style/common.css";
import "./style/popup-front.css";
import "./style/common-front.css";
import "./style/font.css";
import I18n from "./I18n.js";
import { generateHashKey, convertNumberToText, handleCopy } from "./utils";
import LoadingComponent from "./LoadingComponent";

let queryString = require("qs");

const UNIT = 5;
const COPY_STATE = {
  off: "",
  on: "복사완료",
};
const POPUP_TYPE = {
  INITIAL: "INITIAL",
  TRANSFER: "TRANSFER",
  VOTING: "VOTING",
};

class WalletList extends Component {
  static icx;

  constructor(props) {
    super(props);
    const message = this.props;

    this.state = {
      method: message.method,
      walletLoading: false,
      walletIndex: 0,
      walletList: [],

      path: message.path,
      popupType: message.popupType,
      lang: message.language || "kr",
      i18n: I18n[message.language || "kr"],
      copyState: COPY_STATE["off"],
      copyIndex: -1,
      error: "",
    };
  }

  getBalance = async (inputArr) => {
    let list = await this.props.eventHandler(
      JSON.stringify({
        method: "icx_getBalance",
        payload: inputArr,
      })
    );
    return new Promise((resolve) => {
      resolve(list);
    });
  };

  checkError = async (callback) => {
    try {
      this.setState({ walletLoading: true });
      await this.initLedgerTransport();

      const path = `44'/4801368'/0'/0'/${0}'`;
      const { address } = await WalletList.icx.getAddress(path, false, true);
      callback();
    } catch (error) {
      console.log("checkError : ", error);
      this.props.eventHandler(JSON.stringify({ error }));
    }
  };

  getAddress = async (index, callback) => {
    try {
      this.setState({ walletLoading: true });
      await this.initLedgerTransport();

      let walletList = [],
        paramArr = [],
        balanceArr = [];
      let last_address = "";
      for (let i = index * UNIT; i < index * UNIT + UNIT; i++) {
        const path = `44'/4801368'/0'/0'/${i}'`;
        const { address } = await WalletList.icx.getAddress(path, false, true);
        const _address = address.toString();
        if (last_address === _address) {
          i -= 1
        }
        if (last_address !== _address) {
          walletList.push({
            path,
            account: _address,
          });
          paramArr.push(_address);
        }
        last_address = _address;
      }
      balanceArr = await this.getBalance(paramArr);
      walletList = walletList.map((wallet, i) => {
        return {
          ...wallet,
          balance: balanceArr[i].balance,
          isStakedValueNone: balanceArr[i].isStakedValueNone,
        };
      });
      this.setState({ walletList, walletLoading: false }, callback);
    } catch (error) {
      this.props.eventHandler(JSON.stringify({ error }));
    }
  };

  moveWalletList = (index) => {
    this.getAddress(index, () => {
      this.setState({ walletIndex: index });
    });
  };

  initLedgerTransport = async () => {
    try {
      if (!WalletList.icx) {
        const transport = await TransportWebHID.create();
        transport.setDebugMode(false);
        WalletList.icx = new Icx(transport);
      }
    } catch (error) {
      this.props.eventHandler(JSON.stringify({ error }));
    }
  };

  signTransaction = async (path, param) => {
    try {
      let result = {};
      let rawTx = { ...param };
      const isV3 = rawTx.networkVer === "v3";
      delete rawTx.lang;
      delete rawTx.method;
      delete rawTx.path;
      delete rawTx.networkVer;
      delete rawTx.popupType;
      // console.log("rawTx:", rawTx);
      let tx_params = queryString.parse(rawTx["queryToString"]);
      // console.log("tx_params:", tx_params);
      const phraseToSign = generateHashKey(tx_params);
      await this.initLedgerTransport();
      const signedData = await WalletList.icx.signTransaction(
        path,
        phraseToSign
      );
      const { signedRawTxBase64, hashHex } = signedData;
      tx_params["signature"] = signedRawTxBase64;

      if (!isV3) {
        tx_params["tx_hash"] = hashHex;
      }

      result = {
        method: "setRawTx",
        payload: {
          ...tx_params,
        },
      };

      this.props.eventHandler(JSON.stringify(result));
    } catch (error) {
      this.props.eventHandler(JSON.stringify({ error }));
    } finally {
    }
  };

  sendTransactionErrorHandler = (event) => {
    const { data, source } = event;
    const parsedData = JSON.parse(data);
    const { method } = parsedData;

    switch (method) {
      case "closeLedger":
        throw new Error(method);
      default:
        break;
    }
  };

  openAccountInfoOnTracker = async (wallet) => {
    const param = {
      method: "openAccountInfoOnTracker",
      payload: wallet.account,
    };
    this.props.eventHandler(JSON.stringify(param));
  };

  setSelectedAccount = async (wallet, action) => {
    if (wallet.balance === "0" && wallet.isStakedValueNone) {
      this.props.eventHandler(
        JSON.stringify({
          method: "setBalanceError",
        })
      );
      return;
    }
    const param = {
      method: "setWallet",
      action,
      payload: {
        ...wallet,
        tokens: {},
        type: "icx",
      },
    };
    this.props.eventHandler(JSON.stringify(param));

    // window.parent.postMessage(JSON.stringify(param), "*");
  };

  handleCopy = (e, index) => {
    e.stopPropagation();
    const { copyState, walletList } = this.state;
    // console.log(walletList[index].account);
    handleCopy(
        `span.copyLedgerKey${index}`,
        index,
        copyState,
        this.setState.bind(this)
    );
  };


  componentDidMount() {
    console.log("Run Component Did Mount", this.state.method, this.state);
    switch (this.state.method) {
      case "getBalance":
        this.checkError(() => {
          this.moveWalletList(0);
        });
        break;
      case "sendTransaction":
        const param = {
          ...this.props,
        };
        this.checkError(() => {
          this.signTransaction(this.state.path, param);
        });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      walletLoading,
      walletIndex,
      walletList,
      popupType,
      i18n,
      lang,
      copyState,
      copyIndex,
      error,
    } = this.state;
    const startIndex = walletIndex * UNIT;

    return (
      <div
        className="wallet-list-wrap"
        style={{
          // width: 1160,
          // height: 568,
          height: 420,
          width: 1060,
          padding: 10,
        }}
      >
        <div className="scroll-holder">
          <div className="tabbox-holder-a">
            <div className="box">
              <div className="scroll autoH">
                <table className="table-typeF">
                  <thead>
                    <tr>
                      <th>{i18n.table1}</th>
                      <th>{i18n.table2}</th>
                      {/*<th align="right">{i18n.table3}</th>*/}
                      <th>{i18n.table3}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
              <div className="table-holder scroll" style={{ height: 252 }}>
                {!walletLoading ? (
                  <table className="table-typeF">
                    <tbody>
                      {walletList.map((wallet, index) => (
                        <tr key={index}>
                          <td>{startIndex + index + 1}</td>
                          <td>
                            <p
                              className={`link ${
                                copyIndex === index ? "complete" : ""
                              }`}
                              onClick={(e) => this.handleCopy(e, index)}
                            >
                              <span className={`ellipsis copyLedgerKey${index}`}>
                                {wallet.account}
                              </span>
                              {copyState === COPY_STATE["on"] ? (
                                <em>{i18n.button.copyFinish}</em>
                              ) : (
                                <em>{i18n.button.copyDepositAddress}</em>
                              )}
                            </p>
                          </td>
                          <td>
                            {`${convertNumberToText(wallet.balance)}`} ICX
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <button
                              onClick={() =>
                                this.openAccountInfoOnTracker(wallet)
                              }
                              className="btn-type-link"
                            >
                              <span>{i18n.button.tracker}</span>
                            </button>
                            {(popupType === POPUP_TYPE.INITIAL ||
                              popupType === POPUP_TYPE.TRANSFER) && (
                              <button
                                onClick={() =>
                                  this.setSelectedAccount(
                                    wallet,
                                    POPUP_TYPE.TRANSFER
                                  )
                                }
                                className="btn-type-exchange"
                              >
                                <span>{i18n.button.transfer}</span>
                              </button>
                            )}
                            {(popupType === POPUP_TYPE.INITIAL ||
                              popupType === POPUP_TYPE.VOTING) && (
                              <button
                                onClick={() =>
                                  this.setSelectedAccount(
                                    wallet,
                                    POPUP_TYPE.VOTING
                                  )
                                }
                                className="btn-type-exchange"
                              >
                                <span>{i18n.button.vote}</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="table-typeF">
                    <tbody>
                      <tr className="main">
                        <td style={{ height: 252 }} colSpan="5">
                          <LoadingComponent type="black" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <Pagination
              disable={walletLoading}
              page={walletIndex + 1}
              changePage={(i) => this.moveWalletList(i - 1)}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Pagination extends Component {
  render() {
    const { page, changePage, disable } = this.props;
    const pagination = () => {
      const pageNum = [];
      let initNum, maxNum;
      initNum = page - 1 < 2 ? 1 : page - 2;
      maxNum = initNum + 4;

      for (let i = initNum; i <= maxNum; i++) {
        pageNum.push({
          num: i,
        });
      }

      return (
        <div className="pager-holder">
          <ul className="">
            <li className="controller">
              <a
                className={`prev start ${page === 1 && "disabled"}`}
                onClick={() => {
                  if (!disable && page !== 1) changePage(1);
                }}
              >
                <em className="_img"></em>
              </a>
            </li>
            &nbsp;
            <li className="controller">
              <a
                className={`prev start2 ${page === 1 && "disabled"}`}
                onClick={() => {
                  if (!disable && page - 1 >= 1) changePage(page - 1);
                }}
              >
                <em className="_img"></em>
              </a>
            </li>
            {pageNum.map((btn) => {
              return (
                <li
                  className={`${btn.disabled && "disabled"} ${
                    page === btn.num && "selected"
                  }`}
                  key={btn.num}
                >
                  <a
                    className="number"
                    onClick={() => {
                      if (!disable && !btn.disabled && page !== btn.num)
                        changePage(btn.num);
                    }}
                  >
                    {btn.num}
                  </a>
                </li>
              );
            })}
            <li className="controller">
              <a
                className={`next end`}
                onClick={() => {
                  if (!disable) changePage(page + 1);
                }}
              >
                <em className="_img"></em>
              </a>
            </li>
            &nbsp;
            <li className="controller">
              <a
                className={`next end2`}
                onClick={() => {
                  if (!disable) changePage(page + 5);
                }}
              >
                <em className="_img"></em>
              </a>
            </li>
          </ul>
        </div>
      );
    };

    return pagination();
  }
}

export default WalletList;
