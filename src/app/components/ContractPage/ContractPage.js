import React, { Component } from 'react';
import { ContractReadPage} from 'app/components/';
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

  render() {
    const { I18n } = this.props;
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
      </div>
    );
  }
}

export default ContractPage;
