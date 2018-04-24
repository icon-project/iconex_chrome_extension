import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { nToBr } from 'utils';

const INIT_STATE = {
  checked: false,
  error: ''
}

@withLanguageProps
class SwapToken2 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  handleSubmit = () => {
    if (!this.state.checked) {
      this.setState({error: 'buttonChecked'}, () => {
        let element = document.getElementById("swap-token-2-scroll")
         element.scrollTop = element.scrollHeight
      })
      return
    }
    else {
      this.props.setPopupNum(3);
    }
  }

  toggleCheckbox = () => {
    this.setState({checked: !this.state.checked})
  }

  render() {
    const { I18n } = this.props;
    const { checked, error } = this.state;
    return (
      <ul className="layout">
        <li className="swap">
          <div className="tab-holder">
            <h1 className="title">Step 1</h1>
            <span className="img"><em className="_img step1"></em></span>
            <ul>
              <li className="on">{I18n.swapToken.step1}</li>
              <li>{nToBr(I18n.swapToken.step2)}</li>
              <li>{nToBr(I18n.swapToken.step3)}</li>
              <li>{nToBr(I18n.swapToken.step4)}</li>
              <li>{nToBr(I18n.swapToken.step5)}</li>
            </ul>
          </div>
          <div className="info">
            <ul>
              <li>{I18n.swapToken.leftInfoTitle1_1}</li>
              <li className="dot space">{I18n.swapToken.leftInfoDesc1_1}</li>
            </ul>
          </div>
        </li>
        <li className="content">
          <span onClick={this.props.cancelSwap} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.swapToken.title}</h1>
          <h2>{I18n.swapToken.rightHeaderDesc1}</h2>
          <div className="scroll-holder">
						<div className="scroll" id="swap-token-2-scroll">
							<div className="tabbox-holder">
								<div className="info">
									<ul>
										<li>{I18n.swapToken.rightInfoTitle1_1}</li>
										<li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_1_1}}></li>
										<li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_1_2}}></li>
                  	<li className="space">{I18n.swapToken.rightInfoTitle1_3}</li>
                    <li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_3_1}}></li>
										<li className="dot">· <a href={`./resource/${I18n.swapToken.manualFileName}.pdf`} target="_blank">{I18n.swapToken.rightInfoDesc1_3_2}</a></li>
                    <li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_3_3}}></li>
                  </ul>
								</div>
								<ul className="read">
									<li>
										<input id="swap-token-cbox-01" className="cbox-type" type="checkbox" name="" onChange={this.toggleCheckbox} checked={checked}/>
										<label htmlFor="swap-token-cbox-01" className="_img">{I18n.swapToken.checkInfo}</label>
										{error && <p className='error'>{I18n.error[error]}</p>}
									</li>
								</ul>
							</div>
						</div>
					</div>
          <div className="btn-holder">
            <button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.next}</span></button>
          </div>
        </li>
      </ul>
    );
  }
}

export default SwapToken2;
