import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { ClassroomRepository } from './classroom.repository';
import { DatabaseModule } from '../prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassroomController],
  providers: [ClassroomService, ClassroomRepository]
})
export class ClassroomModule {}
