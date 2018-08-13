import axios from 'axios';
import { ICX_TRACKER_SERVER } from 'constants/config.js';

/**
 * get exchange rate object
 * @param {String} currency: currency type (USD, KRW...)
 * @param {String} symbolList: coin & token symbol list that user have in iconEx
 * @return {Object} data: exchange rate object
*/
export function getRate(currency, symbolList) {
  return new Promise(resolve => {
      let defaultSymbol = ['eth', 'icx'];
      symbolList = defaultSymbol.concat(symbolList)
      symbolList = [...new Set(symbolList)];

      let query = '';
      symbolList.forEach((symbol) => {
        let symbolWithCurrency = symbol + currency + ',';
        query += symbolWithCurrency;
      });
      axios.get(`${ICX_TRACKER_SERVER()}/v0/exchange/currentExchangeList?codeList=${query.slice(0, -1)}`)
      .then(function (res) {
        const response = res.data.data;
        const data = {}
        data['eth'] = response[0].price;
        data['icx'] = response[1].price;
        if (response.length > 2) {
          for (let i = 2; i < response.length; i++) {
            data[response[i].tradeName.slice(0, -3)] = response[i].marketName ? response[i].price : null;
          }
        }
        resolve(data);
      })
      .catch(function (error) {
        const data = {}
        data['eth'] = '0';
        data['icx'] = '0';
        for (let i = 2; i < symbolList.length; i++) {
          data[symbolList[i]] = '0'
        }
        resolve(data);
      });
  })
}
