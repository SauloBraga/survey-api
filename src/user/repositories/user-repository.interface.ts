import { User } from '../entities/user.entity';

export interface IUserRepository {
  save(user: Partial<User>): Promise<void>;
  update(userId: string, user: Partial<User>): Promise<void>;
  find(filter: {
    take: number;
    skip: number;
  }): Promise<{ users: User[]; total: number }>;
  findById(userId: string): Promise<User | undefined>;
  findByDocument(document: string): Promise<User | undefined>;
  remove(userId: string): Promise<void>;
}
