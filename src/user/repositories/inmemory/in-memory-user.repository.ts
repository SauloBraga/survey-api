import { randomUUID } from 'crypto';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../user-repository.interface';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[];
  constructor() {
    this.users = [];
  }
  find(filter: {
    take: number;
    skip: number;
  }): Promise<{ users: User[]; total: number }> {
    throw new Error('Method not implemented.');
  }
  async findByDocument(document: string): Promise<User> {
    return this.users.find((u) => u.document === document);
  }
  async update(userId: string, user: Partial<User>): Promise<void> {
    const existingUser = await this.findById(userId);

    Object.assign(existingUser, user);
  }
  async remove(userId: string): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.id === userId);

    if (userIndex > -1) this.users.splice(userIndex, 1);
  }
  async findById(userId: string): Promise<User> {
    return this.users.find((u) => u.id === userId);
  }

  async save(user: Partial<User>): Promise<void> {
    const newUser = new User();

    newUser.id = randomUUID();
    Object.assign(newUser, user);

    this.users.push(newUser);
  }
}
