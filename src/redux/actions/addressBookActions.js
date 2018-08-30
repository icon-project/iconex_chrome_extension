import actionTypes from 'redux/actionTypes/actionTypes';

export function addAddressInAddressBook(payload) {
  return {
    type: actionTypes.addAddressInAddressBook,
    payload
  };
}

export function deleteAddressInAddressBook(payload) {
  return {
    type: actionTypes.deleteAddressInAddressBook,
    payload
  };
}
