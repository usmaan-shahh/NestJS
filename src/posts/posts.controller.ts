import { Controller, Get, Post, UseGuards, Body, Delete } from "@nestjs/common";
import { CurrentUser } from "src/shared/shared-decorators/currentUser.decorator";
import { AuthGuard } from "src/shared/shared-modules/auth-guard/auth.guard";
import { PostsService } from "./posts.service";
import { ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import { CreatePostDto } from "./dto/create-post.dto";
import { DeletePostDto } from "./dto/delete-post.dto";

ApiTags('Posts')
@Controller('/api/vi/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'This endpoint is used to create a new post' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createPost(
    @CurrentUser() User: { userId: string },
    @Body() body: CreatePostDto,
  ) {
    return this.postsService.createPost({ ...body, userId: User.userId });
  }

  @ApiOperation({
    summary: 'This endpoint is used to fetch logged-in user posts',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  viewPosts(@CurrentUser() User: { userId: string }) {
    return this.postsService.findByUserId(User.userId);
  }

  @ApiOperation({ summary: 'This endpoint is used to delete a post' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  deletePost(@Body() body: DeletePostDto) {
    return this.postsService.deleteById(body.id);
  }
}