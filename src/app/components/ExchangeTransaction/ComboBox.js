import React, { Component } from 'react';
import withClickOut from 'HOC/withClickOut';

const INIT_STATE = {
  showList: false
}

class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
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
      <div className={`money-group ${this.props.disabled ? 'disabled' : ''}`} onClick={this.toggleList}>
        {this.props.list[this.props.index] ? this.props.list[this.props.index].toUpperCase() : '    '}
        {
          !this.props.noArrow && (
            <em className="_img"></em>
          )
        }
        {this.state.showList &&
          <div className="drop-box addtoken">
            <div className="drop-layer">
              <CurrencyList
                {...this.props}
                onClickOut={this.toggleList}
                setIndex={this.setIndex}
              />
            </div>
          </div>
        }
      </div>
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
          return <li key={i} className={listKey[i] === this.props.index ? 'on' : ''} onClick={this.props.setIndex.bind(this, listKey[i])}><span>{c.toUpperCase()}</span></li>
        })}
      </ul>
    )
  }
}

export default ComboBox;
