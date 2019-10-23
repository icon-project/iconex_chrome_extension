//https://www.jamestease.co.uk/blether/detect-clicks-outside-element-with-react-components
import React from 'react';
import ReactDOM from 'react-dom';

const withClickOut = (WrappedComponent) => {
  return class withClickOut extends React.Component {
    componentWillMount() {
      document.addEventListener('click', this.handleClick, false);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClick, false);
    }
    // fat arrow function binds 'this' to class when called by the listener
    // otherwise you'd need 'this.handleClick.bind(this)' in the constructor
    handleClick = e => {
      // this is the key part - ReactDOM.findDOMNode(this) gives you a reference
      // to your CalendarPopup component;
      // e.target is the element which was clicked upon.
      // check whether the element clicked upon is in your component - if not,
      // then call the close logic
      if (!ReactDOM.findDOMNode(this).contains(e.target)) {
        // the click was outside your component, so handle closing here
        this.props.onClickOut();
      }
    }

    render() {
      return (<WrappedComponent {...this.props} />)
    }
  }
}

export default withClickOut
