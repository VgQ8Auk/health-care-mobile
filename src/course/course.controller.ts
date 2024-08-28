import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { jwtGuard } from 'src/common/guards';
import { dtoCourse, dtoCourseCategory } from './course.dto';

@Controller('course')
@UseGuards(jwtGuard)
export class CourseController {
    constructor (private readonly courseService:CourseService)
    {}

    

    @Get(':uuid')
    @HttpCode(HttpStatus.OK)
    async getCourse(@Param('uuid') uuid: string) {
        try {
            console.log("hi");
            const result = await this.courseService.getCourseDetail(uuid);
            return result;
        } catch (error) {
            console.error(error);
            throw new HttpException('Failed to retrieve course details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('create-course')
    @HttpCode(HttpStatus.CREATED)
    async createCourse(@Body() body:dtoCourse) {
        try {
            console.log(new Date(new Date().getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toUTCString(), "Post - createCourse")
            return await this.courseService.createCourseDetail(body);
        } catch (error) {
            console.log(error);
            throw new Error('Failed to retrieve course details');
        }
    }

    @Post('create-course-category')
    @HttpCode(HttpStatus.CREATED)
    async createCourseCategory(@Body() body:dtoCourseCategory) {
        try {
            console.log(new Date(new Date().getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toUTCString(), "Post - createCourseCategory")
            this.courseService.createCourseCategory(body)
        } catch (error) {
            console.log(error)
        }
    }
}
