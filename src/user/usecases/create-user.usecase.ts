import { Inject } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { IUserRepository } from '../repositories/user-repository.interface';
import { UserRepository } from '../repositories/typeorm/typeorm-user.repository';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepo: IUserRepository,
  ) {}
  async execute(createUserDto: CreateUserDTO): Promise<void> {
    const existingUser = await this.userRepo.findByDocument(
      createUserDto.document,
    );

    if (existingUser) throw new Error(`User already exists`);

    await this.userRepo.save(createUserDto);
  }
}
