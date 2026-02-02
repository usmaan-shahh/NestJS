import { Controller, Get, Post, UseGuards, Body } from "@nestjs/common";
import { CurrentUser } from "src/shared/shared-decorators/currentUser.decorator";
import { AuthGuard } from "src/shared/shared-modules/auth-guard/auth.guard";
import { PostsService } from "./posts.service";
import { ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import { CreatePostDto } from "./dto/create-post.dto";
import { DeletePostDto } from "./dto/delete-post.dto";


@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('create')
  createPost(
    @CurrentUser() User: { userId: string },
    @Body() body: CreatePostDto,
  ) {
    return this.postsService.createPost({ ...body, userId: User.userId });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('posts')
  viewPost(@CurrentUser() User: { userId: string }) {
    return this.postsService.findByUserId(User.userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('delete')
  deletePost(@Body() body: DeletePostDto) {
    return this.postsService.deleteById(body.id);
  }
}