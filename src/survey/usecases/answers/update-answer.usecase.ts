import { Inject } from '@nestjs/common';
import { IAnswerRepository } from 'src/survey/repositories/answer-repository.interface';
import { AnswerRepository } from 'src/survey/repositories/typeorm/typeorm-answer.repository';

interface UpdateAnswerDTO {
  userId: string;
  answerId: string;
  surveyId: string;
  description: string;
}

export class UpdateAnswerUseCase {
  constructor(
    @Inject(AnswerRepository)
    private readonly answerRepository: IAnswerRepository,
  ) {}

  async execute({ userId, surveyId, answerId, description }: UpdateAnswerDTO) {
    const answer = await this.answerRepository.findAnswerByIdAndSurveyAndUser(
      answerId,
      surveyId,
      userId,
    );
    await this.answerRepository.save({ ...answer, description });
  }
}
