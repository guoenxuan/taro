import Taro from '@tarojs/api'

function getAppLaunchInfo () {
  let launchInfo
  try {
    // @ts-ignore
    const callerBundle = bundleMap.get('callerBundle')

    launchInfo = {
      referrerInfo: callerBundle
        ? {
          appId: callerBundle || '',
        }
        : {},
      apiCategory: 'default',
    }
  } catch (err) {
    launchInfo = {
      referrerInfo: {},
      apiCategory: 'default',
    }
  }
  return launchInfo
}

let launchOptions
function initLaunchOptions (options = {}) {
  Object.assign(options, getAppLaunchInfo())
  launchOptions = options
}

Taro.eventCenter.once('__taroRouterLaunch', initLaunchOptions)

// 生命周期
export const getLaunchOptionsSync: typeof Taro.getLaunchOptionsSync = () => launchOptions
export const getEnterOptionsSync: typeof Taro.getEnterOptionsSync = () => launchOptions
