import { Parent, Mutation, Query, Resolver, Args, ResolveField } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './lesson.entity';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService,
    private studentService: StudentService) {}
  @Query((returns) => LessonType)
  lesson(
    @Args('id') id: string,
  ) {
    return this.lessonService.getLesson(id);
    // {
    //   id: 'asdjo12j31a',
    //   name: 'Physics Class',
    //   startDate: new Date().toISOString(),
    //   endDate: new Date().toISOString(),
    // };
  }

  @Query((returs) => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput
    // @Args('name') name: string,
    // @Args('startDate') startDate: string,
    // @Args('endDate') endDate: string,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson){
    // console.log(lesson);
    return this.studentService.getManyStudents(lesson.students);
  }
}
