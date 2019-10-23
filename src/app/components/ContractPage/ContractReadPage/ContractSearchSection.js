import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/';
import { isIcxContractAddress } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps'

const INIT_STATE = {
}

@withLanguageProps
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
    const { I18n, contractAddress, contractAddressError, abi, abiLoading } = this.props;
    return (
      <div>
        <div className="address-holder">
          <div className="group">
            <span className="label">{I18n.contractList.contractAddress}</span>
            <input
              type="text"
              onChange={this.handleContractAddressChange}
              onBlur={this.handleContractAddressBlur}
              className={`txt-type-normal ${contractAddressError ? 'error' : ''}`}
              placeholder={I18n.contractReadPageAddressInputPlaceHolder}
              value={contractAddress}
              spellCheck="false" />
            <p className="error">{I18n.error[contractAddressError]}</p>
            <div className="-holder">
              <button className="btn-type-copy size-ledger" onClick={this.handleButtonClick}><span>{I18n.contractList.contractList}</span></button>
            </div>
          </div>
        </div>
        <div className="api-holder">
          <div className="group">
            <span className="label">API / JSON Interface</span>
            <textarea
              rows="9"
              placeholder={I18n.contractAbiPlaceHolder}
              readOnly
              value={abi}
            ></textarea>
            {
              abiLoading ? (
                <button style={{ width: 99.45 }} className="btn-type-black">
                  <span><LoadingComponent type='white' /></span>
                </button>
              ) : (
                  <button onClick={this.setFuncList} className="btn-type-black">
                    <span>{I18n.button.confirm}</span>
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
