/* eslint-disable no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'

export type BatchFunc<T> = (items: T[]) => void
export class BulkExecService<T> {
  private size: number // bulk size
  private timeout: number // time ms
  private batchFunc: BatchFunc<T>

  private batch: Array<T> = []
  private throttledFunc: _.DebouncedFunc<() => Promise<void>>

  constructor(size: number, timeout: number, batchFunc: BatchFunc<T>) {
    this.size = size
    this.timeout = timeout
    this.batchFunc = batchFunc

    this.throttledFunc = _.throttle(this.processBatch, this.timeout, {
      leading: false,
      trailing: true
    })
  }

  private processBatch = async () => {
    const tmp = _.cloneDeep(this.batch)
    this.batch = []
    this.batchFunc(tmp)
  }

  async push(item: T) {
    this.batch.push(item)
    if (this.batch.length >= this.size) {
      this.flush()
    } else {
      this.throttledFunc()
    }
  }

  async flush() {
    return this.throttledFunc.flush()
  }
}
