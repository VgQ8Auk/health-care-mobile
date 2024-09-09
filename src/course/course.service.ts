import { Injectable } from '@nestjs/common';
import { CourseCategoryRepository, CourseRepository } from './course.repository';
import { dtoCourse, dtoCourseCategory } from './course.dto';
import { Users } from 'src/.entities/users.entity';

@Injectable()
export class CourseService{
    constructor (
        private readonly courseRepository:CourseRepository,
        private readonly courseCategoryRepository:CourseCategoryRepository
    ){}

    async getCourseByUuid(uuid: string) {
        try {
            return await this.courseRepository.getCourseByUuid(uuid);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve course details');
        }
    }

    async getCoursesByUserUuid(uuid: string) {
        try {
            return await this.courseRepository.getCoursesByUserUuid(uuid);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve course details');
        }
    }

    async deleteCourseByUuid(uuid: string, userId:number) {
        try {
            return await this.courseRepository.deleteCourseByUuid(uuid, userId);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete course');
        }
    }

    async createCourse(body:dtoCourse, userID:number) {
        try {
            this.courseRepository.createCourse(body, userID)
            return {
                status: 201,
                message: 'create course successfully'
            }
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
