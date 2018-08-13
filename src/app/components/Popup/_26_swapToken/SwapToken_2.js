import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { nToBr } from 'utils';

const INIT_STATE = {
  sectionNum: 0,
  checked0: false,
  checked1: false,
  error: ''
}

@withLanguageProps
class SwapToken2 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    this.setState({
      sectionNum: this.props.isSwapWalletExist ? 1 : 0
    })
  }

  goBack = () => {
    this.setState({ sectionNum: 0, error: '', checked0: false, checked1: false });
  }

  handleSubmit = () => {
    const { isSwapWalletExist } = this.props;
    const { sectionNum } = this.state;
    if (!this.state[`checked${sectionNum}`]) {
      this.setState({error: 'buttonChecked'}, () => {
        let element = document.getElementById(`swap-token-2-scroll-${sectionNum}`)
         element.scrollTop = element.scrollHeight
      })
      return
    }
    else {
      switch(sectionNum) {
        case 0:
          this.setState({ sectionNum: 1, error: '', checked1: false });
          let element = document.getElementById(`swap-token-2-scroll-${sectionNum}`)
          element.scrollTop = 0
          break;
        case 1:
          this.props.setPopupNum(isSwapWalletExist ? 6 : 3);
          break;
        default:
          break;
      }
    }
  }

  toggleCheckbox = () => {
    const { sectionNum } = this.state;
    const newState = Object.assign({}, this.state);
    newState[`checked${sectionNum}`] = !this.state[`checked${sectionNum}`]
    this.setState(newState);
  }

  render() {
    const { I18n, language, isSwapWalletExist, wallets, icxSwapAddress } = this.props;
    const { sectionNum, error } = this.state;
    return (
      <ul className="layout">
        <li className={`swap ${isSwapWalletExist ? 'twostep' : ''}`}>
          <div className="tab-holder">
            <h1 className="title">Step 1</h1>
            <span className="img"><em className="_img step1"></em></span>
              <ul>
                {
                  sectionNum === 0 ? (<li className="on">{nToBr(I18n.swapToken.step1_0)}</li>)
                                   : isSwapWalletExist ? (<li className="on">{nToBr(I18n.swapToken.step1_1)}</li>)
                                                   : (<li className="on">{nToBr(I18n.swapToken.step1)}</li>)
                }
                <li>{isSwapWalletExist ? nToBr(I18n.swapToken.step5) : nToBr(I18n.swapToken.step2)}</li>
                {!isSwapWalletExist && (<li>{nToBr(I18n.swapToken.step3)}</li>)}
                {!isSwapWalletExist && (<li>{nToBr(I18n.swapToken.step4)}</li>)}
                {!isSwapWalletExist && (<li>{nToBr(I18n.swapToken.step5)}</li>)}
              </ul>
          </div>
          <div className="info">
            <ul>
              <li>{I18n.swapToken.leftInfoTitle1_1}</li>
              {
                isSwapWalletExist
                  ? language === 'kr' ? (<li className="dot space">{`${I18n.swapToken.leftInfoDesc1_1_1}${wallets[icxSwapAddress].name}${I18n.swapToken.leftInfoDesc1_1_2}`}</li>)
                                  : (<li className="dot space">{`${I18n.swapToken.leftInfoDesc1_1_1}${wallets[icxSwapAddress].name}`}</li>)
                  : (
                    <li className="dot space">{I18n.swapToken.leftInfoDesc1_1}</li>
                  )
              }

            </ul>
          </div>
        </li>
        <li className="content">
          <span onClick={this.props.cancelSwap} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.swapToken.title15}</h1>
          {
            sectionNum === 0 ? (<h2>{I18n.swapToken.rightHeaderDesc1}</h2>)
                             : (<h2>{I18n.swapToken.rightHeaderDesc1_1}</h2>)
          }
          <div className="scroll-holder">
            <div className="scroll" id={`swap-token-2-scroll-${sectionNum}`}>
              <div className="tabbox-holder">
                <div className="info">
                  {
                    sectionNum === 0 ? (
                      <ul>
                        <li>{I18n.swapToken.rightInfoTitle1_1}</li>
                        <li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_1_1}}></li>
                        <li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_1_2}}></li>
                        <li className="space">{I18n.swapToken.rightInfoTitle1_3}</li>
                        <li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_3_1}}></li>
                        <li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_3_3}}></li>
                      </ul>
                    ) : (
                      <ul>
                        <li>{I18n.swapToken.rightInfoTitle1_1_1}</li>
                        <li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_1_1_1}}></li>
                        <li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_1_2_1}}></li>
                        <li className="dot">· <a href='https://docs.google.com/spreadsheets/d/1HiT98wqEpFgF2d98eJefQfH7xK4KPPxNDiiXg3AcJ7w/edit#gid=0' target="_blank">{I18n.swapToken.rightInfoDesc1_1_3_1}</a></li>
                        <li className="dot" ref={ref => {if (ref) ref.innerHTML = I18n.swapToken.rightInfoDesc1_1_4_1}}></li>
                      </ul>
                    )
                  }
                </div>
                <ul className="read">
                  <li>
                    <input id="swap-token-cbox-01" className="cbox-type" type="checkbox" name="" onChange={this.toggleCheckbox} checked={this.state[`checked${sectionNum}`]}/>
                    <label htmlFor="swap-token-cbox-01" className="_img">{sectionNum === 0 ? I18n.swapToken.checkInfo : I18n.swapToken.checkCaution}</label>
                    {error && <p className='error'>{I18n.error[error]}</p>}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="btn-holder">
            { !isSwapWalletExist && sectionNum === 1 && (<button onClick={this.goBack} type="submit" className="btn-type-fill"><span>{I18n.button.back}</span></button>)}
            <button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.next}</span></button>
          </div>
        </li>
      </ul>
    );
  }
}

export default SwapToken2;
