import Taro from '@tarojs/api'
import { fromByteArray } from 'base64-js'

import { ClassInstanceManager } from './ClassInstanceManager'

export class NativeRequest implements Taro.RequestTask<any> {
  readonly className: string = 'NativeRequest'
  readonly [Symbol.toStringTag]: string = ''
  private objectId: number
  private headersReceivedSet = new Set<any>()
  constructor (option: any) {
    if (option?.data instanceof ArrayBuffer) {
      option.bufBase64 = fromByteArray(new Uint8Array(option.data))
      option.data = undefined
    }
    const options = {
      ...option,
      success: (res: any) => {
        option?.success(res)
        this.destroy()
      },
      fail: (res: any) => {
        option?.fail(res)
        this.destroy()
      }
    }
    this.objectId = ClassInstanceManager.getInstance().createInstance(this.className, options)
  }

  static createRequestTask (option: any) {
    return new NativeRequest(option)
  }

  abort (): void {
    ClassInstanceManager.getInstance().setInstanceFunction({}, this.className, 'abort', this.objectId)
    this.destroy()
  }

  headersReceivedListener (args) {
    for (const listener of this.headersReceivedSet.keys()) {
      listener(args)
    }
  }

  onHeadersReceived (option: any): void {
    if (this.headersReceivedSet.size === 0) {
      ClassInstanceManager.getInstance().setInstanceFunctionAsync(
        this.headersReceivedListener.bind(this),
        this.className,
        'onHeadersReceived',
        this.objectId,
        'HeadersReceived',
      )
    }
    this.headersReceivedSet.add(option)
  }

  offHeadersReceived (option: any): void {
    this.headersReceivedSet.delete(option)
    if (this.headersReceivedSet.size === 0) {
      ClassInstanceManager.getInstance().setInstanceFunction(
        {},
        this.className,
        'offHeadersReceived',
        this.objectId,
        'HeadersReceived',
      )
    }
  }

  catch<TResult = never> (
    onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | undefined | null
  ): Promise<any> {
    return Promise.resolve(onrejected)
  }

  offChunkReceived (option: any): void {
    return option
  }

  onChunkReceived (option: any): void {
    return option
  }

  destroy (): void {
    ClassInstanceManager.getInstance().destroyInstance(this.className, this.objectId)
  }

  then<TResult = never> (
    onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | undefined | null
  ): Promise<any> {
    return Promise.resolve(onrejected)
  }

  finally (onfinally?: (() => void) | null | undefined): any {
    throw new Error(onfinally as undefined)
  }
}
