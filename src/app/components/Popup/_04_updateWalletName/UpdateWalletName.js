import React, { Component } from 'react';
import { isWalletNameExists, isValidWalletName } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';
import { Alert } from 'app/components/'

const INIT_STATE = {
  newWalletName: '',
  showAlertWalletName: false,
  showAlertWalletNameSame: false
}

@withLanguageProps
class UpdateWalletName extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    this.setState({
      newWalletName: this.props.wallets[this.props.selectedAccount].name
    })
  }

  changeWalletName = (e) => {
    const { value } = e.target
    if (!isValidWalletName(value)) return
    this.setState({
      newWalletName: value
    })
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.initPopupState();
  }

  handleSubmit = () => {
    if (this.state.newWalletName.length < 1) {
      this.setState({ showAlertWalletName: true });
      return;
    }
    else if (isWalletNameExists(this.props.wallets, this.state.newWalletName)) {
      this.setState({ showAlertWalletNameSame: true });
      return;
    }
    this.props.updateWalletName(this.props.selectedAccount, this.state.newWalletName);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  closeAlert = () => {
    this.setState({
      showAlertWalletName: false,
      showAlertWalletNameSame: false
    })
  }

  render() {
    const {
      newWalletName,
      showAlertWalletName,
      showAlertWalletNameSame
    } = this.state;

    const { I18n } = this.props;

    return (
      <div>
        <div className="dimmed"></div>
        <div className="popup size-medium2">
          <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.updateWalletName.title}</h1>
          <h2>{I18n.updateWalletName.desc}</h2>
          <div className="scroll-holder">
    				<div className="scroll">
              <div className="tabbox-holder">
                <div>
                  <p className="title">{I18n.updateWalletName.inputLabel}</p>
                  <input onChange={this.changeWalletName} type="text" className="txt-type-normal" placeholder={I18n.updateWalletName.inputPlaceHolder} value={newWalletName} onKeyPress={this.handleKeyPress} spellCheck="false" />
                </div>
              </div>
            </div>
          </div>
          <div className="btn-holder">
            <button onClick={this.handleSubmit} type="submit" className={newWalletName.length < 1 ? 'btn-type-fill' : 'btn-type-normal'}><span>{I18n.button.change}</span></button>
          </div>
        </div>
        {
          showAlertWalletName && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertWalletName}
              cancelText={I18n.button.confirm}
            />
          )
        }
        {
          showAlertWalletNameSame && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertWalletNameSame}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

export default UpdateWalletName;
