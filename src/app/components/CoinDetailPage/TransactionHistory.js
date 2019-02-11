import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/';
import { dateFormat as DATE_FORMAT } from 'constants/index';
import { ETH_SCAN, txidUrl as TXID_URL } from 'constants/config.js'
import { convertNumberToText, check0xPrefix, calcMaxPageNum } from 'utils'
import moment from 'moment';
import withLanguageProps from 'HOC/withLanguageProps';
import { IS_V3 } from 'constants/config.js';

@withLanguageProps
class TransactionHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: this.props.walletCoinType === 'icx' ? 'complete' : 'pending',
      page: 1
    };
  }

  componentWillMount() {
    const { account, walletCoinType, tokenData } = this.props;
    const contractAddress = this.props.tokenData ? tokenData.contractAddress : ''
    console.log(contractAddress)
    if (walletCoinType === 'icx') {
      this.props.fetchTransactionHistory({
        account,
        walletCoinType,
        contractAddress,
        isPending: false
      });
    }
  }

  changeTab = (e) => {
    const { account, walletCoinType, tokenData, wallets } = this.props;
    const target = e.target.getAttribute('data-id');
    if(this.state.tab === target) return false;
    this.setState({
      tab: target,
      page: 1
    }, () => {
      const contractAddress = this.props.tokenData ? tokenData.contractAddress : ''
      console.log(contractAddress, account)
      const pendingList = contractAddress ? wallets[account].tokens[contractAddress]['pendingTransaction'] : wallets[account]['pendingTransaction']
      console.log(pendingList)
      const isPending = this.state.tab === "pending" ? true : false;
      this.props.fetchTransactionHistory({
        account,
        walletCoinType,
        contractAddress,
        isPending,
        pendingList: isPending ? pendingList : [],
        page: 1
      })
      if (contractAddress) {
        this.props.fetchTokenBalance(contractAddress, contractAddress, tokenData.decimals, account, walletCoinType);
      } else {
        this.props.fetchCoinBalance(account, walletCoinType);
      };
    })
  }

  changePage = (num) => {
    const { account, walletCoinType, tokenData } = this.props;
    this.setState({
      tab: this.state.tab,
      page: num
    }, () => {
      const contractAddress = this.props.tokenData ? tokenData.contractAddress : ''
      const isPending = this.state.tab === "pending" ? true : false;
      this.props.fetchTransactionHistory({
        account,
        walletCoinType,
        contractAddress,
        isPending,
        page: num
      });
    })
  }

  render() {
    const {
      tab,
      page
    } = this.state;

    const {
      txHistory,
      txHistoryLoading,
      walletCoinType,
      account,
      totalData,
      tokenData = {},
      I18n
    } = this.props;

    const isPending = this.state.tab === "pending" ? true : false;

    const noTransaction = (walletCoinType, tab) => {
      switch(tab) {
        case 'pending':
          return (
            <tr><td colSpan="4" className="nodata">{I18n.coinDetailHistoryNoTransactionDefault}</td></tr>
          )
        case 'complete':
          if (walletCoinType === 'icx') {
            return (
              <tr><td colSpan="4" className="nodata">{I18n.coinDetailHistoryNoTransactionDefault}</td></tr>
            )
          } else {
            return (
              <tr>
                <td colSpan="4" className="nodata">
                  <p>
                    {I18n.coinDetailHistoryNoTransactionEth.split('\n').map((item, key) => {
                      return <span key={key}>{item}<br/></span>
                    })}
                  </p><br/><br/>
                  <p>
                    <a href={`${ETH_SCAN()}/address/${check0xPrefix(account)}`} target="_blank"><span>{`https://etherscan.io/`}</span></a>
                  </p>
                </td>
              </tr>
            )
          }
        default:
          break;
      }
    }

    return (
      <div className={`wrap-holder ${walletCoinType === "eth" ? 'nodata' : ''}`}>
        <h2>{I18n.coinDetailHistoryTitle}</h2>
        {
          walletCoinType === 'icx' && (
            <p className="listsort">
              <span data-id="pending" onClick={this.changeTab} className={tab === 'pending' && 'on'}>{I18n.coinDetailHistoryPending}</span>
              <span className="gap">|</span>
              <span data-id="complete" onClick={this.changeTab} className={tab === 'complete' && 'on'}>{I18n.coinDetailHistoryCompleted}</span>
            </p>
          )
        }
        {
          walletCoinType === 'icx' &&
            (txHistoryLoading
              ? (
                  <table className="table-typeB">
                    <thead>
                      <tr>
                        <th>{isPending ? I18n.coinDetailHistoryColumn0 : I18n.coinDetailHistoryColumn1}</th>
                        <th>{I18n.coinDetailHistoryColumn2}</th>
                        <th>{I18n.coinDetailHistoryColumn3}</th>
                        <th>{I18n.coinDetailHistoryColumn4}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="4" className="nodata"><LoadingComponent type="black" /></td>
                      </tr>
                    </tbody>
                  </table>
                )
              : (
                  <table className="table-typeB">
                    <thead>
                      <tr>
                        <th>{isPending ? I18n.coinDetailHistoryColumn0 : I18n.coinDetailHistoryColumn1}</th>
                        <th>{I18n.coinDetailHistoryColumn2}</th>
                        <th>{I18n.coinDetailHistoryColumn3}</th>
                        <th>{I18n.coinDetailHistoryColumn4}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        txHistory.length > 0
                          ? (
                                txHistory.map((row, i) => {
                                    console.log(row)
                                    const newRow = {
                                        to: row.address || row.toAddr,
                                        time: row.time || row.age || row.createDate,
                                        txid: row.txid || row.txHash,
                                        value: row.quantity || row.amount,
                                        isFail: isPending ? (row["isFail"]) : (row["state"] === 0),
                                        unit: tokenData['defaultSymbol'] || row.symbol || walletCoinType
                                    }
                                    const isUp = newRow.to === account
                                    return (
                                      <HistoryRow key={i}
                                        time={newRow.time ? moment(newRow.time).format(DATE_FORMAT) : '-'}
                                        type={isUp ? I18n.deposit : I18n.withdraw}
                                        txid={newRow.txid}
                                        isFail={newRow.isFail}
                                        failText={I18n.coinDetailHistoryFail}
                                        isUp={isUp}
                                        value={convertNumberToText(newRow.value, 'transaction', true)}
                                        walletCoinType={walletCoinType}
                                        unit={newRow.unit}/>
                                    )
                                })
                            )
                          : noTransaction(walletCoinType, tab)
                        }
                    </tbody>
                  </table>
              )
            )
        }
        {
          (tab === "pending" && walletCoinType === 'icx') && (
            <div className="">
              <p className="lock-txt"><em className="_img"></em>{I18n.coinDetailHistoryPendingInfo}</p>
            </div>
          )
        }
        {
          walletCoinType === 'eth' && (
            <table className="table-typeB">
              <tbody>
    						<tr>
      						<td colSpan="4" className="nodata"><p>{I18n.coinDetailHistoryNoTransactionEth}</p><br/>
      							<p><a href={`${ETH_SCAN()}/address/${check0xPrefix(account)}`} target="_blank">{`https://etherscan.io/`}</a></p>
      						</td>
    						</tr>
    					</tbody>
            </table>
          )
        }

        {
          (tab === "complete" && txHistory.length > 0) && <Pagination walletCoinType={walletCoinType} totalData={totalData} page={page} changePage={this.changePage}/>
        }
      </div>
    );
  }
}

