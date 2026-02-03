import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from './posts.entity';

@Injectable()
export class PostsRepository extends Repository<Post> {

  constructor(dataSource: DataSource) {
    super(Post, dataSource.createEntityManager()); 
  }

  async findById(id: string): Promise<Post | null> {
    return this.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findByUserId(userId: string): Promise<Post[]> {
    return this.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async createPost(data: Partial<Post>): Promise<Post> {
    const post = this.create(data);
    return this.save(post);
  }

  async updateById(id: string, data: Partial<Post>): Promise<Post | null> {
    const post = await this.findOne({ where: { id } });
    if (!post) return null;
    Object.assign(post, data);
    return this.save(post);
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
