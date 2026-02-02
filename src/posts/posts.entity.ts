import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('posts')
export class Post {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ name: 'user_id' }) //The Foreign Key Column Name in the Post's Table is 'user_id'.
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' }) //“The user_id column in the posts table references the primary key (id) of the users table.”
  user: User;
  
}
