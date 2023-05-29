import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from '../usecases/sign-in.usecase';
import { SignInDTO } from '../../user/dtos/sign-in.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  @Post('/login')
  async signIn(@Body() signDto: SignInDTO) {
    return this.signInUseCase.execute(signDto.document, signDto.password);
  }
}
