import React, { Component } from 'react';
import { LockContent, ExportContent, SubRoute } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class MyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { I18n } = this.props;
    return (
      <SubRoute
        title={I18n.myPage}
        labels={[
          I18n.myPageSubTitle1,
          I18n.myPageSubTitle2
        ]}
        components={[
          <LockContent {...this.props} />,
          <ExportContent {...this.props} />
        ]}
      />
    );
  }
}

export default MyPage;
