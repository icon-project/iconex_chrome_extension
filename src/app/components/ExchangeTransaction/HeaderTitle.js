import React, { Component } from 'react';
import { } from 'app/components/'

const INIT_STATE = {}

class HeaderTitle extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {
    const { title, sub, goBack } = this.props
    return (
      <div className="title-holder sub">
        <h1 className='default-font-size'>{sub || title}</h1>
        {sub &&
          (<span><em style={{ cursor: 'pointer', fontWeight: 400 }} onClick={goBack}>{title}</em><i className="_img"></i><em>{sub}</em></span>)
        }
      </div>
    );
  }
}

export default HeaderTitle;
