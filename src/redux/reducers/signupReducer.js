import actionTypes from 'redux/actionTypes/actionTypes'

const initialState = {
  walletName: '',
  coinType: '',
  walletObj: {},
  iconexObj: {},
  v3Obj: {},
  privateKey: '',
  pw: '',
  address: '',
  loading: false,
  error: '',
}

export function signupReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setWalletName:
      return Object.assign({}, state, {
          walletName: action.payload
      })
    case actionTypes.setCoinType:
      return Object.assign({}, state, {
          coinType: action.payload
      })
    case actionTypes.generateWallet:
      return Object.assign({}, state, {
          loading: true
      })
    case actionTypes.generateWalletFulfilled:
      return Object.assign({}, state, {
          walletObj: action.payload[0],
          address: action.payload[1],
          privateKey: action.payload[2],
          pw: action.payload[3],
          loading: false
      })
    case actionTypes.generateWalletRejected:
      return Object.assign({}, state, {
          error: action.error,
          loading: false
      })
    case actionTypes.setIconexObject:
      return Object.assign({}, state, {
          iconexObj: action.payload
      })
    case actionTypes.setWalletObject:
      return Object.assign({}, state, {
          walletObj: action.payload
      })
    case actionTypes.setV3Object:
      return Object.assign({}, state, {
          v3Obj: action.payload
      })
    case actionTypes.createWallet:
      return Object.assign({}, state, {
          loading: true
      })
    case actionTypes.createWalletFulfilled:
      return Object.assign({}, state, {
          loading: false
      })
    case actionTypes.createWalletRejected:
      return Object.assign({}, state, {
          loading: false,
          error: action.error
      })
    case actionTypes.createWallets:
      return Object.assign({}, state, {
          loading: true
      })
    case actionTypes.createWalletsFulfilled:
      return Object.assign({}, state, {
          loading: false
      })
    case actionTypes.createWalletsRejected:
      return Object.assign({}, state, {
          loading: false,
          error: action.error
      })
    case actionTypes.deleteWalletRejected:
      return Object.assign({}, state, {
          error: action.error
      })
    case actionTypes.resetInfo:
      return Object.assign({}, state, {
          privateKey: '',
          address: '',
          walletObj: '',
          iconexObj: {},
          v3Obj: {},
          pw: '',
      })
    case actionTypes.resetSignupReducer:
      return Object.assign({}, initialState);
    case actionTypes.setAddress:
      return Object.assign({}, state, {
        address: action.payload
      });
    default:
      return state
  }
}
