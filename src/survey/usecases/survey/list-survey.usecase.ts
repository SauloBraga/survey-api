import { Inject } from '@nestjs/common';
import { ISurveyRepository } from '../../repositories/survey-repository.interface';
import { SurveyRepository } from '../../repositories/typeorm/typeorm-survey.repository';
import { FilterDTO } from 'src/shared/dtos/filter.dto';

export class ListSurveyUseCase {
  constructor(
    @Inject(SurveyRepository)
    private readonly surveyRepository: ISurveyRepository,
  ) {}

  async execute(filter: FilterDTO) {
    const take = filter.take || 10;
    const skip = filter.skip || 0;

    return this.surveyRepository.find({ take, skip });
  }
}
