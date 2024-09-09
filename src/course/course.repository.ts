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

    async getCourseByUuid(uuid:string){
        try {
            
        } catch (error) {console.log(error)}
    }

    async getCoursesByUserUuid (userUuid:string) {
        try {
            const userFound = await this.courseRepository.findOne({
                where: {
                    uuid: userUuid
                }
            });
            if (!userFound) {
                return {
                    statusCode: 404,
                    message: 'User not found.',
                    data: [],
                    total: 0
                };
            }   
            const query = this.courseRepository.createQueryBuilder('course')
                .leftJoin('course.courseCategory', 'courseCategory')
                .leftJoin('course.courseAuthor', 'courseAuthor')
                .select([
                    'course',
                    'courseCategory',
                    'courseAuthor'
                ])
                .where('course.id = :userId', { userId: userFound.id })  // Use parameterized query
                .andWhere('course.active = true');  // Specify the table alias for the active column
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

    async createCourse(data:dtoCourse, userID:number){
        try {
            const dataNew = {
                ...data,
                courseAuthorId: userID
            }
            const courseNew = this.courseRepository.create(dataNew);
            return await this.courseRepository.save(courseNew);
        } catch (error) {console.log(error)}
    }

    async deleteCourseByUuid(uuid:string, userId:number){
        try {
            const courseFound = await this.courseRepository.findOne({where:{uuid:uuid}});
            if (!courseFound) return {
                statusCode: 404,
                message: 'Course not found.',
                data: [],
                total: 0
            };
            courseFound.active=false;
            return await this.courseRepository.save(courseFound);
        } catch (error) {console.log(error)}
    }

    async editCourse(){
        try {

        } catch (error) {console.log(error)}
    }

    async subcribeCourse(){

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