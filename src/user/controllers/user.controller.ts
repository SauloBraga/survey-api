import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ListUserUseCase } from '../usecases/list-user.usecase';
import { CreateUserUseCase } from '../usecases/create-user.usecase';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UpdateUserUseCase } from '../usecases/update-user.usecase';
import { DeleteUserUseCase } from '../usecases/delete-user.usecase';
import { User } from '../entities/user.entity';
import { FilterDTO } from 'src/shared/dtos/filter.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(
    private readonly listUser: ListUserUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get()
  async list(
    @Query() filter: FilterDTO,
  ): Promise<{ users: User[]; total: number }> {
    return this.listUser.execute(filter);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDTO): Promise<void> {
    await this.createUser.execute(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async edit(
    @Request() request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<void> {
    if (!this.canUpdateOrDeleteUser(request.user.sub, id))
      throw new Error('Not Allowed to update user');

    await this.updateUser.execute(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async editPartial(
    @Request() request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<void> {
    if (!this.canUpdateOrDeleteUser(request.user.sub, id))
      throw new Error('Not Allowed to update user');

    await this.updateUser.execute(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Request() request, @Param('id') id: string): Promise<void> {
    if (!this.canUpdateOrDeleteUser(request.user.sub, id))
      throw new Error('Not Allowed to delete user');

    await this.deleteUser.execute(id);
  }

  private canUpdateOrDeleteUser(userId: string, userToUpdated: string) {
    return userId === userToUpdated;
  }
}
