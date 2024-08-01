import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class Otp {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => Users, user => user.id, { nullable: false })
    @JoinColumn()
    user: Users;

    @Column()
    otp: string;

    @Column()
    expiredAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}