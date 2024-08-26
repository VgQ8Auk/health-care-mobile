import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity({ name: 'CourseCategory' })  // Renamed to match entity naming conventions
export class CourseCategory {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToOne(() => Course, (course) => course.courseCategory)
    course: Course;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
