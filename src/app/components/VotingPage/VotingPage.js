import React, { Component } from 'react';
import { MyStatus, SubRoute, Alert } from 'app/components';
import { VoteContainer, PRepsContainer } from 'app/containers';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  defaultTab: 0,
  showAbout: false,
}

@withLanguageProps
class VotingPage extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE
  }

  componentDidMount() {
    if (this.props.isLedger) {
      this.setState({
        defaultTab: 1
      })
    }
  }

  componentWillReceiveProps({ isVoteMode }) {
    if (this.props.isVoteMode !== isVoteMode && !isVoteMode) {
      this.setState({
        defaultTab: 1
      })
    }
  }

  componentWillUnmount() {
    this.props.resetReducer()
  }

  handleSetTabEvent = (i) => {
    if (i === 0 && !this.props.isLedger) {
      this.props.resetSelectedWallet()
    }
  }

  toggleAbout = () => {
    this.setState({
      showAbout: !this.state.showAbout
    })
  }

  render() {
    const { isVoteMode, I18n } = this.props
    const { defaultTab, showAbout } = this.state
    return isVoteMode ? (
      <VoteContainer />
    ) : (
        <div className={`content-wrap vote`}>
          <SubRoute
            title={I18n.voting}
            labels={[
              I18n.voting_sub1,
              I18n.voting_sub2,
            ]}
            components={[
              <PRepsContainer />,
              <MyStatus {...this.props} />
            ]}
            tooltip={
              <h4
                style={{ cursor: 'pointer' }}
                onClick={this.toggleAbout}
                className="about-vote">
                <i className="_img info-no"></i>
                {I18n.voting_about}
              </h4>
            }
            tab={defaultTab}
            handleSetTabEvent={this.handleSetTabEvent}
          />
          {
            showAbout && (
              <Alert
                handleCancel={this.toggleAbout}
                text={I18n.voting_about_desc}
                isBig={true}
                cancelText={I18n.button.confirm}
              />
            )
          }
        </div>
      );
  }
}

export default VotingPage;
