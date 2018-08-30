console.log("Hello ICONex!")

const contentPort = window.chrome.runtime.connect({
    name: 'iconex-background-content'
});

window.addEventListener('message', event => {
  switch (event.data.type) {
    case 'REQUEST_ADDRESS':
    case 'REQUEST_TRANSACTION':
    case 'REQUEST_SCORE':
      contentPort.postMessage(event.data);
      break;
    default:
  }
}, false);

window.chrome.runtime.onMessage.addListener(event => {
  window.postMessage(event, '*')
});
