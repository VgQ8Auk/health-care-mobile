import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { jwtGuard } from 'src/common/guards';
import { dtoCourse, dtoCourseCategory } from './course.dto';
import { GetUser } from 'src/common/decorators';
import { Users } from 'src/.entities/users.entity';

@Controller('course')
@UseGuards(jwtGuard)
export class CourseController {
    constructor (private readonly courseService:CourseService)
    {}

    @Delete('/delete/:uuid')
    @HttpCode(HttpStatus.OK)
    async deleteCourseByUuid(@Param('uuid') uuid: string, @GetUser('id') userID:number) {
        try {
            const result = await this.courseService.deleteCourseByUuid(uuid, userID);
            return result;
        } catch (error) {
            console.error(error);
            throw new HttpException('Failed to retrieve course details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/get')
    @HttpCode(HttpStatus.OK)
    async getCoursesByUserUuid(@GetUser('uuid') userUuid: string) {
        try {
            const result = await this.courseService.getCoursesByUserUuid(userUuid);
            return result;
        } catch (error) {
            console.error(error);
            throw new HttpException('Failed to retrieve course details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get/course/:courseUuid')
    @HttpCode(HttpStatus.OK)
    async getCourseByUuid(@Param('courseUuid') courseUuid: string) {
        try {
            const result = await this.courseService.getCourseByUuid(courseUuid);
            return result;
        } catch (error) {
            console.error(error);
            throw new HttpException('Failed to retrieve course details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('create-course')
    @HttpCode(HttpStatus.CREATED)
    async createCourse(@Body() body:dtoCourse, @GetUser('id') userID:number) {
        try {
            console.log(new Date(new Date().getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toUTCString(), "Post - createCourse")
            return await this.courseService.createCourse(body, userID);
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
