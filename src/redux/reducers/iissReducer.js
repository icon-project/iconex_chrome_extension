import actionTypes from 'redux/actionTypes/actionTypes'
import BigNumber from 'bignumber.js'
import { fromLoop } from 'utils'

export const validateStake = balance => balance.lt(1)
export const validateVote = value => value.eq(0)
export const validateClaim = value => value.eq(0)

const initStakeElem = {
	loading: false,
	value: new BigNumber(0),
	unstakes: [],
	totalUnstake: new BigNumber(0),
}

const initIScoreElem = {
	loading: false,
	value: new BigNumber(0),
	estimatedICX: new BigNumber(0),
}

const initDelegatedElem = {
	loading: false,
	totalDelegated: new BigNumber(0),
	available: new BigNumber(0),
	delegations: []
}

const initTxElem = {
	result: '',
	loading: false,
}

const iissState = {
	staked: {},
	iScore: {},
	delegated: {},
}

const resettableState = {
	tx: initTxElem,
	ledgerAddress: '',
}

const initialState = {
	...iissState,
	...resettableState
}

export function iissReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.getWalletFulfilled: {
			const staked = {}, iScore = {}, delegated = {};
			let keys = Object.keys(action.payload)
				.filter(el => el.startsWith('hx'));

			for (const key of keys) {
				staked[key] = initStakeElem
				iScore[key] = initIScoreElem
				delegated[key] = initDelegatedElem
			}
			return Object.assign({}, state, {
				staked, iScore, delegated
			})
		}
		case actionTypes.setLogInStateForLedger: {
			const { account } = action.payload.ledgerWallet
			const staked = { ...state.staked }
			const iScore = { ...state.iScore }
			const delegated = { ...state.delegated }
			staked[account] = initStakeElem
			iScore[account] = initIScoreElem
			delegated[account] = initDelegatedElem
			return Object.assign({}, state, {
				staked,
				iScore,
				delegated,
				ledgerAddress: account,
			})
		}
		case actionTypes.getStakeLoading: {
			const { account } = action
			const _staked = Object.assign({}, state.staked, {
				[account]: {
					...state.staked[account],
					loading: true
				}
			})
			return Object.assign({}, state, {
				staked: _staked
			})
		}
		case actionTypes.getStakeFulfilled: {
			const { payload, account } = action
			const _staked = Object.assign({}, state.staked, {
				[account]: {
					...state.staked[account],
					value: fromLoop(payload.stake),
					totalUnstake: payload.unstakes
						? payload.unstakes.reduce((acc, cur) => {
							return acc.plus(fromLoop(cur.unstake))
						}, new BigNumber(0))
						: new BigNumber(0),
					unstakes: payload.unstakes
						? payload.unstakes.map((unstake) => ({
							unstake: fromLoop(unstake.unstake),
							unstakeBlockHeight: new BigNumber(unstake.unstakeBlockHeight),
							remainingBlocks: new BigNumber(unstake.remainingBlocks)
						}))
						: [],
					loading: false,
				}
			})
			return Object.assign({}, state, {
				staked: _staked
			})
		}
		case actionTypes.getStakeRejected: {
			const { account } = action
			const _staked = Object.assign({}, state.staked, {
				[account]: {
					...state.staked[account],
					value: new BigNumber(0),
					totalUnstake: new BigNumber(0),
					unstakes: [],
					loading: false
				}
			})
			return Object.assign({}, state, {
				staked: _staked
			})
		}
		case actionTypes.setDelegationLoading:
		case actionTypes.claimIScoreLoading:
		case actionTypes.setStakeLoading: {
			return Object.assign({}, state, {
				tx: {
					...state.tx,
					loading: true
				}
			})
		}
		case actionTypes.setDelegationFulfilled:
		case actionTypes.claimIScoreFulfilled:
		case actionTypes.setStakeFulfilled: {
			return Object.assign({}, state, {
				tx: {
					...state.tx,
					loading: false,
					result: action.payload,
				}
			})
		}
		case actionTypes.setDelegationRejected:
		case actionTypes.claimIScoreRejected:
		case actionTypes.setStakeRejected: {
			return Object.assign({}, state, {
				tx: {
					...state.tx,
					loading: false,
					result: ''
				}
			})
		}
		case actionTypes.getDelegationLoading: {
			const { account } = action
			const _delegated = Object.assign({}, state.delegated, {
				[account]: {
					...state.delegated[account],
					loading: true
				}
			})
			return Object.assign({}, state, {
				delegated: _delegated
			})
		}
		case actionTypes.getDelegationFulfilled: {
			const {
				payload: {
					totalDelegated,
					delegations,
					votingPower: available,
				},
				account
			} = action
			const _delegated = Object.assign({}, state.delegated, {
				[account]: {
					...state.delegated[account],
					loading: false,
					totalDelegated: fromLoop(totalDelegated),
					available: fromLoop(available),
					delegations: delegations.map(({ value, ...rest }) => ({
						...rest,
						value: fromLoop(value),
					})),
				}
			})
			return Object.assign({}, state, {
				delegated: _delegated
			})
		}
		case actionTypes.getDelegationRejected: {
			const {
				account
			} = action
			const _delegated = Object.assign({}, state.delegated, {
				[account]: {
					...state.delegated[account],
					loading: false,
					totalDelegated: new BigNumber(0),
					available: new BigNumber(0),
					delegations: [],
				}
			})
			return Object.assign({}, state, {
				delegated: _delegated
			})
		}
		case actionTypes.queryIScoreLoading: {
			const { account } = action
			const _iScore = Object.assign({}, state.iScore, {
				[account]: {
					...state.iScore[account],
					loading: true
				}
			})
			return Object.assign({}, state, {
				iScore: _iScore
			})
		}
		case actionTypes.queryIScoreFulfilled: {
			const { payload, account } = action
			const _iScore = Object.assign({}, state.iScore, {
				[account]: {
					...state.iScore[account],
					value: fromLoop(payload.iscore),
					estimatedICX: fromLoop(payload.estimatedICX),
					loading: false
				}
			})
			return Object.assign({}, state, {
				iScore: _iScore
			})
		}
		case actionTypes.queryIScoreRejected: {
			const { account } = action
			const _iScore = Object.assign({}, state.iScore, {
				[account]: {
					...state.iScore[account],
					value: new BigNumber(0),
					estimatedICX: new BigNumber(0),
					loading: false
				}
			})
			return Object.assign({}, state, {
				iScore: _iScore
			})
		}
		case actionTypes.resetPRepIissReducer: {
			const { ledgerAddress } = state
			if (ledgerAddress) {
				const staked = { ...state.staked }
				const iScore = { ...state.iScore }
				const delegated = { ...state.delegated }
				delete staked[ledgerAddress]
				delete iScore[ledgerAddress]
				delete delegated[ledgerAddress]
				return Object.assign({}, state, {
					...resettableState,
					staked,
					iScore,
					delegated,
				})
			}
			return Object.assign({}, state, {
				...resettableState
			})
		}
		default:
			return state
	}
}
