import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
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
    data: CreatePostDto,
    req: Request,
    media: Express.Multer.File[]
  ) {
    try {
      const {
        session: { userId }
      } = req;
      const user = await this.userService.findOne(userId);

      if (!user) {
        throw new BadRequestException();
      }

      const newImages = await this.imageRepository.save(media);

      const newPost = await this.postRepository.save({
        ...data,
        media: newImages,
        posted_by: user
      });

      return newPost;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async getPostBySlug(slug: string) {
    try {
      const post = await this.postRepository.findOne({
        where: {
          slug
        },
        relations: {
          posted_by: {
            profile_picture: true
          },
          media: true
        }
      });

      return post;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async getUserPosts(username: string, type: string) {
    console.log({ username, type });
    try {
      let posts: Post[] | null;

      if (type === 'p') {
        posts = await this.postRepository.find({
          where: {
            posted_by: {
              username
            }
          }
        });
      } else if (type === 's') {
        posts = await this.postRepository.find({
          where: {
            saved_by: {
              username
            }
          }
        });
      }

      console.log({ posts });

      return posts;
    } catch (error) {
      console.error(error);
      throw new NotFoundException();
    }
  }
}
