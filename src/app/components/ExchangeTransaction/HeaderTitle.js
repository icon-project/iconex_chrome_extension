import React, { Component } from 'react';
import { } from 'app/components/'

const INIT_STATE = {}

class HeaderTitle extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {
    return (
      <div className="title-holder sub">
        <h1 className='default-font-size'>{this.props.title}</h1>
      </div>
    );
  }
}

export default HeaderTitle;
