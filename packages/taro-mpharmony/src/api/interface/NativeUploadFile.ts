import Taro from '@tarojs/api'

import native from '../NativeApi'

export class NativeUploadFile implements Taro.UploadTask {
  private taskID: string

  constructor ( taskID: string) {
    this.taskID = taskID
  }

  static getUploadTask (taskID: string) {
    return new NativeUploadFile(taskID)
  }

  abort (): void {
    native.abort({ taskId: this.taskID })
  }

  offHeadersReceived (option: any): void {
    native.offHeadersReceived({ listener: option, taskId: this.taskID })
  }

  offProgressUpdate (option: any): void {
    native.offProgressUpdate(option, this.taskID)
  }

  onHeadersReceived (option: any): void {
    native.onHeadersReceived({ listener: option, taskId: this.taskID })
  }

  onProgressUpdate (option: any): void {
    native.onProgressUpdate(option, this.taskID)
  }
}
