import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateImageDto } from 'src/image/dto/create-image.dto';
import { CreatePostDto } from './dto/create-post.dto';
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
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
    @UploadedFiles() images: CreateImageDto[]
  ) {
    return this.postService.create(createPostDto, req, images);
  }
}
