import { Inject } from '@nestjs/common';
import { IAnswerRepository } from 'src/survey/repositories/answer-repository.interface';
import { AnswerRepository } from 'src/survey/repositories/typeorm/typeorm-answer.repository';

interface DeleteAnswerUseCaseDTO {
  userId: string;
  surveyId: string;
  answerId: string;
}

export class DeleteAnswerUseCase {
  constructor(
    @Inject(AnswerRepository)
    private readonly answerRepository: IAnswerRepository,
  ) {}
  async execute({ surveyId, answerId, userId }: DeleteAnswerUseCaseDTO) {
    const answer = await this.answerRepository.findAnswerByIdAndSurveyAndUser(
      answerId,
      surveyId,
      userId,
    );

    if (!answer) throw new Error('Survey not found');

    await this.answerRepository.remove(answerId);
  }
}
