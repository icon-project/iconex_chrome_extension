import React, { Component } from 'react';
import { MyWalletHeader, MyWalletContent } from 'components/';
import { coinName as COIN_NAME } from 'constants/index'
import { makeWalletArray, calcTokenBalanceWithRate, customValueToTokenValue, sortTokensByDate } from 'utils';

const INIT_STATE = {
  totalBalance: 0,
  balanceWithRateArr: [],
  dataSortedByCoin: {},
  dataSortedByWallet: [],
  graphData: []
}

class MyWallet extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    if(!this.props.walletsLoading) {
      this.props.fetchAll(this.props.wallets);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.walletsLoading !== nextProps.walletsLoading && nextProps.walletsLoading) {
      this.setState(INIT_STATE);
    }

    if(this.props.totalResultLoading !== nextProps.totalResultLoading && !nextProps.totalResultLoading) {
      this.calcData(nextProps.rate);
    }

    if(this.props.currency !== nextProps.currency && !nextProps.totalResultLoading) {
      this.calcData(nextProps.rate);
    }
  }

  componentWillUnmount() {
    this.setState(INIT_STATE);
    this.props.resetMainPageUIReducer();
  }

  setCoinDataSortedByWallet = (wallet, coinBalanceWithRate, dataSortedByWallet) => {
    dataSortedByWallet.push({
      data: [],
      walletSectionName: wallet.name,
      walletSectionBalance: 0,
      walletSectionBalanceWithRate: 0,
      createdAt: wallet.createdAt,
      coinType: wallet.type,
      account: wallet.account,
    });

    const coinObj = {
      name: COIN_NAME[wallet.type],
      balance: wallet.balance,
      balanceLoading: wallet.balanceLoading,
      balanceWithRate: coinBalanceWithRate,
      symbol: wallet.type,
      recent: wallet.recent,
      account: wallet.account
    }

    dataSortedByWallet[dataSortedByWallet.length-1].data.push(coinObj);
    return dataSortedByWallet;
  }

  setTokenDataSortedByWallet = (wallet, token, tokenBalanceWithRate, dataSortedByWallet) => {
    const tokenObj = {
      name: token.name,
      account: wallet.account,
      balance: token.balance,
      balanceLoading: token.balanceLoading,
      balanceWithRate: tokenBalanceWithRate || null,
      recent: token.recent,
      tokenId: token.address,
      symbol: token.defaultSymbol,
      defaultDecimals: token.defaultDecimals,
      decimals: token.decimals,
    }

    dataSortedByWallet[dataSortedByWallet.length-1].data.push(tokenObj);
    return dataSortedByWallet;
  }

  setCoinDataSortedByCoin = (wallet, coinBalanceWithRate, dataSortedByCoin) => {
    const type = wallet.type;

    if(!dataSortedByCoin["coin"].hasOwnProperty(type)) {
      dataSortedByCoin["coin"][type] = {
        data: [],
        walletSectionName: COIN_NAME[type],
        walletSectionBalance: 0,
        walletSectionBalanceWithRate: 0,
        createdAt: new Date(-8640000000000000),
        coinType: type
      };
    }

    dataSortedByCoin["coin"][type].data.push({
      name: wallet.name,
      account: wallet.account,
      balance: wallet.balance,
      balanceLoading: wallet.balanceLoading,
      symbol: wallet.type,
      balanceWithRate: coinBalanceWithRate,
      recent: wallet.recent,
    });

    dataSortedByCoin["coin"][type].walletSectionBalance += wallet.balance.toNumber()
    dataSortedByCoin["coin"][type].walletSectionBalanceWithRate += coinBalanceWithRate
    if (dataSortedByCoin["coin"][type].createdAt < wallet.createdAt) {
      dataSortedByCoin["coin"][type].createdAt = wallet.createdAt
    }
    return dataSortedByCoin;
  }

  setTokenDataSortedByCoin = (wallet, token, tokenBalanceWithRate, dataSortedByCoin) => {
    const symbol = token.defaultSymbol
    const name = token.defaultName
    const defaultBalance = customValueToTokenValue(token.balance.toNumber(), token.defaultDecimals, token.decimals);

    if(!dataSortedByCoin['token'].hasOwnProperty(symbol)) {
      dataSortedByCoin['token'][symbol] = {
        data: [],
        walletSectionName: name,
        walletSectionBalance: 0,
        walletSectionBalanceWithRate: 0,
        createdAt: 0,
        coinType: symbol,
        name: name
      };
    }

    dataSortedByCoin['token'][symbol].data.push({
      name: wallet.name,
      //index: v,
      account: wallet.account,
      balance: defaultBalance,
      balanceLoading: token.balanceLoading,
      tokenId: token.address,
      symbol: symbol,
      decimals: token.decimals,
      defaultDecimals: token.defaultDecimals,
      balanceWithRate: tokenBalanceWithRate || null,
      recent: token.recent,
    });
    dataSortedByCoin["token"][symbol].walletSectionBalance += defaultBalance;
    if (tokenBalanceWithRate !== null) {
      dataSortedByCoin["token"][symbol].walletSectionBalanceWithRate += tokenBalanceWithRate
    } else {
      dataSortedByCoin["token"][symbol].walletSectionBalanceWithRate = null
    }
    if (dataSortedByCoin["token"][symbol].createdAt < token.createdAt) {
      dataSortedByCoin["token"][symbol].createdAt = token.createdAt
    }

    return dataSortedByCoin
  }

  setGraphData = (dataSortedByCoin) => {

    let coinArr = makeWalletArray(dataSortedByCoin['coin']);
    let tokenArr = makeWalletArray(dataSortedByCoin['token']);

    let dataArr = [...coinArr, ...tokenArr];
    let sortedByTotalBalance = dataArr.sort((a, b) => { return b.walletSectionBalanceWithRate - a.walletSectionBalanceWithRate})
    let filteredGraphArr = sortedByTotalBalance.filter((i) => { return i.walletSectionBalanceWithRate })
    let graphData = filteredGraphArr.map((i) => {return {type: i.coinType, balance: i.walletSectionBalanceWithRate}})

    if (graphData.length > 4) {
      let etcBalance = 0;
      for (let i=4; i<graphData.length; i++) {
        etcBalance += graphData[i].balance;
      }
      graphData = graphData.slice(0,4);
      graphData.push({type: 'etc', balance: etcBalance})
    }
    return graphData;
  }

  calcData = (rate) => {
    let totalBalance = 0;
    let dataSortedByWallet = [];
    let dataSortedByCoin = {"coin": {}, "token": {}};
    let walletArr = makeWalletArray(this.props.wallets);
    for(let i=0; i<walletArr.length; i++) {

      let coinBalanceWithRate = walletArr[i].balance * (rate[walletArr[i].type] || 0)
      dataSortedByWallet = this.setCoinDataSortedByWallet(walletArr[i], coinBalanceWithRate, dataSortedByWallet);
      dataSortedByCoin = this.setCoinDataSortedByCoin(walletArr[i], coinBalanceWithRate, dataSortedByCoin);

      let tokenBalanceWithRateSum = 0;
      const tokens = sortTokensByDate(walletArr[i].tokens);
      if(tokens.length > 0) {
        for(let v=0; v<tokens.length; v++){

          let tokenBalanceWithRate = calcTokenBalanceWithRate(tokens[v].balance, (rate[tokens[v].defaultSymbol.toLowerCase()] || 0), tokens[v].defaultDecimals, tokens[v].decimals)
          if (tokenBalanceWithRate) {
            tokenBalanceWithRateSum += tokenBalanceWithRate;
          }

          dataSortedByWallet = this.setTokenDataSortedByWallet(walletArr[i], tokens[v], tokenBalanceWithRate, dataSortedByWallet);
          dataSortedByCoin = this.setTokenDataSortedByCoin(walletArr[i], tokens[v], tokenBalanceWithRate, dataSortedByCoin);
        }
      }

      let walletBalanceWithRate = coinBalanceWithRate + tokenBalanceWithRateSum;
      dataSortedByWallet[i].walletSectionBalanceWithRate = walletBalanceWithRate;
      totalBalance += walletBalanceWithRate;
    }

    let graphData = this.setGraphData(dataSortedByCoin);

    this.setState({
      totalBalance: totalBalance,
      graphData: graphData,
      dataSortedByWallet: dataSortedByWallet,
      dataSortedByCoin: dataSortedByCoin
    })
  }

  render() {
    return (
      <div>
  			<MyWalletHeader
          totalBalance={this.state.totalBalance}
          dataSortedByCoin={this.state.dataSortedByCoin}
          graphData={this.state.graphData}
          {...this.props} />
        <MyWalletContent
          dataSortedByWallet={this.state.dataSortedByWallet}
          dataSortedByCoin={this.state.dataSortedByCoin}
          {...this.props} />
      </div>
    );
  }
}

export default MyWallet;
