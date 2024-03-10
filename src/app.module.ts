import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/lesson.entity';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      // url: 'mongodb+srv://HanaProject:NestjsUdemy@cluster0.3hf2mv8.mongodb.net/test?retryWrites=true&w=majority',
      // database: 'student-api-db',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      // useNewUrlParser: true,
      // logging: true,
      // ssl: true,
      useUnifiedTopology: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/student-api-db',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Lesson],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    LessonModule,
  ],
})
export class AppModule {}
