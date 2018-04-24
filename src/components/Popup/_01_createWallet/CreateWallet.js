import React, { Component } from 'react';
import { CreateWallet1, CreateWallet2, CreateWallet3, CreateWallet4 } from 'components/';

class CreateWallet extends Component {
  render() {

    const {
      popupNum
    } = this.props;

    const content = (num) => {
      switch(num) {
        case 1:
          return <CreateWallet1 {...this.props} />
        case 2:
          return <CreateWallet2 {...this.props} />
        case 3:
          return <CreateWallet3 {...this.props} />
        case 4:
          return <CreateWallet4 {...this.props} />
        default:
          break;
      }
    }

    return (
      <div>
        <div className="dimmed"></div>
        <div className="popup typeA">
          { content(popupNum) }
        </div>
      </div>
    );
  }
}

export default CreateWallet;
