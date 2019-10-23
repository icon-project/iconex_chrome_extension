import { connect } from 'react-redux';
import { PReps } from 'app/components/';
import { getPRepData } from 'redux/actions/pRepActions'

function mapStateToProps(state) {
  const { pRepsLoading: loading, isVoteMode } = state.pRep
  return {
    isVoteMode,
    loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(getPRepData()),
  };
}

const PRepsContainer = connect(mapStateToProps, mapDispatchToProps)(PReps);

export default PRepsContainer;
