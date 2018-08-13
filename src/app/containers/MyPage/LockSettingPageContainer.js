import { connect } from 'react-redux';
import { MyPage } from 'app/components/';
import { setLock } from 'redux/actions/globalActions';
import {  openPopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLock: (passcodeHash) => dispatch(setLock(passcodeHash)),

    openPopup: (type) => dispatch(openPopup(type))
  };
}

const MyPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyPage);

export default MyPageContainer;
