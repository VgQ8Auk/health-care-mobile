import { Column, CreateDateColumn, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CourseCategory } from "./course-category.entity";
import { Users } from "./users.entity";

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
    price: number;

    /////////////////////////////
    @Column({ type: 'bigint' })
    courseAuthorId: number;

    @Column({ type: 'bigint' })
    courseCategoryId: number;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({ name: 'courseAuthorId' })
    courseAuthor: Users;

    @ManyToOne(() => CourseCategory, (courseCategory) => courseCategory.courses)
    @JoinColumn({ name: 'courseCategoryId', referencedColumnName: 'id' })
    courseCategory: CourseCategory;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({type:'boolean'})
    active: boolean;
}
