// //https://stackoverflow.com/questions/34836500/how-to-set-up-google-analytics-for-react-router
// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { GA_TRACKING_ID } from 'constants/config';
//
// class GoogleAnalytics extends React.Component {
//     componentWillUpdate ({ location, history }) {
//         const gtag = window.gtag;
//         if (location.pathname === this.props.location.pathname) {
//             // don't log identical link clicks (nav links likely)
//             return;
//         }
//         if (history.action === 'PUSH' &&
//             typeof(gtag) === 'function') {
//             gtag('config', GA_TRACKING_ID, {
//                 'page_title': document.title,
//                 'page_location': window.location.href,
//                 'page_path': location.pathname
//             });
//         }
//     }
//
//     render () {
//         return null;
//     }
// }
//
// export default withRouter(GoogleAnalytics);
