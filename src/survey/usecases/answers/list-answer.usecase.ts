import { Inject } from '@nestjs/common';
import { FilterDTO } from 'src/shared/dtos/filter.dto';
import { IAnswerRepository } from 'src/survey/repositories/answer-repository.interface';
import { AnswerRepository } from 'src/survey/repositories/typeorm/typeorm-answer.repository';

interface ListAnswerDTO {
  userId: string;
  surveyId: string;
  filter: FilterDTO;
}

export class ListAnswerUseCase {
  constructor(
    @Inject(AnswerRepository)
    private readonly answerRepository: IAnswerRepository,
  ) {}
  async execute({ userId, surveyId, filter }: ListAnswerDTO) {
    const take = filter.take || 10;
    const skip = filter.skip || 0;
    const result = await this.answerRepository.listAnswersBySurveyAndUser(
      userId,
      surveyId,
      {
        take,
        skip,
      },
    );

    return result;
  }
}
