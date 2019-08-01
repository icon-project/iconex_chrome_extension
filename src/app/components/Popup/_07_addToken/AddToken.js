import React, { Component } from 'react';
import { AddToken1 } from 'app/components/';
import { AddToken2 } from 'app/components/';

class AddToken extends Component {

  render() {
    const {
      popupNum
    } = this.props;

    const content = (num) => {
      switch (num) {
        case 1:
          return <AddToken1 {...this.props} />
        case 2:
          return <AddToken2 {...this.props} />
        default:
          break;
      }
    }

    return (
      <div>
        <div className="dimmed"></div>
        <div className="popup tokenAdd moving-down">
          {content(popupNum)}
        </div>
      </div>
    );
  }
}

export default AddToken;
