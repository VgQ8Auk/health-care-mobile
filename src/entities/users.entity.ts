import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum GENDER {
  Male = 'Male',
  Female = 'Female',
  Agender = 'Agender',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phonenumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'enum', enum: GENDER, nullable: true })
  gender: GENDER;

  @Column({ type: 'date', nullable: true })
  dateofbirth: Date;

  @Column({ type: 'boolean', default: false })
  authenticated: boolean;
}

export { GENDER };
