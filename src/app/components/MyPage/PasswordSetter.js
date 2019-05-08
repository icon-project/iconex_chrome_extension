import React, { Component } from 'react';
import { PasswordInput } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class PasswordSetter extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillReceiveProps(nextProps) {
    const currentProps = this.props.status
    if (currentProps === 0 && nextProps.status === 1) {
      this.props.goToChangingStatus(1)
    }
  }

  unlock = () => {
    this.props.openPopup({
      popupType: 'unlockPopup'
    })
  }

  render() {
    const { I18n } = this.props;
    const pwGroup = (status) => {
      switch (status) {
        case 0:
          return (
            <div className="locknum-holder">
              <div className="pw-group">
                <div className="group">
                  <span className="label">{I18n.myPageLabel1}</span>
                  <PasswordInput placeholder={I18n.myPagePlaceholder1}
                                setInputValue={(value, callback)=>{this.props.setValue({first:value}, callback)}}
                                error={I18n.error[this.props.firstError]}
                                clearError={this.props.clearError}
                                handleKeyPress={this.props.setNewPasscode}
                  />
                </div>
                <div className="group">
                  <span className="label">{I18n.myPageLabel2}</span>
                  <PasswordInput placeholder={I18n.myPagePlaceholder1}
                                setInputValue={(value, callback)=>{this.props.setValue({second:value}, callback)}}
                                error={I18n.error[this.props.secondError]}
                                clearError={this.props.clearError}
                                handleKeyPress={this.props.setNewPasscode}
                  />
                </div>
              </div>
            </div>
          )
        case 1:
          return (
            <div className="locknum-holder2">
              <span className="icon"><em className="_img"></em></span>
              <span className="txt">{I18n.myPageLockNumberUsing}</span>
              <div className="btn-holder">
                <button className="btn-type-txt" onClick={() => this.props.goToChangingStatus(2)}><span>{I18n.button.change}</span></button>
                <button className="btn-type-txt" onClick={this.unlock}><span>{I18n.button.unlock}</span></button>						
              </div>
            </div>
          )
        case 2:
          return (
            <div className="locknum-holder">
              <div className="pw-group">
                <div className="group">
                  <p className="label">{I18n.myPageLabel3}</p>
                  <PasswordInput placeholder={I18n.myPagePlaceholder1}
                                setInputValue={(value, callback)=>{this.props.setValue({current:value}, callback)}}
                                error={I18n.error[this.props.currentError]}
                                clearError={this.props.clearError}
                                handleKeyPress={this.props.changeToNewPasscode}
                  />
                </div>
                <div className="group">
                  <p className="label">{I18n.myPageLabel1}</p>
                  <PasswordInput placeholder={I18n.myPagePlaceholder1}
                                setInputValue={(value, callback)=>{this.props.setValue({first:value}, callback)}}
                                error={I18n.error[this.props.firstError]}
                                clearError={this.props.clearError}
                                handleKeyPress={this.props.changeToNewPasscode}
                  />
                </div>
                <div className="group">
                  <p className="label">{I18n.myPageLabel2}</p>
                  <PasswordInput placeholder={I18n.myPagePlaceholder1}
                                setInputValue={(value, callback)=>{this.props.setValue({second:value}, callback)}}
                                error={I18n.error[this.props.secondError]}
                                clearError={this.props.clearError}
                                handleKeyPress={this.props.changeToNewPasscode}
                  />
                </div>
              </div>
            </div>
          )
        default:
          return (
            <div className="pw-group">
            </div>
          )
      }
    }

    const { status } = this.props
    return (
      <div>
        {pwGroup(status)}
			</div>
    );
  }
}

export default PasswordSetter;
