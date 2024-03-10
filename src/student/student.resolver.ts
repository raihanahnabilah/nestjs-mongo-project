import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { StudentService } from "./student.service";
import { CreateStudentInput } from "./create-student.input";


@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private studentService: StudentService,
    ) {}

    @Mutation(returns => StudentType)
    async createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput
    ) {
        return this.studentService.createStudent(createStudentInput);
    }

    @Query((returs) => [StudentType])
    students() {
      return this.studentService.getStudents();
    }

    @Query((returns) => StudentType)
    student(
      @Args('id') id: string,
    ) {
      return this.studentService.getStudent(id);
      // {
      //   id: 'asdjo12j31a',
      //   name: 'Physics Class',
      //   startDate: new Date().toISOString(),
      //   endDate: new Date().toISOString(),
      // };
    }
  
}