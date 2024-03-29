import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Exception } from '../utils/exceptions/exception';
import { Exceptions } from '../utils/exceptions/exceptionsHelper';
import { ClassroomRepository } from './classroom.repository';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from './entities/classroom.entity';

@Injectable()
export class ClassroomService {

  constructor(private readonly classroomRepository: ClassroomRepository) {}
  
  async create(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    const id = randomUUID();
    return await this.classroomRepository.createClassrooms(
      createClassroomDto,
      id,
    );
  }

  async findAll(): Promise<Classroom[]> {
    return await this.classroomRepository.findAllClassrooms();
  }

  async findOne(id: string): Promise<Classroom> {
    return this.classroomRepository.findClassroomById(id);
  }

  async update(updateClassroomDto: UpdateClassroomDto): Promise<Classroom> {
    if(!updateClassroomDto.studentsIds && !updateClassroomDto.teachersIds){
      throw new Exception(Exceptions.InvalidData, "not send reference to connection");
    } 
    
    return await this.classroomRepository.updateClassroom(updateClassroomDto);
  }

  async remove(id: string): Promise<string> {
    try {
      await this.classroomRepository.deleteClassrooms(id);
      return Promise.resolve('Classroom deleted succesfully');
    } catch (err) {
      return 'Classroom not found';
    }
  }
}
