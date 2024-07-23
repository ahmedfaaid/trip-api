import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('media', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const username = req.session.username;
          const ext = extname(file.originalname);
          const filename = `${username}-${Date.now()}${ext}`;
          callback(null, filename);
        }
      })
    })
  )
  async create(
    @Body() body: any,
    @Req() req: Request,
    @UploadedFiles() media: Express.Multer.File[]
  ) {
    const data = JSON.parse(body.data);
    return await this.postService.create(data, req, media);
  }

  @Get('/:slug')
  async getPostBySlug(@Param() params: { slug: string }) {
    return await this.postService.getPostBySlug(params.slug);
  }

  @Get()
  async getUserPosts(
    @Query('username') username: string,
    @Query('type') type: string
  ) {
    return await this.postService.getUserPosts(username, type);
  }
}
