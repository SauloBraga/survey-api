import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../user-repository.interface';
import { InjectDataSource } from '@nestjs/typeorm';
import { FilterDTO } from 'src/shared/dtos/filter.dto';

export class UserRepository implements IUserRepository {
  private repo: Repository<User>;
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    this.repo = this.datasource.getRepository(User);
  }

  async findByDocument(document: string): Promise<User> {
    return this.repo.findOne({ where: { document } });
  }
  async update(userId: string, user: Partial<User>): Promise<void> {
    await this.repo.update({ id: userId }, user);
  }
  async remove(userId: string): Promise<void> {
    await this.repo.delete({ id: userId });
  }
  findById(userId: string): Promise<User> {
    return this.repo.findOne({ where: { id: userId } });
  }
  async find(filter: FilterDTO): Promise<{ users: User[]; total: number }> {
    const [users, total] = await this.repo.findAndCount({
      take: filter.take,
      skip: filter.skip,
    });

    return { users, total };
  }
  async save(user: Partial<User>): Promise<void> {
    await this.repo.save(user);
  }
}
