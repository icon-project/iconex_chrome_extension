import actionTypes from 'redux/actionTypes/actionTypes'
import { isIcxContractAddress, isIcxWalletAddress, isEmpty, isHex } from 'utils'
import BigNumber from 'bignumber.js';
import update from 'react-addons-update';
import { store } from 'redux/store/store';

const contractState = {
  contractAddress: '',
  contractAddressError: ''
}

const abiState = {
  abi: '',
  abiLoading: false
}

const funcState = {
  funcList: [],
  selectedFuncIndex: 0,
  funcInput: {},
  funcInputError: {},
  funcInputDataExceedError: false,
  funcLoading: false,
  funcResult: []
}

const initialState = {
  ...contractState,
  ...abiState,
  ...funcState
}

export function validateContractAddressError(state) {
  let error = '';
  const contractAddressLowerCase = state.contractAddress.toLowerCase();
  if (!state.contractAddress) {
    error = 'contractAddressEmpty'
  } else if (!isIcxContractAddress(contractAddressLowerCase)) {
    error = 'contractAddressConfirm'
  } else {
    error = ''
  }
  return error
}

function getInitialInput(type) {
  switch (type) {
    case 'str':
    case 'Address':
      return ''
    case 'int':
      return '0';
    case 'bool':
      return false;
    default:
      return ''
  }
}

function initializeFuncInput(func) {
  let inputs = {}
  if (func.inputs.length > 0) {
    inputs = func.inputs.reduce((acc, cur) => {
        acc[cur.name] = getInitialInput(cur.type)
        return acc
    }, {});
  }
  return inputs;
}

function initializeFuncInputError(func) {
  let error = {}
  if (func.inputs.length > 0) {
    error = func.inputs.reduce((acc, cur) => {
        acc[cur.name] = ''
        return acc
    }, {});
  }
  return error;
}

export function validateInputError({name, type, optional}) {
  const funcInput = store.getState().contract.funcInput;
  const isValueExist = funcInput[name] || funcInput[name] !== '';
  console.log(optional)
  switch(type) {
    case 'str':
      if (!funcInput[name] && !optional) {
        return 'strEnter';
      } else {
        return ''
      }
    case 'Address': {
      if (!funcInput[name] && !optional) {
        return 'AddressEnter';
      } else if (isValueExist && !isIcxWalletAddress(funcInput[name]) && !isIcxContractAddress(funcInput[name])) {
        return 'AddressConfirm';
      } else {
        return ''
      }
    }
    case 'int':
      if (funcInput[name] === '' && !optional) {
        return 'intEnter';
      } else if (isValueExist && (isNaN(funcInput[name]) || funcInput[name].includes("+") || funcInput[name].includes("-"))) {
        return 'intConfirm'
      } else {
        return ''
      }
    case 'bytes':
      if (funcInput[name] === '' && !optional) {
        return 'bytesEnter';
      } else if (isValueExist && !isHex(funcInput[name])) {
        return 'bytesConfirm'
      } else {
        return ''
      }
    case 'bool':
      return ''
    default:
      return ''
  }
}

export function contractReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setContractAddress:
      return Object.assign({}, state, {
        contractAddress: action.payload,
        contractAddressError: '',
        ...abiState,
        ...funcState
      })
    case actionTypes.setContractAddressError: {
      let error = validateContractAddressError(state);
      return Object.assign({}, state, {
          contractAddressError: error
      })
    }
    case actionTypes.fetchAbi:
      return Object.assign({}, state, {
        abiLoading: true
      })
    case actionTypes.fetchAbiFulfilled:
      return Object.assign({}, state, {
        abi: action.payload,
        abiLoading: false,
        contractAddressError: ''
      })
    case actionTypes.fetchAbiRejected:
      return Object.assign({}, state, {
        abi: '',
        abiLoading: false,
        contractAddressError: 'contractAddressConfirm'
      })
    case actionTypes.setFuncList:
      return Object.assign({}, state, {
        funcList: action.payload,
        funcInput: initializeFuncInput(action.payload[state.selectedFuncIndex]),
        funcInputError: initializeFuncInputError(action.payload[state.selectedFuncIndex])
      })
    case actionTypes.setFuncIndex:
      return Object.assign({}, state, {
        funcInput: initializeFuncInput(state.funcList[action.payload]),
        funcInputError: initializeFuncInputError(state.funcList[action.payload]),
        funcResult: [],
        selectedFuncIndex: action.payload
      })
    case actionTypes.handleFuncInputChange:
      return update(state, {
        funcInput: {
          [action.payload.name]: {$set: action.payload.value}
        }
      });
    case actionTypes.setFuncInputError:
      const error = action.payload.hasOwnProperty('error')
                      ? action.payload.error
                      : validateInputError({
                          name: action.payload.name,
                          type: action.payload.type,
                          optional: action.payload.optional
                        });
      return update(state, {
        funcInputError: {
          [action.payload.name]: {$set: error}
        }
      });
    case actionTypes.setFuncInputDataExceedError:
      return Object.assign({}, state, {
        funcInputDataExceedError: action.payload
      })
    case actionTypes.executeFunc:
      return Object.assign({}, state, {
        funcLoading: true,
        funcResult: []
      })
    case actionTypes.executeFuncFulfilled:
      return Object.assign({}, state, {
        funcLoading: false,
        funcResult: action.payload
      })
    case actionTypes.executeFuncRejected:
      return Object.assign({}, state, {
        funcLoading: false,
        funcResult: []
      })
    case actionTypes.resetContractInputOutput:
      return Object.assign({}, state, {
        funcInput: initializeFuncInput(state.funcList[state.selectedFuncIndex]),
        funcInputError: initializeFuncInputError(state.funcList[state.selectedFuncIndex]),
        funcResult: []
      })
    case actionTypes.resetContractPageReducer:
      return Object.assign({}, initialState);
    default:
      return state
  }
}
