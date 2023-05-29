import { Inject } from '@nestjs/common';
import { TypeOrmUnitOfWork } from 'src/shared/repository/typeorm/unit-of-work';
import { IUnitOfWork } from 'src/shared/repository/unit-of-work.interface';
import { Question } from 'src/survey/entities/question.entity';
import { Respondent } from 'src/survey/entities/respondent.entity';
import { AnswerRepository } from 'src/survey/repositories/typeorm/typeorm-answer.repository';
import { SurveyRepository } from 'src/survey/repositories/typeorm/typeorm-survey.repository';
import { UserRepository } from 'src/user/repositories/typeorm/typeorm-user.repository';

interface CreateAnswerDTO {
  surveyId: string;
  userId: string;
  answers: {
    questionId: string;
    description: string;
  }[];
}

export class CreateAnswerUseCase {
  constructor(@Inject(TypeOrmUnitOfWork) private readonly uow: IUnitOfWork) {}

  async execute({ userId, surveyId, answers }: CreateAnswerDTO) {
    await this.uow.executeTransaction(async () => {
      const userRepo = this.uow.getRepositories(UserRepository);

      const user = await userRepo.findById(userId);

      if (!user) throw new Error('Invalid User');

      const surveyRepo = this.uow.getRepositories(SurveyRepository);

      const survey = await surveyRepo.findById(surveyId);

      if (!survey) throw new Error('Survey not found');

      survey.respondent.push({ survey, user } as Respondent);

      await surveyRepo.update(surveyId, survey);

      const answerRepo = this.uow.getRepositories(AnswerRepository);

      await Promise.all(
        answers.map(async (answer) => {
          const question = { id: answer.questionId } as Question;
          answerRepo.save({
            description: answer.description,
            question,
          });
        }),
      );
    });
  }
}
