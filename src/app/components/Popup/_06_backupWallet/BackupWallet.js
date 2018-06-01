import React, { Component } from 'react';
import { BackupWallet1, BackupWallet2 } from 'app/components/';

class BackupWallet extends Component {

  render() {

    const {
     popupNum
    } = this.props;

    const content = (num) => {
      switch(num) {
        case 1:
          return <BackupWallet1 {...this.props} />
        case 2:
          return <BackupWallet2 {...this.props} />
        default:
          break;
      }
    }

    return (
      <div>
        <div className="dimmed"></div>
        { content(popupNum) }
      </div>
    );
  }
}

export default BackupWallet;
