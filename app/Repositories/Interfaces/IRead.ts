export default interface IRead<T> {
  all(): Promise<T[]>
  find(id: number): Promise<T>
}
