import { Controller, Get, Post, UseGuards, Body } from "@nestjs/common";
import { CurrentUser } from "src/shared/shared-decorators/currentUser.decorator";
import { AuthGuard } from "src/shared/shared-modules/auth-guard/auth.guard";
import { PostsService } from "./posts.service";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreatePostDto } from "./dto/create-post.dto";
import { DeletePostDto } from "./dto/delete-post.dto";

@ApiTags('Posts')
@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @UseGuards(AuthGuard)
  @Post('create')
  createPost(
    @CurrentUser() User: { userId: string },
    @Body() body: CreatePostDto,
  ) {
    return this.postsService.createPost({ ...body, userId: User.userId });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all posts for the current user' })
  @ApiResponse({ status: 200, description: 'List of posts retrieved successfully' })
  @UseGuards(AuthGuard)
  @Get('posts')
  viewPost(@CurrentUser() User: { userId: string }) {
    return this.postsService.findByUserId(User.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @UseGuards(AuthGuard)
  @Post('delete')
  deletePost(@Body() body: DeletePostDto) {
    return this.postsService.deleteById(body.id);
  }
}