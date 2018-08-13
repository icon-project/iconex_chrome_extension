import { connect } from 'react-redux';
import { Timer } from 'app/components/';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    popupNum: state.popup.popupNum,
    popupType: state.popup.popupType,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default withRouter(TimerContainer);
