import { Injectable } from "@nestjs/common";
import { PostsRepository } from "./posts.repository";

@Injectable()
export class PostsService {
   constructor(private postsRepository: PostsRepository) {}


    async createPost(data: Partial<{ userId: string; title: string; content: string }>) {   
        return this.postsRepository.createPost(data);
    }

    async findByUserId(userId: string) {
        return this.postsRepository.findByUserId(userId);
    }
    async deleteById(id: string) {
        return this.postsRepository.deleteById(id);
    }

    
}