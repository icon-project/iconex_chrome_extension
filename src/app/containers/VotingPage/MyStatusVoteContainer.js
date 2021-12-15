import { connect } from 'react-redux';
import { MyStatusStakeVote } from 'app/components/';
import { convertToPercent, convertStakeValueToText } from 'utils';
import { validateVote } from 'redux/reducers/iissReducer'

function mapStateToProps(state) {
  const { isLoggedIn } = state.wallet.selectedWallet
  const selectedAccount = state.wallet.selectedWallet.account
  const staked = state.iiss.staked[selectedAccount] || {}
  const { value, loading: stakedLoading } = staked
  const delegated = state.iiss.delegated[selectedAccount] || {}
  const { totalDelegated, loading: delegatedLoading } = delegated
  const available = delegated.available
  const delegatedPct = convertToPercent(totalDelegated, value, 1)
  const delegatedWidthPct = convertToPercent(totalDelegated, value)
  const availablePct = (100 - delegatedPct).toFixed(1)
  const availableWidthPct = (100 - delegatedWidthPct).toString()
  const isNoBalance = value && validateVote(value)
  const showHyphen = (val) => isLoggedIn ? val : '-'
  const getGraphClassName = () => {
    if (!isLoggedIn || isNoBalance) {
      return 'no'
    } else if (availableWidthPct === '100') {
      return 'notvoted'
    } else if (delegatedWidthPct === '100') {
      return 'notavail'
    } else {
      return ''
    }
  }

  return {
    wrapClassName: 'center-group vote-group',
    graphClassName: getGraphClassName(),
    compType: 'vote',
    title: 'Vote',
    buttonLabel: 'vote',
    axis1: {
      label: 'myStatusVote_axis1',
      value: isNoBalance ? '-' : showHyphen(delegatedPct),
      width: delegatedWidthPct,
    },
    axis2: {
      label: 'myStatusVote_axis2',
      value: isNoBalance ? '-' : showHyphen(availablePct),
      width: availableWidthPct,
    },
    li1: {
      label: 'myStatusVote_li1',
      value: showHyphen(convertStakeValueToText(value)),
    },
    li2: {
      label: 'myStatusVote_li2',
      value: showHyphen(convertStakeValueToText(totalDelegated)),
    },
    li3: {
      label: 'myStatusVote_li3',
      value: showHyphen(convertStakeValueToText(available)),
    },
    isUnstakeExist: false,
    isLoggedIn,
    loading: stakedLoading || delegatedLoading,
    error: isNoBalance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const MyStatusVoteContainer = connect(mapStateToProps, mapDispatchToProps)(MyStatusStakeVote);

export default MyStatusVoteContainer;
