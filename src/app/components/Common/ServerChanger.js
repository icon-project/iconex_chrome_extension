import React, { Component } from 'react';
import { getCurrentServer, getCurrentTracker, getCustomIcxServer} from 'constants/config.js'
import withClickOut from 'HOC/withClickOut';
import { checkURLSuffix } from 'utils';
import { icxServerList, icxTrackerList, ethServerList} from 'constants/config'

const INIT_STATE = {
  showCustomInput: getCurrentServer('icx') === 'custom',
  customWalletURL: getCustomIcxServer().customWalletURL,
  customTrackerURL: getCustomIcxServer().customTrackerURL,
  customNid: getCustomIcxServer().customNid
}

// style
const ulStyle = {
  position: 'absolute',
  top: '6px',
  right: '110px',
  display: 'inline-block'
}
const liStyle = {
  'float': 'left',
  'margin': '0 20px 0 0',
}
const borderStyle = { width: 3, borderRight: '1px solid #5f5f5f', marginRight: 20, height: 38, float: 'left' }
const spanStyle = {
  display: 'block',
  fontSize: '10px',
  textAlign: 'center',
  marginTop: '0px',
  color: '#888'
}
const emStyle = { color: '#666' }

const inputUlStyle = {
  position: 'absolute',
  right: '450px',
  top: '8px'
}

const inputLiStyle = {
  float: 'left',
  marginRight: '20px'
}

const inputButtonStyle = {
  background: 'none',
  border: '1px dotted #777',
  borderRadius: '2px',
  width: '45px',
  height: '20px',
  fontSize: '11px',
  color: '#888',
  padding: 0,
  marginTop: 6,
  cursor: 'pointer'
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

  changeTracker = (index, coinType) => {
    localStorage.setItem(`${coinType}Tracker`, index);
    window.location.reload();
  }


  handleChangeInput = (e) => {
    const target = e.target.getAttribute('data-name');
    const newState = { ...this.state }
    newState[target] = e.target.value
    this.setState(newState)
  }

  setCustomURL = () => {
    const { customWalletURL, customTrackerURL, customNid } = this.state;
    const customIcxServer = {
      customWalletURL: checkURLSuffix(customWalletURL),
      customTrackerURL: checkURLSuffix(customTrackerURL),
      customNid: customNid
    }
    localStorage.setItem('customIcxServer', JSON.stringify(customIcxServer))
    localStorage.setItem(`icxServer`, 'custom');
    window.location.reload();
  }

  render() {
    const { showCustomInput, customWalletURL, customTrackerURL, customNid } = this.state;
    const { I18n } = this.props;
    return (
      <div>
        {
          showCustomInput && (
            <ul style={inputUlStyle}>
              <li style={inputLiStyle}><input type="text" placeholder="ex) https://xyz:3000" data-name='customWalletURL' onChange={this.handleChangeInput} value={customWalletURL} /><span style={spanStyle}>Wallet URL</span></li>
              <li style={inputLiStyle}><input type="text" placeholder="ex) https://xyz:3000" data-name='customTrackerURL' onChange={this.handleChangeInput} value={customTrackerURL} /><span style={spanStyle}>Tracker URL</span></li>
              <li style={inputLiStyle}><input type="text" placeholder="ex) 0x1" data-name='customNid' onChange={this.handleChangeInput} value={customNid} /><span style={spanStyle}>nid</span></li>
              <li style={inputLiStyle}><button style={inputButtonStyle} onClick={this.setCustomURL}>{I18n.button.confirm}</button></li>
            </ul>
          )
        }
        <ul style={ulStyle}>
          <li
            style={liStyle}>
            <ComboBox
              width={72}
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
                width={80}
                list={icxTrackerList}
                index={getCurrentTracker('icx')}
                setIndex={(index) => this.changeTracker(index, 'icx')}
            />
            <span
              style={spanStyle}>ICX <em style={emStyle}>(TRACKER)</em></span>
          </li>
          <li style={borderStyle}></li>
          <li style={liStyle}>
            <ComboBox
              width={72}
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
    const { width } = this.props
    return (
      <span style={{
        border: '1px dotted #545454',
        padding: 2,
        width: width,
        display: 'block',
        textAlign: 'center',
        fontSize: '11px',
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
            width: width,
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
