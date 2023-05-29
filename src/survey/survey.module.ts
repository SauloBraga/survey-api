import { Module } from '@nestjs/common';
import { SurveyController } from './controllers/survey.controller';
import { SurveyRepository } from './repositories/typeorm/typeorm-survey.repository';
import { QuestionRepository } from './repositories/typeorm/typeorm-question.repository';
import { CreateSurveyUseCase } from './usecases/survey/create-survey.usecase';
import { ListSurveyUseCase } from './usecases/survey/list-survey.usecase';
import { DeleteSurveyUseCase } from './usecases/survey/delete-survey.usecase';
import { UpdateSurveyUseCase } from './usecases/survey/update-survey.usecase';
import { UserModule } from 'src/user/user.module';
import { CreateAnswerUseCase } from './usecases/answers/create-answer.usecase';
import { AnswerRepository } from './repositories/typeorm/typeorm-answer.repository';
import { TypeOrmUnitOfWork } from 'src/shared/repository/typeorm/unit-of-work';
import { ListAnswerUseCase } from './usecases/answers/list-answer.usecase';
import { UpdateAnswerUseCase } from './usecases/answers/update-answer.usecase';
import { DeleteAnswerUseCase } from './usecases/answers/delete-answer.usecase';

@Module({
  imports: [UserModule],
  controllers: [SurveyController],
  providers: [
    CreateSurveyUseCase,
    ListSurveyUseCase,
    UpdateSurveyUseCase,
    DeleteSurveyUseCase,
    CreateAnswerUseCase,
    ListAnswerUseCase,
    UpdateAnswerUseCase,
    DeleteAnswerUseCase,
    SurveyRepository,
    QuestionRepository,
    AnswerRepository,
    TypeOrmUnitOfWork,
  ],
})
export class SurveyModule {}
