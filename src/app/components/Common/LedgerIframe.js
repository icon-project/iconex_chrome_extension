/** @format */

import React, { Component } from "react";
import queryString from "qs";
import { WalletList } from "app/components";

const INIT_STATE = {
  error: "",
};

class LedgerIframe extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.isHidden !== nextProps.isHidden) {
      return true;
    }
    return false;
  }

  eventHandler = async (event) => {
    const { handleSuccess, handleError } = this.props;
    // const { data } = event;
    const data = event;
    const parsedData = JSON.parse(data);
    const { error } = parsedData;
    if (!error) {
      return await handleSuccess(event);
    } else {
      handleError(error);
    }
  };

  render() {
    const { isHidden, method, query, path, language, popupType } = this.props;
    const queryToString = query ? `&${queryString.stringify(query)}` : "";
    return (
      <div
        style={
          isHidden
            ? {
                display: "none",
              }
            : {
                display: "block",
              }
        }
      >
        <WalletList
          method={method}
          popupType={popupType}
          language={language}
          networkVer={"v3"}
          path={path}
          queryToString={queryToString}
          eventHandler={this.eventHandler}
        />
      </div>
    );
  }
}

export default LedgerIframe;
