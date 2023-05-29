import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { IQuestionRepository } from '../question-repository.interface';
import { Question } from 'src/survey/entities/question.entity';

export class QuestionRepository implements IQuestionRepository {
  private repo: Repository<Question>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Question);
  }
  async update(question: Partial<Question>): Promise<void> {
    await this.repo.save(question);
  }

  async save(survey: Partial<Question>): Promise<Question> {
    return this.repo.save(survey);
  }
}
