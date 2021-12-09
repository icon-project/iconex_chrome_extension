import { connect } from 'react-redux';
import { MyStatusStakeBond } from 'app/components/';
import { convertToPercent, convertStakeValueToText } from 'utils';
import { validateBond } from 'redux/reducers/iissReducer'

function mapStateToProps(state) {
  const { isLoggedIn } = state.wallet.selectedWallet
  const selectedAccount = state.wallet.selectedWallet.account
  const staked = state.iiss.staked[selectedAccount] || {}
  const { value, loading: stakedLoading } = staked
  const delegated = state.iiss.delegated[selectedAccount] || {}
  const bonded = state.iiss.bonded[selectedAccount] || {}
  const { totalDelegated, loading: delegatedLoading } = delegated
  const { totalBonded, loadingBond: bondedLoading } = bonded
  const available = value &&
    value.minus(totalDelegated).minus(totalBonded)
  const bondedPct = convertToPercent(totalBonded, value, 1)
  const bondedWidthPct = convertToPercent(totalBonded, value)
  const availablePct = (100 - bondedPct).toFixed(1)
  const availableWidthPct = (100 - bondedWidthPct).toString()
  const isNoBalance = value && validateBond(value)
  const showHyphen = (val) => isLoggedIn ? val : '-'
  const getGraphClassName = () => {
    if (!isLoggedIn || isNoBalance) {
      return 'no'
    } else if (availableWidthPct === '100') {
      return 'notvoted'
    } else if (bondedWidthPct === '100') {
      return 'notavail'
    } else {
      return ''
    }
  }

  return {
    wrapClassName: 'center-group bond-group',
    graphClassName: getGraphClassName(),
    compType: 'bond',
    title: 'Bond',
    buttonLabel: 'bond',
    axis1: {
      label: 'myStatusBond_axis1',
      value: isNoBalance ? '-' : showHyphen(bondedPct),
      width: bondedWidthPct,
    },
    axis2: {
      label: 'myStatusBond_axis2',
      value: isNoBalance ? '-' : showHyphen(availablePct),
      width: availableWidthPct,
    },
    li1: {
      label: 'myStatusBond_li1',
      value: showHyphen(convertStakeValueToText(value)),
    },
    li2: {
      label: 'myStatusBond_li2',
      value: showHyphen(convertStakeValueToText(totalBonded)),
    },
    li3: {
      label: 'myStatusBond_li3',
      value: showHyphen(convertStakeValueToText(available)),
    },
    isUnstakeExist: false,
    isLoggedIn,
    loading: stakedLoading || bondedLoading,
    error: isNoBalance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const MyStatusBondContainer = connect(mapStateToProps, mapDispatchToProps)(MyStatusStakeBond);

export default MyStatusBondContainer;
