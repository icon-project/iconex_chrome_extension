import React, { Component } from 'react';
import { getCurrentServer, getCurrentICXApiVersion, getCustomIcxServer } from 'constants/config.js'
import withClickOut from 'HOC/withClickOut';
import { checkURLSuffix } from 'utils';

const INIT_STATE = {
  showCustomInput: getCurrentServer('icx') === 'custom',
  customWalletURL: getCustomIcxServer().customWalletURL,
  customTrackerURL: getCustomIcxServer().customTrackerURL
}

// style
const ulStyle = {
  position: 'absolute',
  top: '20px',
  right: '110px',
  display: 'inline-block'
}
const liStyle = {
  'float': 'left',
  'margin': '0 20px 0 0',
}
const borderStyle = { width: 3, borderRight: '1px solid #5f5f5f', marginRight: 20, height: 47, float: 'left'}
const spanStyle = {
  display: 'block',
  fontSize: '10px',
  textAlign: 'center',
  marginTop: '6px',
  color: '#888'
}
const emStyle = {color: '#666'}

const inputUlStyle = {
  position: 'absolute',
  right: '353px',
  top: '20px'
}

const inputLiStyle = {
  float: 'left',
  marginRight: '20px'
}

const inputButtonStyle = {
  background: 'none',
  border: '1px dotted #777',
  borderRadius: '2px',
  width: '38px',
  height: '20px',
  fontSize: '11px',
  color: '#888',
  padding: 0
}

// list constants
const icxServerList = {
  'mainnet': 'mainnet',
  'euljiro': 'euljiro',
  'yeouido': 'yeouido',
  'custom': 'custom'
}
const icxApiVersionList = {
  'v2': 'v2',
  'v3': 'v3'
}
const ethServerList = {
  'ropsten': 'ropsten',
  'main': 'main'
}

class ServerChanger extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  changeICXApiVersion = (index) => {
    localStorage.setItem(`icxApiVersion`, index);
    window.location.reload();
  }

  changeServer = (index, coinType) => {
    if (index === icxServerList['custom']) {
      this.setState({
        showCustomInput: true
      })
      return;
    }
    localStorage.setItem(`${coinType}Server`, index);
    localStorage.setItem('customIcxServer', '')
    window.location.reload();
  }

  handleChangeInput = (e) => {
    const target = e.target.getAttribute('data-name');
    const newState = { ...this.state }
    newState[target] = e.target.value
    this.setState(newState)
  }

  setCustomURL = () => {
    const { customWalletURL, customTrackerURL } = this.state;
    const customIcxServer = {
      customWalletURL: checkURLSuffix(customWalletURL),
      customTrackerURL: checkURLSuffix(customTrackerURL)
    }
    localStorage.setItem('customIcxServer', JSON.stringify(customIcxServer))
    localStorage.setItem(`icxServer`, 'custom');
    window.location.reload();
  }

  render() {
    const { showCustomInput, customWalletURL, customTrackerURL } = this.state;
    return (
      <div>
        {
          showCustomInput && (
            <ul style={inputUlStyle}>
              <li style={inputLiStyle}><input type="text" placeholder="ex) https://xyz:3000" data-name='customWalletURL' onChange={this.handleChangeInput} value={customWalletURL} /><span style={spanStyle}>Wallet URL</span></li>
              <li style={inputLiStyle}><input type="text" placeholder="ex) https://xyz:3000" data-name='customTrackerURL' onChange={this.handleChangeInput} value={customTrackerURL} /><span style={spanStyle}>Tracker URL</span></li>
              <li style={inputLiStyle}><button style={inputButtonStyle} onClick={this.setCustomURL}>설정</button></li>
            </ul>
          )
        }
        <ul style={ulStyle}>
          <li
            style={liStyle}>
            <ComboBox
              list={icxServerList}
              index={showCustomInput ? 'custom' : getCurrentServer('icx')}
              setIndex={(index) => this.changeServer(index, 'icx')}
            />
            <span
              style={spanStyle}>ICX <em style={emStyle}>(SERVER)</em></span>
          </li>
          {/*
          <li
            style={liStyle}>
            <ComboBox
              list={icxApiVersionList}
              index={getCurrentICXApiVersion()}
              setIndex={(index) => this.changeICXApiVersion(index)}
            />
            <span
              style={spanStyle}>ICX <em style={emStyle}>(API VER)</em></span>
          </li>
          */}
          <li style={borderStyle}></li>
          <li style={liStyle}>
            <ComboBox
              list={ethServerList}
              index={getCurrentServer('eth')}
              setIndex={(index) => this.changeServer(index, 'eth')}
            />
            <span style={spanStyle}>ETH</span>
          </li>
        </ul>
      </div>
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
        padding: 2,
        width: 72,
        display: 'block',
        textAlign: 'center',
        fontSize: '14px',
        color: '#9e9e9e'
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
            bottom: '44px',
            width: '72px',
            marginLeft: '-3px'
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
