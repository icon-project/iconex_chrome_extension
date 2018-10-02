import actionTypes from 'redux/actionTypes/actionTypes';

export function initExternalState() {
    return {
        type: actionTypes.initExternalState,
    };
}

export function setAddressRequest(payload) {
    return {
        type: actionTypes.setAddressRequest,
        payload
    }
}

export function setTransaction(payload) {
    return {
        type: actionTypes.setTransaction,
        payload
    }
}

export function setTransactionWallet(payload) {
    return {
        type: actionTypes.setTransactionWallet,
        payload
    }
}

export function setTransactionStep(payload) {
    return {
        type: actionTypes.setTransactionStep,
        payload
    }
}

export function callSendTransaction(payload) {
    return {
        type: actionTypes.callSendTransaction,
        payload
    }
}

export function setScore(payload) {
    return {
        type: actionTypes.setScore,
        payload
    }
}

export function callScore(payload) {
    return {
        type: actionTypes.callScore,
        payload,
    }
}

export function setSigning(payload) {
    return {
        type: actionTypes.setSigning,
        payload
    };
}

export function callSigning(payload) {
    return {
        type: actionTypes.callSigning,
        payload
    };
}