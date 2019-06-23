import hash from 'hash.js'
import { signRawTx } from 'utils'

const AutoSign = (() => {
    let pkHash = Symbol();

    class AutoSign {
        constructor() {
            this.whitelist = {}
            this[pkHash] = {}
            this.timers = {}
        }

        createTimer = (payload) => {
            const { privKey, time } = payload
            const hashedKey = this._hashKey(payload)

            this.whitelist[hashedKey] = true
            this[pkHash][hashedKey] = privKey
            this.timers[hashedKey] = {
                time,
                timerId: setTimeout(() => { 
                    this._clearTimer(hashedKey);
                }, time * 60000)
            }
        }

        isWhitelisted = (input) => {
            // console.log(this.whitelist)
            // console.log(this[pkHash])
            // console.log(this._hashKey(input))
            return !!this.whitelist[this._hashKey(input)]
        }

        sign = (payload) => {
            const result = { ...payload }
            result.payload.params = signRawTx(this[pkHash][this._hashKey(result)], result.payload.params)
            return result.payload
        }

        _hashKey = (input) => {
            // console.log(input)
            const { payload, host } = input
            const { from, to, data } = payload.params
            const key = `${from}_${to}_${data.method}_${host}`
            const hashedKey = hash.sha256().update(key).digest('hex')
            return hashedKey
        }

        _clearTimer = (hashedKey) => {
            delete this.whitelist[hashedKey]
            delete this[pkHash][hashedKey]
            clearTimeout(this.timers[hashedKey].timerId)
            delete this.timers[hashedKey]
            // console.log('cleared')
            // console.log(this.whitelist)
        }
    }

    return AutoSign;
})();

export default new AutoSign()