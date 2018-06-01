import React, { Component } from 'react';

const INIT_STATE = {
}

class SendEmail extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.props.togglePopup();
  }

  render() {
    return (
      <div>
        <div className="dimmed"></div>
    		<div className="popup">
    			<div className="gradient"></div>
    			<p><span>{this.props.email}</span>으로<br/>임시 잠금번호가 전송되었습니다.</p>
    			<p className="txt">이메일을 확인해주세요.</p>
    			<div className="btn-holder">
    				<button className="btn-type-fill" onClick={this.closePopup}><span>확인</span></button>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default SendEmail;
