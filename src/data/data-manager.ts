import Keyv from 'keyv'

export class DataManager<T> {
  keyv: Keyv<T>
  initializer: () => T
  defaultId: string

  constructor(keyv: Keyv<T>, initializer: () => T, defaultId = 'default') {
    this.keyv = keyv
    this.keyv.on('error', (e) => {
      console.log(e)
    })
    this.initializer = initializer
    this.defaultId = defaultId
  }

  get = async (id = this.defaultId) => {
    const dbData = await this.keyv.get(id)
    return { ...this.initializer(), ...(dbData || {}) }
  }

  set = (data: T, id = this.defaultId) => this.keyv.set(id, data)

  setPartial = async (data: Partial<T>, id = this.defaultId) => {
    const currentData = await this.get(id)
    return this.set({ ...currentData, ...data }, id)
  }

  reset = (id: string) => this.keyv.delete(id)
}
