import { Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/user-repository.interface';
import { UserRepository } from '../repositories/typeorm/typeorm-user.repository';

export class DeleteUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepo: IUserRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepo.findById(userId);

    if (!user) throw new Error(`User: ${userId}, not found`);

    await this.userRepo.remove(userId);
  }
}
