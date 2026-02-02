import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/shared/shared-decorators/currentUser.decorator";
import { AuthGuard } from "src/shared/shared-modules/auth-guard/auth.guard";
import { PostsService } from "./posts.service";

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createPost(@CurrentUser() User: { userId: string }) {
    return this.postsService.createPost({ userId: User.userId });
  }

  @UseGuards(AuthGuard)
  @Get('posts')
  viewPost(@CurrentUser() User: { userId: string }) {
    return this.postsService.findByUserId(User.userId);
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  deletePost(@CurrentUser() User: { userId: string }) {
    return this.postsService.deleteById(User.userId);
  }
}