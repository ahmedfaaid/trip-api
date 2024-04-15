import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { CreateImageDto } from 'src/image/dto/create-image.dto';
import { Image } from 'src/image/entities/image.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private userService: UserService
  ) {}

  async create(
    createPostDto: CreatePostDto,
    req: Request,
    images: CreateImageDto[]
  ) {
    try {
      const {
        session: { userId }
      } = req;
      const user = await this.userService.findOne(userId);

      if (!user) {
        throw new BadRequestException();
      }

      const newImages = await this.imageRepository.save(images);

      const newPost = await this.postRepository.save({
        ...createPostDto,
        images: newImages,
        posted_by: user
      });

      return newPost;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
