import React, { Component } from 'react';

class EmailInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }

  handleInput = (e) => {
    const value = e.target.value
    this.setState({
      value: value
    })
    this.props.clearError()
  }

  handleBlur = () => {
    this.props.setInputValue(this.state.value)
  }

  render() {
    return (
      <input type="text" className="txt-type-normal"
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.handleInput}
        onBlur={this.handleBlur}
      />
    )
  }
}

export default EmailInput;
