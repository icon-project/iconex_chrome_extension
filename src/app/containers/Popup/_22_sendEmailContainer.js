import { connect } from 'react-redux';
import { SendEmail } from 'app/components/'
import { togglePopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    email: state.global.email
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
  };
}

const SendEmailContainer = connect(mapStateToProps, mapDispatchToProps)(SendEmail);

export default SendEmailContainer;
