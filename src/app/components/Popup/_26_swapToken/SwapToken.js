import React, { Component } from 'react';
import { SwapToken0, SwapToken1, SwapToken2, SwapToken3, SwapToken4, SwapToken5, SwapToken6, Alert } from 'app/components/';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class SwapToken extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertClose: false,
      closeText: ''
    }
  }

  cancelSwap = () => {
    const { popupNum, isSwapWalletExist } = this.props;
    this.setState({
      alertClose: true,
      closeText: (isSwapWalletExist || popupNum === 6) ? 'cancelSwap' : 'cancelWalletAndSwap'
    })
  }

  handleCancel = () => {
    this.setState({alertClose: false})
  }

  handleSubmit = () => {
    this.props.setEXTRLogInState({
      isLoggedIn: false,
    });
    this.setState({alertClose: false})
    this.props.resetSignupReducer();
    this.props.resetSelectedWallet();
    this.props.closePopup();
    this.props.logIn();
  }

  render() {
    const { alertClose, closeText } = this.state
    const { I18n, popupNum } = this.props;

    const content = (num) => {
      switch(num) {
        case 0:
          return <SwapToken0 {...this.props}/>
        case 1:
          return <SwapToken1 {...this.props} />
        case 2:
          return <SwapToken2 {...this.props} cancelSwap={this.cancelSwap}/>
        case 3:
          return <SwapToken3 {...this.props} cancelSwap={this.cancelSwap}/>
        case 4:
          return <SwapToken4 {...this.props} cancelSwap={this.cancelSwap}/>
        case 5:
          return <SwapToken5 {...this.props} cancelSwap={this.cancelSwap}/>
        case 6:
          return <SwapToken6 {...this.props} cancelSwap={this.cancelSwap}/>
        default:
          break;
      }
    }

    return (
      <div>
        <div className="dimmed"></div>
        {popupNum === 0 || popupNum === 1 ?
          content(popupNum)
          :
          <div className="popup typeA">
            { content(popupNum) }
          </div>
        }
        {
          alertClose && (
            <Alert
              handleCancel={this.handleCancel}
              handleSubmit={this.handleSubmit}
              text={I18n.swapToken[closeText]}
              cancelText={I18n.button.no}
              submitText={I18n.button.yes}
            />
          )
        }
      </div>
    );
  }
}

export default SwapToken;
