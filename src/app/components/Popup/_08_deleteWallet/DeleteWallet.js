import React, { Component } from 'react';
import { DeleteWallet1, DeleteWallet2 } from 'app/components/';

class DeleteWallet extends Component {

  render() {
    const {
      popupNum
    } = this.props;

    const content = (num) => {
      switch(num) {
        case 1:
          return <DeleteWallet1 {...this.props} />
        case 2:
          return <DeleteWallet2 {...this.props} />
        default:
          break;
      }
    }

    return (
      <div>
        <div className="dimmed fade-in"></div>
        { content(popupNum) }
      </div>
    );
  }
}

export default DeleteWallet;
