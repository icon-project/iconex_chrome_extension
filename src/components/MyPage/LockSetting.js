import React, { Component } from 'react';
import { LockContent } from 'components/'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
}

@withLanguageProps
class LockSetting extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
  }


  render() {
    const { I18n } = this.props;

    return (
      <div>
        <div className="title-holder sub">
  				<h1>{I18n.myPageSubTitle1}</h1>
  				<p className="lock-txt">
            {I18n.myPageInfo2}
          </p>
  			</div>

        <LockContent {...this.props} />

      </div>
    );
  }
}

export default LockSetting;
