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

export function addPRep(payload) {
  return {
    type: actionTypes.addPRep,
    payload,
  };
}

export function deletePRep(payload) {
  return {
    type: actionTypes.deletePRep,
    payload,
  };
}
