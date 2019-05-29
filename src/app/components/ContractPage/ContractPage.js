import React, { Component } from 'react';
import { ContractReadPage, Alert, SubRoute } from 'app/components/';
import withLanguageProps from 'HOC/withLanguageProps'

@withLanguageProps
class ContractPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillUnmount() {
    this.props.resetReducer();
  }

  closeErrorPopup = () => {
    this.props.setFuncInputDataExceedError(false);
  }

  render() {
    const { I18n, funcInputDataExceedError } = this.props;
    return (
      <div>
        <SubRoute 
          title={I18n.contract}
          labels={[I18n.contractReadPage]}
          components={[<ContractReadPage />]}
          />
        {
          funcInputDataExceedError && (
            <Alert
              handleCancel={this.closeErrorPopup}
              text={I18n.error.dataOverLimit}
              cancelText={I18n.button.close}
            />
          )
        }
      </div>
    );
  }
}

export default ContractPage;
