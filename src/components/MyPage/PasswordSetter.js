import React, { Component } from 'react';
import { PasswordInput } from 'components/'
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

  render() {
    const { I18n } = this.props;
    const pwGroup = (status) => {
      switch (status) {
        case 0:
          return (
            <div className="locknum-holder">
              <span className="label">{I18n.myPageLockNumber}</span>
              <div className="pw-group">
                <p className="label">{I18n.myPageLabel1}</p>
                <PasswordInput placeholder={I18n.myPagePlaceholder1}
                               setInputValue={(value, callback)=>{this.props.setValue({first:value}, callback)}}
                               error={I18n.error[this.props.firstError]}
                               clearError={this.props.clearError}
                               handleKeyPress={this.props.setPasscodeEmail}
                />
                <br/>
                <p className="label">{I18n.myPageLabel2}</p>
                <PasswordInput placeholder={I18n.myPagePlaceholder1}
                               setInputValue={(value, callback)=>{this.props.setValue({second:value}, callback)}}
                               error={I18n.error[this.props.secondError]}
                               clearError={this.props.clearError}
                               handleKeyPress={this.props.setPasscodeEmail}
                />
              </div>
            </div>
          )
        case 1:
          return (
            <div className="locknum-holder2">
              <span className="icon"><em className="_img"></em></span>
              <span className="txt">{I18n.myPageLockNumberUsing}</span>
              <button onClick={() => this.props.goToChangingStatus(2)} className="btn-type-normal"><span>{I18n.button.change}</span></button>
            </div>
          )
        case 2:
          return (
            <div className="locknum-holder">
              <span className="label">{I18n.myPageLockNumber}</span>
              <div className="pw-group">
                <p className="label long">{I18n.myPageLabel3}</p>
                <PasswordInput placeholder={I18n.myPagePlaceholder1}
                               setInputValue={(value, callback)=>{this.props.setValue({current:value}, callback)}}
                               error={I18n.error[this.props.currentError]}
                               clearError={this.props.clearError}
                               handleKeyPress={this.props.setPasscode}
                />
                <br/>
                <p className="label">{I18n.myPageLabel1}</p>
                <PasswordInput placeholder={I18n.myPagePlaceholder1}
                               setInputValue={(value, callback)=>{this.props.setValue({first:value}, callback)}}
                               error={I18n.error[this.props.firstError]}
                               clearError={this.props.clearError}
                               handleKeyPress={this.props.setPasscode}
                />
                <br/>
                <p className="label">{I18n.myPageLabel2}</p>
                <PasswordInput placeholder={I18n.myPagePlaceholder1}
                               setInputValue={(value, callback)=>{this.props.setValue({second:value}, callback)}}
                               error={I18n.error[this.props.secondError]}
                               clearError={this.props.clearError}
                               handleKeyPress={this.props.setPasscode}
                />
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
