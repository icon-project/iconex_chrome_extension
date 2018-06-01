import React, { Component } from 'react';
import { ExportWallet1 } from 'app/components/';
import { ExportWallet2 } from 'app/components/';
import { ExportWallet3 } from 'app/components/';

class ExportWallet extends Component {

  render() {

    const {
      popupNum
    } = this.props;

    const content = (num) => {
      switch(num) {
        case 1:
          return <ExportWallet1 {...this.props} />
        case 2:
          return <ExportWallet2 {...this.props} />
        case 3:
          return <ExportWallet3 {...this.props} />
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

export default ExportWallet;
