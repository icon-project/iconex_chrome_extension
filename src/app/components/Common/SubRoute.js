import React, { Component } from 'react'

export default class SubRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: props.tab || 0
    }
  }

  setTab = (i) => {
    const { handleSetTabEvent } = this.props
    if (handleSetTabEvent) handleSetTabEvent(i)
    this.setState({
      tab: i
    })
  }

  render() {
    const { tab } = this.state
    const { title, components, labels, tooltip } = this.props
    return (
      <div>
        <div className="title-holder sub">
          <h1 className="no">{title}</h1>
          <div className="tab-holder">
            <ul>
              {
                labels.map((label, i) => (
                  <li key={i} onClick={() => this.setTab(i)} className={tab === i ? 'on' : ''}>{label}</li>
                ))
              }
            </ul>
            {tooltip}
          </div>
        </div>
        {components[tab]}
      </div>
    )
  }
}
