import IRead from "./IRead";
import IWrite from "./IWrite";

export default interface IRepository<T> extends IRead<T>, IWrite<T> {}
