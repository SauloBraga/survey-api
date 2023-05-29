import { Inject } from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { IUserRepository } from '../repositories/user-repository.interface';
import { UserRepository } from '../repositories/typeorm/typeorm-user.repository';

export class UpdateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(userId: string, updateUserDto: UpdateUserDTO): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error(`User: ${userId}, not found`);

    await this.userRepository.update(userId, updateUserDto);
  }
}
