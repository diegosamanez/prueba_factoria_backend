import IRepository from "./Interfaces/IRepository";

export default class Repository<T> implements IRepository<T> {
  private model: T;
  constructor (model: T) {
    this.model = model;
  }

  public async all(): Promise<T[]> {
    const data = await this.model.constructor.all();
    return data || [];
  }
  public async find(id: number): Promise<T> {
    const data = await this.model.constructor.find(id);
    return data || null;
  }
  public async create(item: Partial<T>): Promise<boolean> {
    const data = await this.model.constructor.create(item);
    return data.$isPersisted || false;
  }
  public async update(id: number, item: Partial<T>): Promise<boolean> {
    const result = await this.model.constructor.query().where('id', id).update(item);
    return result > 0;
  }
  public async delete(id: number): Promise<boolean> {
    const result = await this.model.constructor.query().where('id', id).delete();
    return result > 0;
  }

}
