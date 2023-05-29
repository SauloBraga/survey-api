import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { InMemoryUserRepository } from '../repositories/inmemory/in-memory-user.repository';

describe('UseCase: Create User', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const userRepo = new InMemoryUserRepository();

    createUserUseCase = new CreateUserUseCase(userRepo);
  });

  it('Should be able to create a new user', async () => {
    const createUserDto = CreateUserDTO.create(
      'John Doe',
      'valid_password',
      '12345678910',
    );

    await createUserUseCase.execute(createUserDto);
  });

  it('Should not be able to create a new user with same document', async () => {
    await createUserUseCase.execute(
      CreateUserDTO.create('John Doe', 'valid_password', '12345678910'),
    );

    await expect(
      createUserUseCase.execute(
        CreateUserDTO.create('John Doe', 'valid_password', '12345678910'),
      ),
    ).rejects.toThrow(`User already exists`);
  });
});
