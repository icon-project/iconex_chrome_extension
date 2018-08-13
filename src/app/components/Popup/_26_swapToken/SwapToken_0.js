import React, { Component } from 'react';
const EXCHANGE_INFO = [{
  name: 'Binance',
  token: true,
  coin: false,
},{
  name: 'OKex',
  token: true,
  coin: false,
},{
  name: 'Huobi',
  token: true,
  coin: false,
},{
  name: 'Bithumb',
  token: true,
  coin: false,
},{
  name: 'Upbit',
  token: true,
  coin: false,
}]

const INIT_STATE = {}

class SwapToken1 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.closePopup();
  }

  nextPopup = () => {
    this.props.setPopupNum(1);
  }

  render() {
    const { I18n } = this.props;
    return (
      <div className="popup">
        <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
        <h1 className="title">{I18n.swapToken.swapInfoTitle}</h1>
        <h2>{I18n.swapToken.swapInfoDesc}</h2>
        <div className="scroll-holder">
          <div className="scroll">
            <div className="tabbox-holder">
              <div className="info">
                <ul>
                  <li>{I18n.swapToken.swapInfoCaution}</li>
                  <li className="dot">{I18n.swapToken.swapInfoCautionDesc1}</li>
                  <li className="dot">{I18n.swapToken.swapInfoCautionDesc2}</li>
                  <li className="space">{I18n.swapToken.swapInfoExchange}</li>
                  <li className="table">
                    <table className="table-typeD">
                      <thead>
                        <tr>
                          <th>{I18n.swapToken.tableExchange}</th>
                          <th>{I18n.swapToken.tableIcxToken}</th>
                          <th>{I18n.swapToken.tableIcxCoin}</th>
                        </tr>
                      </thead>
                      <tbody>
                      {EXCHANGE_INFO.map((exchange, index) => (
                        <tr key={index}>
                          <td>{exchange.name}</td>
                          <td><span className={exchange.token ? 'circle' : ''}></span></td>
                          <td>{exchange.coin ? '' : I18n.swapToken.tableReady}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </li>
                  <li className="space">{I18n.swapToken.swapProceed}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-holder">
          <button onClick={this.closePopup} type="submit" className="btn-type-fill"><span>{I18n.button.no}</span></button>
          <button onClick={this.nextPopup} type="submit" className="btn-type-normal"><span>{I18n.button.yes}</span></button>
        </div>
      </div>
    );
  }
}


export default SwapToken1;
