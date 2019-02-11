console.log("Hello ICONex!")

let contentPort

startIconexRelay()

window.addEventListener('ICONEX_RELAY_REQUEST', event => {
  const { detail: data } = event
  try {
    sendPostMessage(contentPort, data)
  }
  catch (e) {
    console.log(e)
    startIconexRelay()
    sendPostMessage(contentPort, data)
  }
})

function startIconexRelay() {
  contentPort = window.chrome.runtime.connect({
    name: 'iconex-background-content'
  });
}

function sendPostMessage(port, data) {
  if (!!port && typeof port.postMessage === 'function') {
    const { type } = data
    switch (type) {
      case 'REQUEST_HAS_ACCOUNT':
      case 'REQUEST_HAS_ADDRESS':
      case 'REQUEST_ADDRESS':
      case 'REQUEST_JSON-RPC':
      case 'REQUEST_SIGNING':
        port.postMessage(data)
        break;
      default:
    }
  }
}

window.chrome.runtime.onMessage.addListener(detail => {
  const customEvent = new CustomEvent('ICONEX_RELAY_RESPONSE', { detail })
  window.dispatchEvent(customEvent)
})
