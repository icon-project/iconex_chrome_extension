import actionTypes from 'redux/actionTypes/actionTypes'

const ethAddressBookLocalStorage = window.localStorage.getItem('ethAddressBook')
const icxAddressBookLocalStorage = window.localStorage.getItem('icxAddressBook')

const initialState = {
  ethAddressBook: ethAddressBookLocalStorage ? JSON.parse(ethAddressBookLocalStorage) : [],
  icxAddressBook: icxAddressBookLocalStorage ? JSON.parse(icxAddressBookLocalStorage) : []
}

export function addressBookReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.addAddressInAddressBook: {
      const { name, address, walletCoinType } = action.payload;
      const addressBookKey = `${walletCoinType}AddressBook`;
      const addressBook = [ ...state[addressBookKey] ];
      addressBook.unshift({
        name,
        address
      })
      window.localStorage.setItem(addressBookKey, JSON.stringify(addressBook))
      return Object.assign({}, state, {
          [addressBookKey]: addressBook
      })
    }
    case actionTypes.deleteAddressInAddressBook: {
      const { index, walletCoinType } = action.payload;
      const addressBookKey = `${walletCoinType}AddressBook`;
      const addressBook = [ ...state[addressBookKey] ];
      addressBook.splice(index, 1);
      window.localStorage.setItem(addressBookKey, JSON.stringify(addressBook))
      return Object.assign({}, state, {
          [addressBookKey]: addressBook
      })
    }
    default:
      return state
  }
}
