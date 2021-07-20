import React, { Component } from "react";
import { HeaderTitle, LoadingComponent, VoteAlerts } from "app/components/";
import {
  PRepsVotingStatusGraphContainer,
  PRepsLeaderboardContainer,
  MyPRepsTableContainer,
} from "app/containers/";
import withLanguageProps from "HOC/withLanguageProps";

const ALERT_MSG = {
  NO_BALANCE: "NO_BALANCE",
  NO_CHANGE: "NO_CHANGE",
  GT_MAX: "GT_MAX",
  SUCCESS_STAKE: "SUCCESS",
  SHOW_LEDGER: "SHOW_LEDGER",
  CONFIRM: "CONFIRM",
};

const INIT_STATE = {
  fixedClass: "",
  showToast: false,
  alert: "",
  alertText: "",
  maxAvailable: 0,
};

@withLanguageProps
class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.toastTimeOut = null;
  }

  componentDidMount() {
    window.scroll(0, 0);
    this.props.getData();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { loading, myVotesCnt, getEstimatedTxFee } = this.props;
    if (loading !== prevProps.loading && !loading) {
      getEstimatedTxFee();
      this.handleScroll();
      window.addEventListener("scroll", this.handleScroll);
    }

    if (
      myVotesCnt !== prevProps.myVotesCnt &&
      myVotesCnt > prevProps.myVotesCnt &&
      !prevProps.loading
    ) {
      this.showToast();
    }
  }

  handleScroll = () => {
    const { offsetHeight: bodyOffsetHeight } = document.body;
    const { offsetTop, offsetHeight } = document.getElementsByClassName(
      "choice"
    )[0];
    if (offsetTop + offsetHeight - bodyOffsetHeight > window.scrollY - 78) {
      this.setState({
        fixedClass: "fixed",
      });
    } else {
      this.setState({
        fixedClass: "",
      });
    }
  };

  goBack = () => {
    this.props.resetVoteMode();
    this.props.fetchMyStatusData();
  };

  showToast = () => {
    if (this.toastTimeOut) {
      clearTimeout(this.toastTimeOut);
    }
    this.setState(
      {
        showToast: true,
      },
      () => {
        this.toastTimeOut = setTimeout(() => {
          this.setState({
            showToast: false,
          });
        }, 2500);
      }
    );
  };

  showGTMaxAlert = (maxAvailable, text) => {
    this.setState({
      alert: ALERT_MSG.GT_MAX,
      maxAvailable,
    });
  };

  resetAlert = () => {
    this.setState({
      alert: "",
      maxAvailable: 0,
    });
  };

  handleSubmit = () => {
    const {
      txFeeLoading,
      txLoading,
      loading,
      isLedger,
      isNoBalance,
      isNoChange,
    } = this.props;
    if (!txLoading && !txFeeLoading && !loading) {
      if (isNoBalance) {
        this.setState({
          alert: ALERT_MSG.NO_BALANCE,
        });
        return;
      }
      if (isNoChange) {
        this.setState({
          alert: ALERT_MSG.NO_CHANGE,
        });
        return;
      }
      if (isLedger) {
        this.setState({
          alert: ALERT_MSG.SHOW_LEDGER,
        });
      } else {
        this.setState({
          alert: ALERT_MSG.CONFIRM,
        });
      }
    }
  };

  render() {
    const {
      I18n,
      loading,
      walletName,
      selectedAccount,
      myVotes,
      myVotesCnt,
      txFeeLimit,
      txFeePrice,
      txFee,
      txFeeRate,
    } = this.props;
    const { fixedClass, showToast, maxAvailable, alert } = this.state;

    const headerTitle = (
      <HeaderTitle title={"Voting"} sub={"Vote"} goBack={this.goBack} />
    );

    if (loading) {
      return (
        <div className={`content-wrap vote ${fixedClass}`}>
          {headerTitle}
          <LoadingComponent type="black" />
        </div>
      );
    }

    return (
      <div className={`content-wrap vote ${fixedClass}`}>
        {headerTitle}
        <div className="wrap-holder my-wallet width-m">
          <div className="name-holder">
            <div className="group">
              <span className="label">
                My Votes<em>{`(${myVotesCnt}/100)`}</em>
              </span>
              <span className="money-group">{`${walletName} - ${selectedAccount}`}</span>
            </div>
          </div>
        </div>
        <PRepsVotingStatusGraphContainer />
        <div className="wrap-holder myvote choice">
          {/* <span className="reset"><i className="_img"></i> My Votes Reset</span> */}
          <MyPRepsTableContainer showAlert={this.showGTMaxAlert} />
        </div>

        <div className="vote-hoder">
          <div className="wrap-holder vote-fixed ">
            <ul className="">
              <li>
                <p className="label">{I18n.estimatedStepAndPrice}</p>
                <p>
                  {txFeeLimit}
                  <em>/</em>
                  {txFeePrice}
                  <span>ICX</span>
                </p>
              </li>
              <li>
                <p className="label">{I18n.transferPageLabel5_2}</p>
                <p>
                  {txFee}
                  <span>ICX</span>
                </p>
                <p>
                  {txFeeRate}
                  <span>USD</span>
                </p>
              </li>
              <li>
                <button
                  type="submit"
                  className="btn-type-vote"
                  onClick={this.handleSubmit}
                >
                  <span>{I18n.button.vote}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <PRepsLeaderboardContainer />
        <Toast I18n={I18n} myVotesCnt={myVotesCnt} showToast={showToast} />
        <VoteAlerts
          ALERT_MSG={ALERT_MSG}
          alert={alert}
          handleCancel={this.resetAlert}
          input={myVotes}
          maxAvailable={maxAvailable}
          {...this.props}
        />
      </div>
    );
  }
}

const Toast = ({ myVotesCnt, showToast, I18n }) => (
  <dir
    className={`
    wrap-holder
    tost
    ${showToast ? "show" : ""}
  `}
  >
    <p>
      <span>
        {myVotesCnt}
        <em>
          <i>/</i>100
        </em>
      </span>{" "}
      <span>{I18n.votePage.toast}</span>
    </p>
  </dir>
);

export default Vote;
