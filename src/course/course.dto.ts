import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class dtoCourseCategory {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class dtoCourse {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    courseCategoryId: number;

}