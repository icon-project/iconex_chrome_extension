import React, { Component } from 'react';
import { nToBr } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  coin: 'icx'
}

@withLanguageProps
class CreateWallet1 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  changeCoin = (e) => {
    const value = e.target.value;
    this.setState({
      coin: value
    })
  }

  handleSubmit = () => {
    this.props.setCoinType(this.state.coin);
    this.props.setPopupNum(2);
  }

  goBack = () => {
    this.setState(INIT_STATE);
    this.props.logIn();
  }

  render() {
    const {
      coin
    } = this.state;

    const { I18n } = this.props;

    return (
        <ul className="layout">
          <li className="step">
            <div className="tab-holder">
              <h1 className="title">STEP 1</h1>
              <span className="img"><em className="_img step1"></em></span>
              <ul>
                <li className="on">{I18n.createWallet.step1}</li>
                <li>{I18n.createWallet.step2}</li>
                <li>{I18n.createWallet.step3}</li>
                <li>{nToBr(I18n.createWallet.step4)}</li>
              </ul>
            </div>
            <div className="info">
              <ul>
                <li>{I18n.createWallet.leftInfoTitle1_1}</li>
                {/* <li className="dot space">{I18n.createWallet.leftInfoDesc1_1}</li>
                <li className="dot">{I18n.createWallet.leftInfoDesc1_2}</li> */}
                <li className="dot space">{I18n.createWallet.leftInfoDesc1_3}</li>
                <li className="dot">{I18n.createWallet.leftInfoDesc1_4}</li>
              </ul>
            </div>
          </li>
          <li className="content">
            <span onClick={() => this.goBack()} className="close"><em className="_img"></em></span>
  					<h1 className="title">{I18n.createWallet.title}</h1>
  					<h2>{I18n.createWallet.desc1}</h2>
  					<div className="scroll-holder">
  						<div className="scroll">
  							<div className="tabbox-holder">
  								<ul className="coin">
  									<li>
                      <input id="rbox-01" className="rbox-type" type="radio" name="rbox-1" value="icx" checked={coin === 'icx'} onChange={this.changeCoin} />
                      <label htmlFor="rbox-01" className="_img">ICON (ICX)</label>
  									</li>
  									<li>
                      <input id="rbox-02" className="rbox-type" type="radio" name="rbox-1" value="eth" checked={coin === 'eth'} onChange={this.changeCoin} />
                      <label htmlFor="rbox-02" className="_img">Ethereum (ETH)</label>
  									</li>
  								</ul>
  							</div>
  						</div>
  					</div>
  					<div className="btn-holder">
              <button onClick={() => this.handleSubmit()} type="submit" className="btn-type-next size-full"><span>{I18n.button.next}</span></button>
  					</div>
  				</li>
        </ul>
    );
  }
}

export default CreateWallet1;
