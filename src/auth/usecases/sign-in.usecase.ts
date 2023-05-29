import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repositories/typeorm/typeorm-user.repository';
import { IUserRepository } from 'src/user/repositories/user-repository.interface';

export class SignInUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}
  async execute(document: string, pass: string) {
    const user = await this.userRepository.findByDocument(document);

    if (user?.password !== pass) {
      throw new Error('User not authorized');
    }

    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'secret',
      }),
    };
  }
}
