import React, { Component } from 'react';
import { MyWalletHeader, MyWalletContent } from 'app/components/';
import { coinName as COIN_NAME } from 'constants/index'
import { getPRep } from 'redux/api/pRepIissApi'
import { makeWalletArray, calcTokenBalanceWithRate, customValueToTokenValue, sortTokensByDate } from 'utils';
import BigNumber from 'bignumber.js';

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
    if (!this.props.walletsLoading) {
      this.props.fetchAll(this.props.wallets);
    }
  }

  async componentWillUpdate(nextProps, nextState) {
    if (this.props.walletsLoading !== nextProps.walletsLoading && nextProps.walletsLoading) {
      this.setState(INIT_STATE);
    }

    if (this.props.totalResultLoading !== nextProps.totalResultLoading && !nextProps.totalResultLoading) {
      await this.calcData(nextProps.rate);
    }

    if (this.props.currency !== nextProps.currency && !nextProps.totalResultLoading) {
      await this.calcData(nextProps.rate);
    }
  }

  componentWillUnmount() {
    this.setState(INIT_STATE);
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
      isError: wallet.isError,
      balanceLoading: wallet.balanceLoading,
      balanceWithRate: coinBalanceWithRate,
      symbol: wallet.type,
      recent: wallet.recent,
      account: wallet.account
    }

    dataSortedByWallet[dataSortedByWallet.length - 1].data.push(coinObj);
    return dataSortedByWallet;
  }

  setTokenDataSortedByWallet = (wallet, token, tokenBalanceWithRate, dataSortedByWallet) => {
    const tokenObj = {
      name: token.name,
      account: wallet.account,
      balance: token.balance,
      balanceLoading: token.balanceLoading,
      isError: token.isError,
      walletBalance: wallet.balance,
      balanceWithRate: tokenBalanceWithRate !== null ? tokenBalanceWithRate : null,
      recent: token.recent,
      tokenId: token.address,
      symbol: token.symbol,
      defaultDecimals: token.defaultDecimals,
      decimals: token.decimals,
    }

    dataSortedByWallet[dataSortedByWallet.length - 1].data.push(tokenObj);
    return dataSortedByWallet;
  }

  setCoinDataSortedByCoin = (wallet, coinBalanceWithRate, dataSortedByCoin) => {
    const type = wallet.type;

    if (!dataSortedByCoin["coin"].hasOwnProperty(type)) {
      dataSortedByCoin["coin"][type] = {
        data: [],
        walletSectionName: COIN_NAME[type],
        walletSectionBalance: 0,
        walletSectionBalanceWithRate: 0,
        createdAt: new Date(-8640000000000000),
        coinType: type,
      };
    }

    dataSortedByCoin["coin"][type].data.push({
      name: wallet.name,
      account: wallet.account,
      balance: wallet.balance,
      balanceLoading: wallet.balanceLoading,
      isError: wallet.isError,
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
    const contractAddress = token.address
    const symbol = token.defaultSymbol
    const name = token.defaultName
    const defaultBalance = customValueToTokenValue(token.balance, token.defaultDecimals, token.decimals);

    if (!dataSortedByCoin['token'].hasOwnProperty(contractAddress)) {
      dataSortedByCoin['token'][contractAddress] = {
        data: [],
        walletSectionName: name,
        walletSectionBalance: 0,
        walletSectionBalanceWithRate: 0,
        createdAt: 0,
        coinType: symbol,
        name: name,
        walletCoinType: wallet.type,
      };
    }

    dataSortedByCoin['token'][contractAddress].data.push({
      name: wallet.name,
      account: wallet.account,
      balance: defaultBalance,
      balanceLoading: token.balanceLoading,
      walletBalance: wallet.balance,
      isError: token.isError,
      tokenId: token.address,
      symbol: symbol,
      decimals: token.decimals,
      defaultDecimals: token.defaultDecimals,
      balanceWithRate: tokenBalanceWithRate !== null ? tokenBalanceWithRate : null,
      recent: token.recent,
    });

    dataSortedByCoin["token"][contractAddress].walletSectionBalance += defaultBalance.toNumber();

    if (tokenBalanceWithRate !== null) {
      dataSortedByCoin["token"][contractAddress].walletSectionBalanceWithRate += tokenBalanceWithRate
    } else {
      dataSortedByCoin["token"][contractAddress].walletSectionBalanceWithRate = null
    }
    if (dataSortedByCoin["token"][contractAddress].createdAt < token.createdAt) {
      dataSortedByCoin["token"][contractAddress].createdAt = token.createdAt
    }

    return dataSortedByCoin
  }

  getPRepsWithName = async _pReps => {
    const arr = []
    for (const { address, value } of _pReps) {
      let name= ''
      if (!address) {
        name = 'etc'
      } else {
        const result = await getPRep(address)
        name = result.name
      }
      arr.push({
        name,
        value
      })
    }
    return arr
  }

  setGraphData = async (dataSortedByCoin) => {
    const { delegated } = this.props
    const icxData = dataSortedByCoin['coin']['icx'] || { data: [] }

    let totalDelegated = new BigNumber(0),
      available = new BigNumber(0),
      etcsDelegated = new BigNumber(0),
      pRepsMap = {},
      pReps = [],
      etcs = []

    for (const { account } of icxData.data) {
      const { 
        delegations: _delegations, 
        totalDelegated: _totalDelegated, 
        available: _available,
      } = delegated[account]

      totalDelegated = totalDelegated.plus(_totalDelegated)
      available = available.plus(_available)
      for (const { address, value } of _delegations) {
        if (!pRepsMap[address]) {
          pRepsMap[address] = value
        } else {
          pRepsMap[address] = pRepsMap[address].plus(value)
        }
      }
    }

    const pRepsArr = Object.entries(pRepsMap)
      .map(([address, value]) => ({address, value}))
      .sort((a, b) => b.value - a.value)

    if (pRepsArr.length > 6) {
      pReps = pRepsArr.splice(0, 5)
      if (pRepsArr.length > 5) {
        let value = new BigNumber(0)
        etcs = pRepsArr.splice(0, 4)
        for (const { value: _value } of pRepsArr) {
          value = value.plus(_value)
        }
        etcs.push({
          address: '',
          value,
        })
      } else {
        etcs = pRepsArr
      }
      for (const { value } of etcs) {
        etcsDelegated = etcsDelegated.plus(value)
      }
    } else {
      pReps = pRepsArr
    }

    pReps = await this.getPRepsWithName(pReps)
    etcs = await this.getPRepsWithName(etcs)

    const _data = [...pReps]
    if (etcs.length > 0) {
      _data.push({
        name: 'etc',
        value: etcsDelegated,
      })
    }
    _data.push({
      name: 'Available',
      value: available,
    })

    return {
      data: _data,
      totalDelegated,
      available,
      pReps,
      etcsDelegated,
      etcs,
    }
  }

  calcData = async rate => {
    let totalBalance = 0;
    let dataSortedByWallet = [];
    let dataSortedByCoin = { "coin": {}, "token": {} };
    let walletArr = makeWalletArray(this.props.wallets);
    for (let i = 0; i < walletArr.length; i++) {

      let coinBalanceWithRate = walletArr[i].balance * (rate[walletArr[i].type] || 0)
      dataSortedByWallet = this.setCoinDataSortedByWallet(walletArr[i], coinBalanceWithRate, dataSortedByWallet);
      dataSortedByCoin = this.setCoinDataSortedByCoin(walletArr[i], coinBalanceWithRate, dataSortedByCoin);

      let tokenBalanceWithRateSum = 0;
      const tokens = sortTokensByDate(walletArr[i].tokens);
      if (tokens.length > 0) {
        for (let v = 0; v < tokens.length; v++) {

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

    let graphData = await this.setGraphData(dataSortedByCoin);

    this.setState({
      totalBalance: totalBalance,
      graphData: graphData,
      dataSortedByWallet: dataSortedByWallet,
      dataSortedByCoin: dataSortedByCoin
    }, () => {
      if (this.props.scrollToNewWallet) {
        this.props.setScrollToNewWallet(false);
        window.scrollTo(0, document.body.scrollHeight);
      }
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
