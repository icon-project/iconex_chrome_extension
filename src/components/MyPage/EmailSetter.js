import React, { Component } from 'react';
import { EmailInput } from 'components/'

class EmailSetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentStatus = this.state.status
    if (currentStatus === 0 && nextProps.status === 1) {
      this.setState({status: 1})
    }
  }

  goToChangingStatus = (status) => {
    this.setState({status: status})
  }

  setPasscode = () => {
    const result = this.props.changeEmail(true)
    if (result) {
      this.goToChangingStatus(1)
    }
  }

  render() {
    const { emailError } = this.props
    const pwGroup = (status) => {
      switch (status) {
        case 0:
          return (
            <div className="pw-group">
              <EmailInput placeholder="이메일 입력"
                          setInputValue={(value)=>{this.props.setValue({email:value})}}
                          error={this.props.emailError}
                          clearError={()=>{this.props.setValue({emailError: undefined})}}
              />
              {!!emailError && <p className="error">{emailError}</p>}
              <p className="lock-txt">잠금번호를 잊으셨을 경우 등록하신 이메일로 임시 잠금 번호를 보내드립니다.</p>
            </div>
          )
        case 1:
          return (
            <div className="pw-group">
              <span>{this.props.emailAddress}</span>
              <button className="btn-type-normal2" onClick={this.goToChangingStatus.bind(this, 2)}><span>변경</span></button>
              <p className="lock-txt">잠금번호를 잊으셨을 경우 등록하신 이메일로 임시 잠금 번호를 보내드립니다.</p>
            </div>
          )
        case 2:
          return (
            <div className="pw-group">
              <EmailInput placeholder="이메일 입력"
                          setInputValue={(value)=>{this.props.setValue({email:value})}}
                          error={this.props.emailError}
                          clearError={()=>{this.props.setValue({emailError: undefined})}}
              />
              <button className="btn-type-normal2" onClick={this.setPasscode}><span>변경</span></button>
              {!!emailError && <p className="error">{emailError}</p>}
              <p className="lock-txt">잠금번호를 잊으셨을 경우 등록하신 이메일로 임시 잠금 번호를 보내드립니다.</p>
            </div>
          )
        default:
          return (
            <div className="pw-group">
            </div>
          )
      }
    }

    const { status } = this.state
    return (
      <div className="locknum-holder">
        <span className="label">이메일</span>
        {pwGroup(status)}
			</div>
    );
  }
}

export default EmailSetter;
