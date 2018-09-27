import React, { Component } from 'react';
import { ContractReadPage, Alert } from 'app/components/';
import withLanguageProps from 'HOC/withLanguageProps'


const INIT_STATE = {
  tab: 'read'
}

@withLanguageProps
class ContractPage extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE
  }

  componentWillUnmount() {
    this.props.resetReducer();
  }

  setTab = (e) => {
    const target = e.target.getAttribute('data-name');
    this.setState({
      tab: target
    })
  }

  closeErrorPopup = () => {
    this.props.setFuncInputDataExceedError(false);
  }

  render() {
    const { I18n, funcInputDataExceedError } = this.props;
    const { tab } = this.state;
    return (
      <div>
        <div className="title-holder sub">
          <h1>{I18n.contract}</h1>
          <div className="tab-holder">
            <ul>
  						<li onClick={this.setTab} data-name={'read'} className={tab === 'read' ? 'on' : ''}>{I18n.contractReadPage}</li>
  						{/*<li onClick={this.setTab} data-name={'deploy'} className={tab === 'deploy' ? 'on' : ''}>배포하기</li>*/}
  					</ul>
          </div>
        </div>
        <div className="wrap-holder contract">
          { tab === 'read' && (<ContractReadPage />)}

    		</div>

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
