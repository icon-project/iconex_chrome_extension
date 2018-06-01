import React, { Component } from 'react';
import { ChangePasscode1, ChangePasscode2 } from 'app/components'

class ChangePasscode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasscodeStep: false
    };
  }

  setPasscodeStep = () => {
    this.setState({isPasscodeStep: true})
  }

  render() {
    return (
      <div>
        {!this.state.isPasscodeStep ?
          <ChangePasscode1 {...this.props} setPasscodeStep={this.setPasscodeStep}
          />
        :
          <ChangePasscode2 {...this.props} />
        }
      </div>
    );
  }
}

export default ChangePasscode;
