import React from 'react';
import {connect} from "react-redux";
import i18n from 'constants/i18n'

const withLanguageProps = (WrappedComponent) => {
  class withLanguageProps extends React.Component {
    render() {
      const I18n = i18n[this.props.language];
      return ( <WrappedComponent {...this.props} I18n={I18n} /> )
    }
  }

  function mapStateToProps(state) {
    return {
      language: state.global.language
    }
  }

  function mapDispatchToProps(dispatch) {
    return {

    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(withLanguageProps)
}

export default withLanguageProps;
