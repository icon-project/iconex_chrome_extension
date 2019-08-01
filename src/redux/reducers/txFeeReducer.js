import actionTypes from 'redux/actionTypes/actionTypes'
import BigNumber from 'bignumber.js'
import { fromLoop } from 'utils'

const initialState = {
  txFeeLoading: false,
  txFeeLimitError: '',
  txFeeLimit: new BigNumber(0),
  txFeePrice: new BigNumber(0),
}

export function txFeeReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.getEstimatedTxFeeLoading:
      return Object.assign({}, state, {
        txFeeLoading: true
      })
    case actionTypes.getEstimatedTxFeeFulfilled:
      return Object.assign({}, state, {
        txFeeLoading: false,
        txFeeLimit: new BigNumber(action.payload.txFeeLimit),
        txFeePrice: fromLoop(action.payload.txFeePrice),
      })
    case actionTypes.getEstimatedTxFeeRejected:
      return Object.assign({}, state, {
        txFeeLoading: false,
        txFeeLimit: new BigNumber(0),
        txFeePrice: new BigNumber(0),
        txFeeLimitError: action.error,
      })
    default: {
      return state
    }
  }
}
