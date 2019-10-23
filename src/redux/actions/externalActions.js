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

export function setScore(payload) {
    return {
        type: actionTypes.setScore,
        payload
    }
}

export function setScoreWallet(payload) {
    return {
        type: actionTypes.setScoreWallet,
        payload
    }
}

export function setScoreStep(payload) {
    return {
        type: actionTypes.setScoreStep,
        payload
    }
}

export function setScoreTime(payload) {
    return {
        type: actionTypes.setScoreTime,
        payload
    }
}

export function callScore(payload) {
    return {
        type: actionTypes.callScore,
        payload
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