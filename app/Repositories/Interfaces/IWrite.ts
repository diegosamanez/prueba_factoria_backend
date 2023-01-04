export default interface IWrite<T> {
  create(item: T): Promise<T | null>
  update(id: number, item: T): Promise<boolean>
  delete(id: number): Promise<boolean>
}
