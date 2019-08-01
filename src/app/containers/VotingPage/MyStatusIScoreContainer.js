import { connect } from 'react-redux';
import { MyStatusIScore } from 'app/components/';
import { openPopup } from 'redux/actions/popupActions';
import { validateClaim } from 'redux/reducers/iissReducer'
import { convertIScoreToText } from 'utils'


function mapStateToProps(state) {
  const { isLoggedIn } = state.wallet.selectedWallet
  const showHyphen = (val) => isLoggedIn ? val : '-'
  const iScore = state.iiss.iScore[state.wallet.selectedWallet.account] || {}
  return {
    iScore: showHyphen(convertIScoreToText(iScore.value)),
    estimatedICX: showHyphen(convertIScoreToText(iScore.estimatedICX)),
    isLoggedIn,
    error: iScore.value ? validateClaim(iScore.value) : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openPopup: (s) => dispatch(openPopup(s)),
  };
}

const MyStatusIScoreContainer = connect(mapStateToProps, mapDispatchToProps)(MyStatusIScore);

export default MyStatusIScoreContainer;
