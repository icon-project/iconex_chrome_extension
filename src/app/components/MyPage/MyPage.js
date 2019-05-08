import React, { Component } from 'react';
import { LockContent, ExportContent } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  tab: 'lock'
}

@withLanguageProps
class MyPage extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE
  }

  setTab = (e) => {
    const target = e.target.getAttribute('data-name');
    this.setState({
      tab: target
    })
  }

  render() {
    const { tab } = this.state;
    const { I18n } = this.props;
    return (
      <div>
        <div className="title-holder sub">
  				<h1 className="no">{I18n.myPage}</h1>
          <div className="tab-holder">
  					<ul>
  						<li onClick={this.setTab} data-name={'lock'} className={tab === 'lock' ? 'on' : ''}>{I18n.myPageSubTitle1}</li>
  						<li onClick={this.setTab} data-name={'export'} className={tab === 'export' ? 'on' : ''}>{I18n.myPageSubTitle2}</li>
  					</ul>
  				</div>
        </div>
        {
          tab === 'lock' ? (<LockContent {...this.props} />)
                         : (<ExportContent {...this.props} />)
        }
      </div>
    );
  }
}

export default MyPage;
