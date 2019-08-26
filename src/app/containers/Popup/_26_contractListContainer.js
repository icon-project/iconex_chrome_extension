import { connect } from 'react-redux';
import { ContractList } from 'app/components/';
import { openPopup, setPopupNum, closePopup } from 'redux/actions/popupActions';
import { setContractAddress, fetchAbi } from 'redux/actions/contractActions';

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    closePopup: () => dispatch(closePopup()),
    openPopup: (s) => dispatch(openPopup(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    setContractAddress: (a) => dispatch(setContractAddress(a)),
    fetchAbi: (payload) => dispatch(fetchAbi(payload))
  };
}

const ContractListContainer = connect(mapStateToProps, mapDispatchToProps)(ContractList);

export default ContractListContainer;
