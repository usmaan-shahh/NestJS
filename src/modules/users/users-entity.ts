import { BaseEntity } from 'src/core/base-entitiy/base.entity';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('users') // Adds Extra Info to the User Class to be used as a DB Entity and name it as 'users' table
export class User extends BaseEntity {
  
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
