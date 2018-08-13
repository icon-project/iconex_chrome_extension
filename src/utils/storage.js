/* eslint-disable no-undef */
const chromeStorageLocal = {
    set: function (object, callback) {
        return chrome.storage.local.set(object, callback);
    },
    get: function (key, callback) {
        return chrome.storage.local.get(key, callback);
    },
    remove: function (address, callback) {
        return chrome.storage.local.remove(address, callback);
    },
};

const chromeStorage = {
  set: function (object, callback) {
      return chrome.storage.sync.set(object, callback);
  },
  get: function (key, callback) {
      return chrome.storage.sync.get(key, callback);
  },
  remove: function (address, callback) {
      return chrome.storage.sync.remove(address, callback);
  }
}


export {
  chromeStorageLocal,
  chromeStorage
}
