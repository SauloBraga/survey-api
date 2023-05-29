import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  ListUserUseCase,
} from './usecases';
import { UserRepository } from './repositories/typeorm/typeorm-user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ListUserUseCase,
    UserRepository,
  ],
  exports: [UserRepository],
})
export class UserModule {}
