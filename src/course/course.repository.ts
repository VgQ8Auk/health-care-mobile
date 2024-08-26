import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseCategory } from "src/.entities/course-category.entity";
import { Course } from "src/.entities/course.entity";
import { Repository } from "typeorm";
import { dtoCourse, dtoCourseCategory } from "./course.dto";

@Injectable()
export class CourseRepository{
    constructor (
        @InjectRepository(Course)
        private readonly courseRepository:Repository<Course>
    ){}
    async getCourseDetailByUser (uuid:string) {
        try {
            const userPartner = await this.courseRepository.findOne({
                where: {
                    uuid: uuid
                }
            });
            if (!userPartner) {
                return {
                    statusCode: 404,
                    message: 'User not found.',
                    data: [],
                    total: 0
                };
            }   
            const query = this.courseRepository.createQueryBuilder('course')
                .leftJoin('course.courseCategory', 'courseCategory')
                .select([
                    'course',
                    'courseCategory',
                ])
                .andWhere(`course.id = '${userPartner.id}'`)
            let data = await query.getMany();
            const total = await query.getCount();
            return {
                statusCode: 200,
                message: 'Get Course Details.',
                data: data,
                total: total
            };

        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                message: 'Internal server error',
                data: [],
                total: 0
            };
        }
    }

    async createCourse(data:dtoCourse){
        try {
            const courseNew = this.courseRepository.create(data);
            return await this.courseRepository.save(courseNew);
        } catch (error) {console.log(error)}
    }
}


export class CourseCategoryRepository {
    constructor(
        @InjectRepository(CourseCategory)
        private readonly courseCategoryRepository: Repository<CourseCategory>
    ) { }
    async createCourseCategory (data:dtoCourseCategory) {
        try {
            const duplicatedName = await this.courseCategoryRepository.findOne({
                where: {
                    name: data.name
                }
            });
            if (duplicatedName) throw new BadRequestException('Duplicated name')
            const courseCategory = this.courseCategoryRepository.create(data);
            await this.courseCategoryRepository.save(courseCategory);
            return {
                statusCode: 201,
                message: 'Create Course Details.',
                courseCategory: courseCategory
            }
        } catch (error) {
            console.log(error)
        }
    }
}