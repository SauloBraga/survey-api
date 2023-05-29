import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateSurveyRequestDTO } from '../dtos/create-survey-request.dto';
import { CreateSurveyUseCase } from '../usecases/survey/create-survey.usecase';
import { ListSurveyUseCase } from '../usecases/survey/list-survey.usecase';
import { DeleteSurveyUseCase } from '../usecases/survey/delete-survey.usecase';
import { UpdateSurveyUseCase } from '../usecases/survey/update-survey.usecase';
import { FilterDTO } from 'src/shared/dtos/filter.dto';
import { CreateAnswerUseCase } from '../usecases/answers/create-answer.usecase';
import { ListAnswerUseCase } from '../usecases/answers/list-answer.usecase';
import { UpdateAnswerUseCase } from '../usecases/answers/update-answer.usecase';
import { DeleteAnswerUseCase } from '../usecases/answers/delete-answer.usecase';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateSurveyRequestDTO } from '../dtos/update-survey-request.dto';
import { AnswerSurveyRequestDTO } from '../dtos/answer-survey-request.dto';

@ApiTags('surveys')
@Controller('/surveys')
export class SurveyController {
  constructor(
    private readonly createSurvey: CreateSurveyUseCase,
    private readonly listSurvey: ListSurveyUseCase,
    private readonly updateSurvey: UpdateSurveyUseCase,
    private readonly deleteSurvey: DeleteSurveyUseCase,
    private readonly listAnswerUseCase: ListAnswerUseCase,
    private readonly createAnswerUseCase: CreateAnswerUseCase,
    private readonly updateAnswerUseCase: UpdateAnswerUseCase,
    private readonly deleteAnswerUseCase: DeleteAnswerUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listagem de todos os questionarios criados com paginação',
  })
  @ApiResponse({
    status: 200,
    description: 'listagem questionario conforme parametros de paginação',
  })
  @ApiResponse({
    status: 403,
    description: 'Não autorizado',
  })
  async list(@Query() filter: FilterDTO) {
    return this.listSurvey.execute(filter);
  }
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() request,
    @Body() { name, description, questions }: CreateSurveyRequestDTO,
  ): Promise<void> {
    await this.createSurvey.execute({
      userId: request.user.sub,
      name,
      description,
      questions,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(
    @Request() request,
    @Param('id') surveyId: string,
    @Body()
    { name, description, questions }: UpdateSurveyRequestDTO,
  ) {
    await this.updateSurvey.execute({
      userId: request.user.sub,
      surveyId,
      name,
      description,
      questions,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Request() request, @Param('id') surveyId: string) {
    await this.deleteSurvey.execute({ userId: request.user.sub, surveyId });
  }

  @UseGuards(AuthGuard)
  @Get('/:id/answers')
  async listAnswers(
    @Request() request,
    @Param('id') surveyId: string,
    @Query() filter: FilterDTO,
  ) {
    return this.listAnswerUseCase.execute({
      userId: request.user.sub,
      surveyId,
      filter,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/:id/answers')
  async answerSurvey(
    @Request() request,
    @Param('id') surveyId: string,
    @Body()
    { answers }: AnswerSurveyRequestDTO,
  ) {
    await this.createAnswerUseCase.execute({
      userId: request.user.sub,
      surveyId,
      answers,
    });
  }
  @UseGuards(AuthGuard)
  @Put('/:surveyId/answers/:answerId')
  async updateAnswer(
    @Request() request,
    @Param() { surveyId, answerId },
    @Body() { description },
  ) {
    await this.updateAnswerUseCase.execute({
      userId: request.user.sub,
      surveyId,
      answerId,
      description,
    });
  }
  @UseGuards(AuthGuard)
  @Delete('/:surveyId/answers/:answerId')
  async deleteAnswer(@Request() request, @Param() { surveyId, answerId }) {
    await this.deleteAnswerUseCase.execute({
      userId: request.user.sub,
      surveyId,
      answerId,
    });
  }
}
