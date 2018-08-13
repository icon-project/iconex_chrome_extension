import { connect } from 'react-redux';
import { ContractSearchSection } from 'app/components/';
import { setContractAddress, setContractAddressError, fetchAbi, setFuncList } from 'redux/actions/contractActions';
import { openPopup } from 'redux/actions/popupActions'

function mapStateToProps(state) {
  return {
    abi: state.contract.abi,
    abiLoading: state.contract.abiLoading,
    contractAddress: state.contract.contractAddress,
    contractAddressError: state.contract.contractAddressError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setContractAddress: (contractAddress) => dispatch(setContractAddress(contractAddress)),
    setContractAddressError: () => dispatch(setContractAddressError()),
    setFuncList: (payload) => dispatch(setFuncList(payload)),
    openPopup: (popupType) => dispatch(openPopup(popupType)),
    fetchAbi: (payload) => dispatch(fetchAbi(payload))
  };
}

const ContractSearchSectionContainer = connect(mapStateToProps, mapDispatchToProps)(ContractSearchSection);

export default ContractSearchSectionContainer;
