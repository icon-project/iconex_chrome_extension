import React, { Component } from 'react';
import { ComboBox } from 'app/components/'

const INIT_STATE = {
  currencyIndex: 0,
  isOpen: false,
}

const CURRENCY = ["USD", "BTC", "ETH"]

class ExchangePanel extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  setCurrencyIndex = (index) => {
    this.setState({ currencyIndex: index })
  }

  toggleFullList = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const {
      isOpen
    } = this.state

    return (
      <div className="wrap-holder bg list">
        <ComboBox
          list={CURRENCY}
          index={this.state.currencyIndex}
          setIndex={this.setCurrencyIndex}
        />
        <ExchangeList isOpen={isOpen} />
        <span className={isOpen ? 'b-group' : 'b-group open'}
          onClick={this.toggleFullList}
        >
          <em className="_img"></em>
        </span>
      </div>
    );
  }
}

class ExchangeList extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {
    const ITEMS = [
      <li>
        <span>ICX/BCH</span>
        <span>0.0025</span>
        <span className="up">1.0%<em className="_img"></em></span>
      </li>,
      <li>
        <span>ICX/BCH</span>
        <span>0.0025</span>
        <span className="up">1.0%<em className="_img"></em></span>
      </li>,
      <li>
        <span>ICX/BCH</span>
        <span>0.0025</span>
        <span className="up">1.0%<em className="_img"></em></span>
      </li>,
      <li>
        <span>ICX/BCH</span>
        <span>0.0025</span>
        <span className="up">1.0%<em className="_img"></em></span>
      </li>,
      <li>
        <span>ICX/BCH</span>
        <span>0.0025</span>
        <span className="up">1.0%<em className="_img"></em></span>
      </li>,
      <li>
        <span>ICX/BCH</span>
        <span>0.0025</span>
        <span className="up">1.0%<em className="_img"></em></span>
      </li>,
      <li>
        <span>ICX/BCH</span>
        <span>0.0025</span>
        <span className="up">1.0%<em className="_img"></em></span>
      </li>,
      <li>
        <span>ICX/BCH</span>
        <span>0.0025</span>
        <span className="up">1.0%<em className="_img"></em></span>
      </li>,
      <li>
        <span>ICX/BCH</span>
        <span>0.0025</span>
        <span className="up">1.0%<em className="_img"></em></span>
      </li>
    ]

    const { isOpen } = this.props
    const list = isOpen ? ITEMS : ITEMS.splice(0, 4)

    return (
      <div className="exchange-list">
        <ul>
          {list.map(l => { return (l) })}
        </ul>
      </div>
    );
  }
}

export default ExchangePanel;
