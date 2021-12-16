import actionTypes from 'redux/actionTypes/actionTypes';

export function openVoteMode() {
  return {
    type: actionTypes.openVoteMode
  };
}

export function resetVoteMode() {
  return {
    type: actionTypes.resetVoteMode
  };
}

export function openBondMode() {
  return {
    type: actionTypes.openBondMode
  };
}

export function resetBondMode() {
  return {
    type: actionTypes.resetBondMode
  };
}

export function getPRepData(options) {
  return {
    type: actionTypes.getPRepData,
    options
  };
}

export function updateMyVotes(payload) {
  return {
    type: actionTypes.updateMyVotes,
    payload,
  };
}

export function updateMyBonds(payload) {
  return {
    type: actionTypes.updateMyBonds,
    payload,
  };
}

export function addPRep(payload) {
  return {
    type: actionTypes.addPRep,
    payload,
  };
}

export function addPRepBond(payload) {
  return {
    type: actionTypes.addPRepBond,
    payload,
  };
}

export function deletePRep(payload) {
  return {
    type: actionTypes.deletePRep,
    payload,
  };
}

export function deletePRepBond(payload) {
  return {
    type: actionTypes.deletePRepBond,
    payload,
  };
}
