import IRepository from "./Interfaces/IRepository";

export default class Repository<T> implements IRepository<T> {
  private model: T;
  constructor (model: T) {
    this.model = model;
  }

  public async all(): Promise<T[]> {
    // @ts-ignore
    const data = await this.model.constructor.all();
    return data || [];
  }
  public async find(id: number): Promise<T> {
    // @ts-ignore
    const data = await this.model.constructor.find(id);
    return data || null;
  }
  public async create(item: Partial<T>): Promise<T | null> {
    // @ts-ignore
    const data = await this.model.constructor.create(item);
    return data || null;
  }
  public async update(id: number, item: Partial<T>): Promise<T | null> {
    // @ts-ignore
    const model = await this.model.constructor.find(id);
    if (!model) {
      return null;
    }
    // @ts-ignore
    const result = await model.merge(item).save();
    return result || null;
  }
  public async delete(id: number): Promise<boolean> {
    // @ts-ignore
    const result = await this.model.constructor.query().where('id', id).delete();
    return result > 0;
  }

}
