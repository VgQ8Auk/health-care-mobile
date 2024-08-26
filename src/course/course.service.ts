import { Injectable } from '@nestjs/common';
import { CourseCategoryRepository, CourseRepository } from './course.repository';
import { dtoCourse, dtoCourseCategory } from './course.dto';

@Injectable()
export class CourseService{
    constructor (
        private readonly courseRepository:CourseRepository,
        private readonly courseCategoryRepository:CourseCategoryRepository
    ){}
    async getCourseDetail(uuid: string) {
        try {
            return await this.courseRepository.getCourseDetailByUser(uuid);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve course details');
        }
    }

    async createCourseDetail(body:dtoCourse) {
        try {
            this.courseRepository.createCourse(body)
            return
        } catch (error) {
            console.log(error)
        }
    }

    async createCourseCategory(body:dtoCourseCategory) {
        try {
            this.courseCategoryRepository.createCourseCategory(body)
        } catch (error) {
            console.log(error)
        }
    }
}
