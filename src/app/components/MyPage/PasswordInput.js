import React, { Component } from 'react';

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleInput = (e) => {
    const value = e.target.value.replace(/\s+/g, '');
    if (isNaN(value) || value.length > 6) {
      return
    }
    this.setState({
      value: value
    })

    this.props.clearError()
  }

  handleBlur = () => {
    this.props.setInputValue(this.state.value)
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.setInputValue(this.state.value, () => {
        this.props.handleKeyPress();
      })
    }
  }

  render() {
    const { error } = this.props
    return (
      <div style={{ display: "inline" }}>
        <input type="password" className={`txt-type-normal ${error && 'error'}`}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          onKeyPress={this.handleKeyPress}
        />
        {!!error && <p className="error">{error}</p>}
      </div>
    )
  }
}

export default PasswordInput;
