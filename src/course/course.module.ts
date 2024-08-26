import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseCategoryRepository, CourseRepository } from './course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/.entities/course.entity';
import { CourseCategory } from 'src/.entities/course-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseCategory])],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, CourseCategoryRepository]
})
export class CourseModule {}
