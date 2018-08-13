import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/';
import { isIcxContractAddress } from 'utils';

const INIT_STATE = {
}

class ContractSearchSection extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  handleContractAddressChange = (e) => {
    console.log(isIcxContractAddress(e.target.value), e.target.value)
    this.props.setContractAddress(e.target.value)
    if (e.target.value.length === 42) {
      this.props.fetchAbi(e.target.value)
    }
  }

  handleContractAddressBlur = (e) => {
    this.props.setContractAddressError();
  }

  handleButtonClick = (e) => {
    this.props.openPopup({
      popupType: 'contractList'
    })
  }

  setFuncList = (e) => {
    const { abi } = this.props;
    if (abi) {
      const filteredAbi = JSON.parse(abi).filter((func) => {
        return func.type === 'function'
      })
      this.props.setFuncList(filteredAbi);
    }
  }

  render() {
    const { contractAddress, contractAddressError, abi, abiLoading } = this.props;
    return (
      <div>
        <div className="address-holder">
          <div className="group">
            <span className="label">컨트랙트 주소</span>
            <input type="text" onChange={this.handleContractAddressChange} onBlur={this.handleContractAddressBlur} className={`txt-type-normal ${contractAddressError ? 'error' : ''}`} placeholder="컨트랙트 주소 입력" value={contractAddress} spellCheck="false" />
            <p className="error">{contractAddressError}</p>
            <div className="-holder">
              <button className="btn-type-copy" onClick={this.handleButtonClick}><span>컨트랙트 목록</span></button>
            </div>
          </div>
        </div>
        <div className="api-holder">
          <div className="group">
            <span className="label">API / JSON Interface</span>
            <textarea
              rows="9"
              placeholder="컨트랙트 주소를 입력하면 자동으로 작성됩니다."
              readOnly
              value={abi}
              ></textarea>
            {
              abiLoading ? (
                <button style={{width: 99.45}} className="btn-type-fill3">
                  <span><LoadingComponent type='white' /></span>
                </button>
              ) : (
                <button onClick={this.setFuncList} className="btn-type-fill3">
                  <span>확인</span>
                </button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ContractSearchSection;
