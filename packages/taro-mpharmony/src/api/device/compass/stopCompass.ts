import Taro from '@tarojs/api'
import { shouldBeObject } from 'src/utils'
import { MethodHandler } from 'src/utils/handler'

/**
 * 停止监听罗盘数据
 */
export const stopCompass: typeof Taro.stopCompass = (options) => {
  const name = 'stopCompass'
  return new Promise((resolve, reject) => {
    // options must be an Object
    const isObject = shouldBeObject(options)
    if (!isObject.flag) {
      const res = { errMsg: `${name}:fail ${isObject.msg}` }
      console.error(res.errMsg)
      return reject(res)
    }
    const { success, fail, complete } = options as Exclude<typeof options, undefined>

    const handle = new MethodHandler({ name, success, fail, complete })
    // @ts-ignore
    native.stopCompass({
      success: () => {
        const result: TaroGeneral.CallbackResult = {
          errMsg: `${name}:ok`,
        }
        handle.success(result, { resolve, reject })
      },
      fail: () => {
        const result: TaroGeneral.CallbackResult = {
          errMsg: `${name}:fail`,
        }
        handle.fail(result, { resolve, reject })
      },
    })
  })
}