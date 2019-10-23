
## Simple Summary
A protocol defined for ICONex to message with external web page.

## Abstract
This document descirbes a way for external web page to request and response for about icon account such as getting icx address, authority for transaction and signature.

## Motivation
This protocol allows third-party developer to use ICON network through ICONex

## Specification
You need to implement two part of dispatching event to ICONex and listening event from ICONex using CustomEvent. The type and payload of events is assigned to detail field in CustomEvent.
 
*Data in detail field:*

| Field | Type | Description |
| ----- | ---- | ----------- |
| type | string | Pre-defined type of events |
| payload | any | Data required for the request or response. |

### Dispatch Event for Requset

```javascript
const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', detail: { 
	type: '...',
	payload: {...}
});
window.dispatchEvent(customEvent);
```

### Listen Event for Response

```javascript
const eventHandler = event => {
	const { type, payload } = event.detail;
	switch (type) { ...	}
}
window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
```

### Methods

**HAS_ACCOUNT**

`REQUEST_HAS_ACCOUNT` Requests for whether iconex has any icon wallet.

`RESPONSE_HAS_ACCOUNT` Returns boolean-typed result.

```javascript
const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', detail: { 
	type: 'REQUEST_HAS_ACCOUNT'
});
window.dispatchEvent(customEvent);

const eventHandler = event => {
	const { type, payload } = event.detail;
	if (type === 'RESPONSE_HAS_ACCOUNT') {
		console.log(payload); // true or false
	}
}
window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
```

**HAS_ADDRESS**

`REQUEST_HAS_ADDRESS` Requests for whether iconex has the icon wallet with specific address.

`RESPONSE_HAS_ADDRESS` Returns boolean-typed result.

```javascript
const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', detail: { 
 	type: 'REQUEST_HAS_ADDRESS',
 	payload: 'hx19870922...'
});
window.dispatchEvent(customEvent);

const eventHandler = event => {
	const { type, payload } = detail
	if (type === 'RESPONSE_HAS_ADDRESS') {
		console.log(payload); // true or false
	}
}
window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
```

**ADDRESS**

`REQUEST_ADDRESS` Requests for the address to use for service.

`RESPONSE_HAS_ADDRESS` Returns the icx address selected by user.

```javascript
const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', detail: { 
 	type: 'REQUEST_ADDRESS' 
});
window.dispatchEvent(customEvent);

const eventHandler = event => {
	const { type, payload } = detail;
	if (type === 'RESPONSE_ADDRESS') {
		console.log(payload); // e.g., hx19870922...
	}	
}
window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
```

**JSON-RPC**

`REQUEST_JSON-RPC` Requests for calling standard ICON JSON-RPC API. (User confirmation is required in some cases.)

`RESPONSE_JSON-RPC` Returns the JSON-RPC response.

```javascript
const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', detail: { 
 	type: 'REQUEST_JSON-RPC',
 	payload: {
		jsonrpc: "2.0",
		method: "icx_method",
		id: 6339,
		params: { 
			from: "hx19870922...",
			...
		}
 	}
});
window.dispatchEvent(customEvent);

const eventHandler = event => {
	const { type, payload } = detail;
	if (type === 'RESPONSE_JSON-RPC') {
		console.log(payload); // e.g., {"jsonrpc": "2.0", "id": 6339, "result": { ... }}
	}
}
window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
```

**SIGNING**

`REQUEST_SIGNING` Request for only signing tx hash. (User confirmation is always required.)

`RESPONSE_SIGNING` Returns signature.

```javascript
const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', detail: { 
    type: 'REQUEST_SIGNING',
    payload: {
    	from: 'hx19870922...',
        hash: '0x13979...'
	}
});
window.dispatchEvent(customEvent);

const eventHandler = event => {
    const { type, payload } = detail
    if (type === 'RESPONSE_SIGNING') {
        console.log(payload) // e.g., 'q/dVc3qj4En0GN+...'
    }
}
window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
```
