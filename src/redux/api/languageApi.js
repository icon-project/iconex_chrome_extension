import { asyncLocalStorage } from 'utils';

/**
 * set language
 * @param {String} lan: language type
 * @return {String} payload: updated language type
*/
export function setLanguageApi(lan) {
  return asyncLocalStorage.setItem('redux', lan)
    .then(() => {
      const payload = asyncLocalStorage.getItem('redux');
      return payload;
    })
    .catch(error => ({ error })
  );
}
