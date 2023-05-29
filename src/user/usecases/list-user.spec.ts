import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { InMemoryUserRepository } from '../repositories/inmemory/in-memory-user.repository';
import { ListUserUseCase } from './list-user.usecase';

describe('UseCase: List User', () => {
  let useCase: ListUserUseCase;

  beforeEach(async () => {
    const userRepo = new InMemoryUserRepository();

    useCase = new ListUserUseCase(userRepo);

    const createUserUseCase = new CreateUserUseCase(userRepo);

    await createUserUseCase.execute(
      CreateUserDTO.create('John Doe', '123456', '12345678910'),
    );
  });

  it('Should list an array os users', async () => {
    const users = await useCase.execute();

    expect(users).toHaveLength(1);
  });
});
