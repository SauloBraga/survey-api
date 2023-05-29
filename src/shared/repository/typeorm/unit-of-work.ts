import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IUnitOfWork } from '../unit-of-work.interface';

export class TypeOrmUnitOfWork implements IUnitOfWork {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async executeTransaction(work: () => Promise<void>) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      await work();
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  getRepositories<T>(R: new (dataSource: DataSource) => T): T {
    return new R(this.dataSource);
  }
}
