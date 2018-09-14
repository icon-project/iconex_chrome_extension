console.log("Hello ICONex!")

const contentPort = window.chrome.runtime.connect({
  name: 'iconex-background-content'
});

window.addEventListener('message', event => {
  switch (event.data.type) {
    case 'REQUEST_HAS_ACCOUNT':
    case 'REQUEST_HAS_ADDRESS':
    case 'REQUEST_ADDRESS':
    case 'REQUEST_TRANSACTION':
    case 'REQUEST_SCORE':
    case 'REQUEST_SIGNING':
      contentPort.postMessage(event.data);
      break;
    default:
  }
}, false);

window.chrome.runtime.onMessage.addListener(event => {
  window.postMessage(event, '*')
});
