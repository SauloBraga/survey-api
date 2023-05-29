import { Inject } from '@nestjs/common';
import { IQuestionRepository } from '../../repositories/question-repository.interface';
import { ISurveyRepository } from '../../repositories/survey-repository.interface';
import { SurveyRepository } from '../../repositories/typeorm/typeorm-survey.repository';
import { QuestionRepository } from '../../repositories/typeorm/typeorm-question.repository';
import { IUserRepository } from 'src/user/repositories/user-repository.interface';
import { UserRepository } from 'src/user/repositories/typeorm/typeorm-user.repository';

interface CreateSurveyDTO {
  userId: string;
  name: string;
  description: string;
  questions: string[];
}

export class CreateSurveyUseCase {
  constructor(
    @Inject(SurveyRepository)
    private readonly surveyRepository: ISurveyRepository,
    @Inject(QuestionRepository)
    private readonly questionRepository: IQuestionRepository,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({
    userId,
    name,
    description,
    questions,
  }: CreateSurveyDTO): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error('User document not found');

    const survey = await this.surveyRepository.save({
      name,
      description,
      createdBy: user,
    });

    await Promise.all(
      questions.map(async (question) =>
        this.questionRepository.save({ survey, description: question }),
      ),
    );
  }
}
