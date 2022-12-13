import { PrismaService } from "../prisma/prisma.service";
import { Exception } from "../utils/exceptions/exception";
import { Exceptions } from "../utils/exceptions/exceptionsHelper";
import { UpdateAttendanceListDto } from "./dto/update-attendance-list.dto";
import { AttendanceList } from "./entities/attendance-list.entity";

export class AttendanceListRepository {
    constructor(private readonly prismaService: PrismaService) {}
    async createAttendanceList({
        classroomId,
        day,
        endDate,
        id,
        startDate,
        students,
      }: AttendanceList): Promise<AttendanceList> {
        return await this.prismaService.attendanceList.create({
          data: {
            day: day,
            endDate: endDate,
            id: id,
            startDate: startDate,
            classroomId: classroomId,
          },
          include: {
            students: true,
          },
        });
      }

      async updateAttendanceList({
        id,
        studentsId,
      }: UpdateAttendanceListDto): Promise<AttendanceList> {
        try {
          return await this.prismaService.attendanceList.update({
            where: { id: id },
            data: {
              students: {
                connect: studentsId.map((id) => {
                  return { id: id };
                }),
              },
            },
            include: {
              students: true,
            },
          });
        } catch (err) {
          throw new Exception(
            Exceptions.DatabaseException,
            'userId sended not exist',
          );
        }
      }
}