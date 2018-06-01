import { connect } from 'react-redux';
import { MyPage } from 'app/components/';
import { setLock } from 'redux/actions/globalActions';
import { togglePopup, setPopupType } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash,
    emailAddress: state.global.email
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLock: (passcodeHash, email) => dispatch(setLock(passcodeHash, email)),
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (type) => dispatch(setPopupType(type))
  };
}

const MyPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyPage);

export default MyPageContainer;
