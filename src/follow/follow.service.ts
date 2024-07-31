import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    private userService: UserService
  ) {}

  async follow(followed_user_id: number, req: Request) {
    try {
      const {
        session: { userId }
      } = req;

      const user = await this.userService.findOne(userId);
      const followed_user = await this.userService.findOne(followed_user_id);

      if (!user || !followed_user) {
        throw new BadRequestException();
      }

      const follow = await this.followRepository.findOne({
        where: {
          user,
          followed_user
        }
      });

      if (!follow) {
        const followUser = await this.followRepository.create({
          user,
          followed_user
        });
        await this.followRepository.save(followUser);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async unfollow(following_id: number, req: Request) {
    try {
      const {
        session: { userId }
      } = req;

      const user = await this.userService.findOne(userId);
      const followed_user = await this.userService.findOne(following_id);

      if (!user || !followed_user) {
        throw new BadRequestException();
      }

      const follow = await this.followRepository.findOne({
        where: {
          user,
          followed_user
        }
      });

      if (!follow) {
        return true;
      }

      await this.followRepository.delete({
        user,
        followed_user
      });

      return true;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
