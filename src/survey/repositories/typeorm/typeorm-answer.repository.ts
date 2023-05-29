import { Answer } from 'src/survey/entities/answer.entity';
import { IAnswerRepository } from '../answer-repository.interface';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { FilterDTO } from 'src/shared/dtos/filter.dto';

export class AnswerRepository implements IAnswerRepository {
  private repo: Repository<Answer>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Answer);
  }
  async remove(answerId: string): Promise<void> {
    await this.repo.delete({ id: answerId });
  }
  async listAnswersBySurveyAndUser(
    userId: string,
    surveyId: string,
    filter: FilterDTO,
  ): Promise<{ answers: Answer[]; total: number }> {
    const [answers, total] = await this.repo
      .createQueryBuilder('answers')
      .leftJoin('answers.question', 'question')
      .leftJoin('question.survey', 'survey')
      .where('survey.id = :surveyId', { surveyId })
      .skip(filter.skip)
      .take(filter.take)
      .getManyAndCount();

    return { answers, total };
  }

  async save(answer: Partial<Answer>): Promise<void> {
    await this.repo.save(answer);
  }

  async findAnswerByIdAndSurveyAndUser(
    answerId: string,
    surveyId: string,
    userId: string,
  ): Promise<Answer> {
    return this.repo
      .createQueryBuilder('answers')
      .leftJoin('answers.question', 'question')
      .leftJoin('question.survey', 'survey')
      .where('answers.id = :answerId', { answerId })
      .andWhere('survey.id = :surveyId', { surveyId })
      .andWhere('survey.createdBy = :userId', { userId })
      .getOne();
  }
}
