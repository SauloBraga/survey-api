import { Inject } from '@nestjs/common';
import { ISurveyRepository } from '../../repositories/survey-repository.interface';
import { SurveyRepository } from '../../repositories/typeorm/typeorm-survey.repository';

interface DeleteSurveyDTO {
  userId: string;
  surveyId: string;
}

export class DeleteSurveyUseCase {
  constructor(
    @Inject(SurveyRepository)
    private readonly surveyRepository: ISurveyRepository,
  ) {}
  async execute({ userId, surveyId }: DeleteSurveyDTO) {
    const survey = await this.surveyRepository.findById(surveyId);

    if (!survey) throw new Error('Survey not found');

    if (survey.createdBy.id !== userId) throw new Error('User not allowed');

    await this.surveyRepository.remove(surveyId);
  }
}
