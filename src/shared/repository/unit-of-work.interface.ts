export interface IUnitOfWork {
  executeTransaction(work: () => Promise<void>): Promise<void>;
  getRepositories<T>(R: new (dataSource: any) => T): T;
}
