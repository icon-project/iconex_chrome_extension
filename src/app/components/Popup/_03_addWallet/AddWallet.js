import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  addType: 'create'
}

@withLanguageProps
class AddWallet extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  changeAddType = (e) => {
    this.setState({
      addType: e.target.value
    })
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.closePopup();
  }

  handleSubmit = () => {
    if(this.state.addType === 'create') {
      this.props.openPopup({
        popupType: 'createWallet'
      });
    } else {
      this.props.openPopup({
        popupType: 'importWallet'
      });
    }
  }

  render() {
    const {
      addType
    } = this.state;

    const { I18n } = this.props;

    return (
      <div className="popup-wrap">
        <div className="dimmed fade-in"></div>
    		<div className="popup moving-down">
          <div className="header">
            <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
            <h1 className="title">{I18n.addWallet.title}</h1>
            <h2>{I18n.addWallet.desc}</h2>
          </div>

    			<div className="scroll-holder">
    				<div className="scroll">
    					<div className="tabbox-holder">
    						<ul className="coin">
    							<li>
                    <input id="rbox-01" className="rbox-type" type="radio" name="rbox-1" value="create" checked={addType === 'create'} onChange={this.changeAddType} />
                    <label htmlFor="rbox-01" className="_img">{I18n.addWallet.radioLabel1}</label>
                    <p className="message">{I18n.addWallet.radioDesc1}</p>
    							</li>
    							<li>
                    <input id="rbox-02" className="rbox-type" type="radio" name="rbox-1" value="import" checked={addType === 'import'} onChange={this.changeAddType} />
                    <label htmlFor="rbox-02" className="_img">{I18n.addWallet.radioLabel2}</label>
                    <p className="message">{I18n.addWallet.radioDesc2}</p>
    							</li>
    						</ul>
    					</div>
    				</div>
    			</div>
    			<div className="btn-holder">
            <button onClick={this.handleSubmit} type="submit" className="btn-type-next size-full"><span>{I18n.button.next}</span></button>
    			</div>
    		</div>
      </div>
    );
  }
}

export default AddWallet;
