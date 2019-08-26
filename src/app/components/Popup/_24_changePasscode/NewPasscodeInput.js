import React, { Component } from 'react';

class NewPasscodeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  handleChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '');
    if (isNaN(value) || value.length > 6) {
      return
    }
    this.setState({
      value: value
    }, () => {
      this.props.clearError()
    })
  }

  handleBlur = () => {
    this.props.setInputValue(this.state.value)
  }

  render() {
    const {
      error,
      divClassName,
      placeholder,
      title
    } = this.props

    return (
      <div className={divClassName}>
        <p className="title">{title}</p>
        <input type="password" className={`txt-type-normal ${error && 'error'}`} placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {!!error && <p className="error">{error}</p>}
      </div>
    )
  }
}

export default NewPasscodeInput;
