export default interface IWrite<T> {
  create(item: T): Promise<T | null>
  update(id: number, item: T): Promise<T | null>
  delete(id: number): Promise<boolean>
}
