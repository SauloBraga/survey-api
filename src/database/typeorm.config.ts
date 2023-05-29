import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { Answer } from 'src/survey/entities/answer.entity';
import { Question } from 'src/survey/entities/question.entity';
import { Respondent } from 'src/survey/entities/respondent.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Survey, Question, Answer, Respondent],
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}

export const DatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options) => {
    return new DataSource(options).initialize();
  },
});
