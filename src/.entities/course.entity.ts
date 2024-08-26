import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CourseCategory } from "./course-category.entity";

@Entity({ name: 'Course' })
export class Course {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    price: number;

    @Column({ type: 'bigint' })
    course_category_id: number;

    @OneToOne(() => CourseCategory, (courseCategory) => courseCategory.course)
    @JoinColumn({ name: 'course_category_id', referencedColumnName: 'id' })
    courseCategory: CourseCategory;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
