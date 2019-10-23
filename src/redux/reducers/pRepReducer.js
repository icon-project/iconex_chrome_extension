import actionTypes from 'redux/actionTypes/actionTypes'
import BigNumber from 'bignumber.js'
import { fromLoop, convertToPercent } from 'utils'

const preprocessPReps = (pReps, totalNetworkDelegated) => {
  const _pRepTypeCnt = [0, 0, 0]
  const _pRepsMap = {}
  const _pReps = pReps.map(({
    delegated,
    stake,
    grade,
    address,
    ...rest,
  }, i) => {
    const _delegated = fromLoop(delegated)
    const _grade = Number(grade)
    const result = {
      delegated: _delegated,
      delegatedPct: convertToPercent(_delegated, totalNetworkDelegated, 1),
      stake: fromLoop(stake),
      grade: _grade,
      rank: i + 1,
      address,
      ...rest,
    }

    _pRepTypeCnt[_grade]++
    _pRepsMap[address] = result
    return result
  })
  return {
    _pReps,
    _pRepTypeCnt,
    _pRepsMap,
  }
}

const pRepState = {
  pReps: [],
  pRepsLoading: false,
  pRepTypeCnt: [0, 0, 0],
  pRepsMap: {},
  blockHeight: 0,
  totalNetworkDelegated: new BigNumber(0),
  totalNetworkStaked: new BigNumber(0),
  totalSupply: new BigNumber(0),
  isVoteMode: false,
}

const myPRepState = {
  myVotes: [],
  myDelegated: new BigNumber(0),
  myAvailable: new BigNumber(0),
  votedMap: {},
  editedMap: {},
  myVotesMap: {},
}

const initialState = {
  ...pRepState,
  ...myPRepState,
}

export function pRepReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.openVoteMode: {
      return Object.assign({}, state, {
        isVoteMode: true
      })
    }
    case actionTypes.resetVoteMode: {
      return Object.assign({}, state, {
        isVoteMode: false,
        ...myPRepState,
      })
    }
    case actionTypes.getPRepDataLoading: {
      return Object.assign({}, state, {
        pRepsLoading: true,
      })
    }
    case actionTypes.getPRepDataFulfilled: {
      const {
        preps,
        blockHeight,
        totalDelegated,
        totalStake,
        totalSupply,
      } = action.payload
      const _totalNetworkDelegated = fromLoop(totalDelegated)
      const { _pReps, _pRepTypeCnt, _pRepsMap } = preprocessPReps(preps, _totalNetworkDelegated)
      return Object.assign({}, state, {
        pRepsLoading: false,
        pReps: _pReps,
        pRepTypeCnt: _pRepTypeCnt,
        pRepsMap: _pRepsMap,
        blockHeight: new BigNumber(blockHeight),
        totalNetworkDelegated: _totalNetworkDelegated,
        totalNetworkStaked: fromLoop(totalStake),
        totalSupply: fromLoop(totalSupply)
      })
    }
    case actionTypes.getPRepDataRejected: {
      return Object.assign({}, state, {
        pRepsLoading: false,
        pReps: [],
        pRepTypeCnt: [0, 0, 0],
        pRepsMap: {},
        blockHeight: new BigNumber(0),
        totalNetworkDelegated: new BigNumber(0),
        totalNetworkStaked: new BigNumber(0),
        totalSupply: new BigNumber(0),
      })
    }
    case actionTypes.getDelegationLoading: {
      return Object.assign({}, state, myPRepState)
    }
    case actionTypes.getDelegationFulfilled: {
      if (!state.isVoteMode) return Object.assign({}, state)

      const {
        payload: {
          delegations: myVotes,
          totalDelegated: myDelegated,
          votingPower: myAvailable,
        },
      } = action
      const myVotesMap = {}
      const votedMap = {}
      for (const { address, value } of myVotes) {
        myVotesMap[address] = fromLoop(value)
        votedMap[address] = true
      }
      return Object.assign({}, state, {
        myVotes: myVotes
          .map(({ value, ...rest }) => ({
            ...rest,
            value: fromLoop(value),
          }))
          .sort(({ value: a }, { value: b }) => b - a),
        votedMap,
        myVotesMap,
        myDelegated: fromLoop(myDelegated),
        myAvailable: fromLoop(myAvailable),
      })
    }
    case actionTypes.updateMyVotes: {
      const {
        address,
        value,
        isEdited,
      } = action.payload
      let {
        myDelegated,
        myAvailable
      } = state
      const _myVotes = [...state.myVotes]
      const _editedMap = { ...state.editedMap }
      const idx = _myVotes.findIndex(myVote => myVote.address === address)
      const diff = value.minus(_myVotes[idx].value)
      myDelegated = myDelegated.plus(diff)
      myAvailable = myAvailable.minus(diff)
      _myVotes[idx].value = value
      if (isEdited) {
        _editedMap[address] = true
      } else {
        delete _editedMap[address]
      }
      return Object.assign({}, state, {
        myVotes: _myVotes,
        editedMap: _editedMap,
        myDelegated,
        myAvailable,
      })
    }
    case actionTypes.addPRep: {
      const { payload: address } = action
      const _myVotes = [
        ...state.myVotes,
        {
          address,
          value: new BigNumber(0),
        }
      ]
      return Object.assign({}, state, {
        myVotes: _myVotes,
        myVotesMap: {
          ...state.myVotesMap,
          [address]: new BigNumber(0),
        },
      })
    }
    case actionTypes.deletePRep: {
      const { payload: address } = action
      let { myDelegated, myAvailable } = state
      const _myVotes = [...state.myVotes]
      const index = _myVotes.findIndex(el => el.address === address)
      const { value } = _myVotes[index]
      const _myVotesMap = { ...state.myVotesMap }
      const _editedMap = { ...state.editedMap }
      myDelegated = myDelegated.minus(value)
      myAvailable = myAvailable.plus(value)
      _myVotes.splice(index, 1)
      delete _myVotesMap[address]
      delete _editedMap[address]
      return Object.assign({}, state, {
        myVotes: _myVotes,
        myVotesMap: _myVotesMap,
        editedMap: _editedMap,
        myDelegated,
        myAvailable,
      })
    }
    
    case actionTypes.setDelegationFulfilled: {
      const votedMap = {}, myVotesMap = {}
      for (const { address, value } of action.input) {
        myVotesMap[address] = value
        votedMap[address] = true
      }
      return Object.assign({}, state, {
        editedMap: {},
        myVotesMap,
        votedMap,
      })
    }
    case actionTypes.resetMyPRepState: {
      return Object.assign({}, state, initialState)
    }
    case actionTypes.resetPRepIissReducer: {
      return Object.assign({}, state, initialState)
    }
    default:
      return state
  }
}
