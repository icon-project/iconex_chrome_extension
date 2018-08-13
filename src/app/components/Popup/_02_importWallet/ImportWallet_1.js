import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  importType: 'ks'
}

@withLanguageProps
class ImportWallet1 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  changeImportType = (e) => {
    this.setState({
      importType: e.target.value
    })
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.resetSignupReducer();
    this.props.closePopup();
  }

  handleSubmit = () => {
    if(this.state.importType === 'ks') {
      this.props.setPopupNum(2);
    } else {
      this.props.setPopupNum(3);
    }
  }

  render() {
    const {
      importType
    } = this.state;

    const { I18n } = this.props;

    return (
      <div>
        <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
        <h1 className="title">{I18n.importWallet.title}</h1>
        <h2>{I18n.importWallet.desc1}</h2>
        <div className="scroll-holder">
  				<div className="scroll">
  					<div className="tabbox-holder">
  						<ul className="coin">
  							<li>
                  <input id="rbox-01" className="rbox-type" type="radio" name="rbox-1" value="ks" checked={importType === 'ks'} onChange={this.changeImportType} />
                  <label htmlFor="rbox-01" className="_img">{I18n.importWallet.radioLabel1_1}</label>
  							</li>
  							<li>
                  <input id="rbox-02" className="rbox-type" type="radio" name="rbox-1" value="priv" checked={importType === 'priv'} onChange={this.changeImportType} />
                  <label htmlFor="rbox-02" className="_img">{I18n.importWallet.radioLabel1_2}</label>
                </li>
  						</ul>
  					</div>
  				</div>
  			</div>
        <div className="btn-holder">
          <button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.next}</span></button>
        </div>
      </div>
    );
  }
}

export default ImportWallet1;
