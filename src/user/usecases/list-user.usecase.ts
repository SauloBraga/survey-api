import { Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../repositories/user-repository.interface';
import { UserRepository } from '../repositories/typeorm/typeorm-user.repository';
import { FilterDTO } from 'src/shared/dtos/filter.dto';

export class ListUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(filter: FilterDTO): Promise<{ users: User[]; total: number }> {
    const take = filter.take || 10;
    const skip = filter.skip || 0;

    return this.userRepository.find({ take, skip });
  }
}
