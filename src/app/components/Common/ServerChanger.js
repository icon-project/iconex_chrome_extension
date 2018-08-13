import React, { Component } from 'react';
import { getCurrentServer } from 'constants/config.js'
import withClickOut from 'HOC/withClickOut';

const INIT_STATE = {

}

class ServerChanger extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  changeServer = (index, coinType) => {
    localStorage.setItem(`${coinType}Server`, index);
    window.location.reload();
  }

  render() {
    return (
      <ul
        style={{
          position: 'absolute',
          top: '30px',
          right: '116px',
          display: 'inline-block'
        }}
      >
        <li
          style={{
            'float': 'left',
            'margin': '0 20px 0 0'
          }}>
          <ComboBox
            list={{
              'test_v2': 'test_v2',
              'test_v3_v2Obj': 'test_v3_v2Obj',
              'test_v3_tBears': 'test_v3_tBears',
              'main': 'main'
            }}
            index={getCurrentServer('icx')}
            setIndex={(index) => this.changeServer(index, 'icx')}
          />
          <span
            style={{
              display: 'block',
              fontSize: '10px',
              textAlign: 'center',
              marginTop: '6px',
              color: '#888'
            }}>ICX</span>
        </li>
        <li
          style={{
            'float': 'left',
            'margin': '0 20px 0 0'
          }}>
          <ComboBox
            list={{
              'ropsten': 'ropsten',
              'main': 'main'
            }}
            index={getCurrentServer('eth')}
            setIndex={(index) => this.changeServer(index, 'eth')}
          />
          <span
            style={{
              display: 'block',
              fontSize: '10px',
              textAlign: 'center',
              marginTop: '6px',
              color: '#888'
            }}>ETH</span>
        </li>
    </ul>
    );
  }
}


class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false
    }
  }

  toggleList = () => {
    if (this.props.disabled) {
      return
    }
    this.setState({
      showList: !this.state.showList
    })
  }

  setIndex = (index) => {
    if (typeof this.props.setIndex === 'function') {
      this.props.setIndex(index)
    }
  }

  render() {
    return (
      <span style={{
        border: '1px dotted #545454',
        padding: '4px'
      }} className={`money-group ${this.props.disabled ? 'disabled' : ''}`} onClick={this.toggleList}>
        {this.props.index ? this.props.list[this.props.index].toUpperCase() : '    '}
        {
          !this.props.noArrow && (
            <em className="_img"></em>
          )
        }
        <div
          style={{
            position: 'absolute',
            bottom: '44px'
          }}
        className="layer typeB">
        {this.state.showList &&
          <CurrencyList
            {...this.props}
            onClickOut={this.toggleList}
            setIndex={this.setIndex}
          />
        }
        </div>
      </span>
    )
  }
}

@withClickOut
class CurrencyList extends Component {
  render() {
    const list = this.props.list ? Object.values(this.props.list) : []
    const listKey = this.props.list ? Object.keys(this.props.list) : []
    return (
      <ul>
        {list.map((c, i) => {
          return <li style={{
            background: '#333',
            borderTop: '1px solid #555',
            padding: '4px',
            color: '#b1b1b1'
          }}
          key={i} className={listKey[i] === this.props.index ? 'on' : ''} onClick={this.props.setIndex.bind(this, listKey[i])}><span>{c.toUpperCase()}</span></li>
        })}
      </ul>
    )
  }
}

export default ServerChanger;