class Pagination extends Component {
  render() {
    const { walletCoinType, totalData, page, changePage } = this.props
    const pagination = (_walletCoinType) => {
      const maxPage = calcMaxPageNum(totalData, 10)
      const pageNum = []
      let initNum, maxNum
      if (maxPage <= 10) {
        initNum = 1
        maxNum = maxPage
      }
      else {
        initNum = page - 1 < 2 ? 1 : page - 2;
        maxNum = initNum + 9;
        if (maxNum > maxPage) {
          maxNum = maxPage
          initNum = maxNum - 9
        }
      }

      for (let i=initNum; i<=maxNum; i++) {
        pageNum.push({
          num: i,
          disabled: i > maxPage
        })
      }

      if (_walletCoinType === 'icx') {
        return (
          <div className="pager-holder">
            <ul className="">
              <li className="controller">
                <a className={`prev start ${page === 1 && 'disabled'}`}
                  onClick={()=>{
                    if (page !== 1) changePage(1)
                  }}
                >
                  <em className="_img"></em>
                </a>
              </li>
              <li className="controller">
                <a className={`prev start2 ${page === 1 && 'disabled'}`}
                  onClick={()=>{
                    if (page - 1 >= 1) changePage(page - 1)
                  }}
                >
                  <em className="_img"></em>
                </a>
              </li>
              {pageNum.map(btn => {
                return (
                  <li className={`${btn.disabled && 'disabled'} ${page === btn.num && 'selected'}`} key={btn.num}>
                    <a className="number"
                      onClick={()=>{
                        if (!btn.disabled && page !== btn.num) changePage(btn.num)
                      }}
                    >
                      {btn.num}
                    </a>
                  </li>
                )
              })}
              <li className="controller">
                <a className={`next end ${page === maxPage && 'disabled'}`}
                  onClick={()=>{
                    if (page + 1 <= maxPage) changePage(page + 1)
                  }}
                >
                  <em className="_img"></em>
                </a>
              </li>
              <li className="controller">
                <a className={`next end2 ${page === maxPage && 'disabled'}`}
                 onClick={()=>{
                   if (page !== maxPage) changePage(maxPage)}}
                 >
                   <em className="_img"></em>
                 </a>
              </li>
            </ul>
          </div>
        )
      } else { return (<div></div>) }
    }

    return (
      pagination(walletCoinType)
    )
  }
}

class HistoryRow extends Component {

  handleTxidClick = () => {
      const txidUrl = TXID_URL[this.props.walletCoinType];
      window.open(IS_V3 ? `${txidUrl}${check0xPrefix(this.props.txid)}` : `${txidUrl}${this.props.txid}`, '_blank');
  }

  render() {
    const { time, type, txid, isUp, value, unit, isFail, failText } = this.props;
    return (
      <tr>
        <td>{time}</td>
        <td>{type}</td>
        <td onClick={this.handleTxidClick}><span>{txid}</span><em className="_img"></em></td>
        { isFail ? (
          <td className={'down'}>{failText}</td>
        ) : (
          <td className={isUp ? 'up' : 'down'}>{`${isUp ? '' : '-'} ${value} ${unit.toUpperCase()}`}</td>
        )}
      </tr>
    );
  }
}

export default TransactionHistory;
