import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/';
import { dateFormat as DATE_FORMAT } from 'constants/index';
import { ETH_SCAN, txidUrl as TXID_URL } from 'constants/config.js'
import { convertNumberToText, check0xPrefix, delete0xPrefix, tokenValueToCustomValue, calcMaxPageNum } from 'utils'
import moment from 'moment';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class TransactionHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: this.props.coinType === 'icx' ? 'complete' : 'pending',
      page: 1
    };
  }

  componentWillMount() {
    const { account, coinType, tokenData } = this.props;
    const tokenAddress = this.props.tokenData ? tokenData.tokenAddress : ''
    if (coinType === 'icx') {
      this.props.fetchTransactionHistory(account, {
        coinType,
        tokenAddress: tokenAddress,
        isPending: coinType === 'icx' ? false : true,
        endBlockNumber: ''
      });
    }
  }

  changeTab = (e) => {
    const { account, coinType, tokenData, wallets} = this.props;
    const target = e.target.getAttribute('data-id');
    if(this.state.tab === target) return false;
    this.setState({
      tab: target,
      page: 1
    }, () => {
      const tokenAddress = this.props.tokenData ? tokenData.tokenAddress : ''
      const isPending = this.state.tab === "pending" ? true : false;
      this.props.fetchTransactionHistory(account, {
        coinType,
        tokenAddress: tokenAddress,
        endBlockNumber: '',
        isPending: isPending,
        pendingList: (coinType === 'icx' && isPending) ? (wallets[account]['pendingTransaction']) : [],
        page: 1
      })
      if (tokenAddress) {
        this.props.fetchTokenBalance(tokenAddress, tokenAddress, tokenData.decimals, account, coinType);
      } else {
        this.props.fetchCoinBalance(account, coinType);
      };
    })
  }

  changePage = (num) => {
    const { account, coinType, tokenData } = this.props;
    this.setState({
      tab: this.state.tab,
      page: num
    }, () => {
      const tokenAddress = this.props.tokenData ? tokenData.tokenAddress : ''
      const isPending = this.state.tab === "pending" ? true : false;
      this.props.fetchTransactionHistory(account, {
        coinType,
        tokenAddress: tokenAddress,
        endBlockNumber: '',
        isPending: isPending,
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
      history,
      historyLoading,
      tokenData,
      coinType,
      account,
      totalData,
      I18n
    } = this.props;

    const noTransaction = (coinType, tab) => {
      switch(tab) {
        case 'pending':
          return (
            <tr><td colSpan="4" className="nodata">{I18n.coinDetailHistoryNoTransactionDefault}</td></tr>
          )
        case 'complete':
          if (coinType === 'icx') {
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
                    <a href={`${ETH_SCAN}/address/${check0xPrefix(account)}`} target="_blank"><span>{`https://etherscan.io/`}</span></a>
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
      <div className={`wrap-holder ${coinType === "eth" ? 'nodata' : ''}`}>
        <h2>{I18n.coinDetailHistoryTitle}</h2>
        {
          coinType === 'icx' && (
            <p className="listsort">
              <span data-id="pending" onClick={this.changeTab} className={tab === 'pending' && 'on'}>{I18n.coinDetailHistoryPending}</span>
              <span className="gap">|</span>
              <span data-id="complete" onClick={this.changeTab} className={tab === 'complete' && 'on'}>{I18n.coinDetailHistoryCompleted}</span>
            </p>
          )
        }
        {
          coinType === 'icx' &&
            (historyLoading
              ? (
                  <table className="table-typeB">
                    <thead>
                      <tr>
                        <th>{I18n.coinDetailHistoryColumn1}</th>
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
                        <th>{I18n.coinDetailHistoryColumn1}</th>
                        <th>{I18n.coinDetailHistoryColumn2}</th>
                        <th>{I18n.coinDetailHistoryColumn3}</th>
                        <th>{I18n.coinDetailHistoryColumn4}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        history.length > 0
                          ? (
                                history.map((row, i) => {
                                  if (coinType !== 'icx') {
                                    const timestamp = row.time.split(" ")[0] * 1000;
                                    return (
                                      <HistoryRow key={i}
                                        time={moment(timestamp).format(DATE_FORMAT)}
                                        type={row.isUp ? I18n.deposit : I18n.withdraw}
                                        txid={row.txid}
                                        status={row['status'] ? row.status : 'success'}
                                        isUp={row.isUp}
                                        value={tokenData ? convertNumberToText(tokenValueToCustomValue(row.value, tokenData.defaultDecimals, tokenData.decimals), 'transaction', true) : convertNumberToText(row.value, 'transaction', true)}
                                        coinType={coinType}
                                        unit={tokenData ? tokenData.symbol : coinType}/>
                                    )
                                  }
                                  else {
                                    const isUp = (row.address || row.toAddr) === account
                                    return (
                                      <HistoryRow key={i}
                                        time={row.time
                                              ? moment(row.time).format(DATE_FORMAT)
                                              : row.createDate ? moment(row.createDate).format(DATE_FORMAT) : '-'}
                                        type={isUp ? I18n.deposit : I18n.withdraw}
                                        txid={row.txid || row.txHash}
                                        status={'success'}
                                        isUp={isUp}
                                        value={convertNumberToText(row.quantity || row.amount, 'transaction', true)}
                                        coinType={coinType}
                                        unit={coinType}/>
                                    )
                                  }
                                })
                            )
                          : noTransaction(coinType, tab)
                        }
                    </tbody>
                  </table>
              )
            )
        }
        {
          (tab === "pending" && coinType === 'icx') && (
            <div className="">
              <p className="lock-txt"><em className="_img"></em>{I18n.coinDetailHistoryPendingInfo}</p>
            </div>
          )
        }
        {
          coinType === 'eth' && (
            <table className="table-typeB">
              <tbody>
    						<tr>
      						<td colSpan="4" className="nodata"><p>{I18n.coinDetailHistoryNoTransactionEth}</p><br/>
      							<p><a href={`${ETH_SCAN}/address/${check0xPrefix(account)}`} target="_blank">{`https://etherscan.io/`}</a></p>
      						</td>
    						</tr>
    					</tbody>
            </table>
          )
        }

        {
          (tab === "complete" && history.length > 0) && <Pagination coinType={coinType} totalData={totalData} page={page} changePage={this.changePage}/>
        }
      </div>
    );
  }
}

class Pagination extends Component {
  render() {
    const { coinType, totalData, page, changePage } = this.props
    const pagination = (_coinType) => {
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

      if (_coinType === 'icx') {
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
      pagination(coinType)
    )
  }
}

class HistoryRow extends Component {

  handleTxidClick = () => {
      const txidUrl = TXID_URL[this.props.coinType];
      if (this.props.coinType === "eth") {
        window.open(txidUrl + check0xPrefix(this.props.txid), '_blank');
      } else {
        window.open(txidUrl + delete0xPrefix(this.props.txid), '_blank');
      }
  }

  render() {
    const { time, type, txid, isUp, value, unit, status } = this.props;
    return (
      <tr>
        <td>{time}</td>
        <td>{type}</td>
        <td onClick={this.handleTxidClick}><span>{txid}</span><em className="_img"></em></td>
        { status === "fail" ? (
          <td className={'down'}>실패</td>
        ) : (
          <td className={isUp ? 'up' : 'down'}>{`${isUp ? '' : '-'} ${value} ${unit.toUpperCase()}`}</td>
        )}
      </tr>
    );
  }
}

export default TransactionHistory;
