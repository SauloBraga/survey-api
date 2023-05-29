import { Inject } from '@nestjs/common';
import { SurveyRepository } from '../../repositories/typeorm/typeorm-survey.repository';
import { QuestionRepository } from '../../repositories/typeorm/typeorm-question.repository';
import { IUnitOfWork } from 'src/shared/repository/unit-of-work.interface';
import { TypeOrmUnitOfWork } from 'src/shared/repository/typeorm/unit-of-work';
import { Survey } from 'src/survey/entities/survey.entity';

interface UpdateSurveyDTO {
  userId: string;
  surveyId: string;
  name?: string;
  description?: string;
  questions?: {
    id?: string;
    description: string;
    survey?: Survey;
  }[];
}

export class UpdateSurveyUseCase {
  constructor(@Inject(TypeOrmUnitOfWork) private readonly uow: IUnitOfWork) {}

  async execute({
    surveyId,
    userId,
    questions,
    ...updatedSurvey
  }: UpdateSurveyDTO) {
    this.uow.executeTransaction(async () => {
      const surveyRepo = this.uow.getRepositories(SurveyRepository);

      const survey = await surveyRepo.findById(surveyId);

      if (!survey) throw new Error('Survey not found');

      if (survey.createdBy.id !== userId)
        throw new Error('User not allowed, to update survey');

      await surveyRepo.update(surveyId, updatedSurvey);

      const questionRepo = this.uow.getRepositories(QuestionRepository);

      if (questions) {
        await Promise.all(
          questions.map(async (question) => {
            question.survey = survey;
            questionRepo.update(question);
          }),
        );
      }
    });
  }
}
