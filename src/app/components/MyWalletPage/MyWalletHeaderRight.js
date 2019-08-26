import React, { Component } from 'react';

const INIT_STATE = {
  showInfo: false
}

class MyWalletHeaderRight extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  showInfo = () => {
    this.setState({
      showInfo: true
    })
  }

  hideInfo = () => {
    this.setState({
      showInfo: false
    })
  }

  handleExport = () => {
    this.props.openPopup({
      popupType: 'exportWallet'
    });
  }

  render() {
    return (
      <div>
        <div className="c-group">
          <p onClick={this.handleExport}>지갑 묶어서 내보내기<em className="_img"></em></p>
          <p>여러 개의 지갑을 한 번에 옮기고 싶을 때 선택하세요. <em onMouseOver={this.showInfo} onMouseLeave={this.hideInfo} className="_img"></em></p>
        </div>
        {
          this.state.showInfo && (
            <div className="layer">
              지갑 묶어서 내보내기는 ICON EX 지갑 파일들을<br />
              모두 묶어서 하나의 파일로 백업하는 기능입니다.<br />
              지갑 정보가 유실된 경우 또는 다른 기기로 지갑을<br />
              옮기는 경우 묶여있는 지갑을 한번에 가져올 수<br />
              있습니다.
              <em className="_img"></em>
            </div>
          )
        }
      </div>
    );
  }
}

export default MyWalletHeaderRight;
