import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Student } from "./student.entity";
import { CreateStudentInput } from "./create-student.input";
import { v4 as uuid } from "uuid";

export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>, 
    ) {}

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstName, lastName } = createStudentInput;

        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        })

        return this.studentRepository.save(student);
    }


    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOneBy({ id });
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    $in: studentIds,
                }
            }
        })
    }
}