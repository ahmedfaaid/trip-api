import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async follow(followed_username: string, req: Request) {
    try {
      const {
        session: { userId }
      } = req;

      const user = await this.userRepository.findOne({ where: { id: userId } });
      const followed_user = await this.userRepository.findOne({
        where: {
          username: followed_username
        }
      });

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

  async unfollow(following_username: string, req: Request) {
    try {
      const {
        session: { userId }
      } = req;

      const user = await this.userRepository.findOne({
        where: {
          id: userId
        }
      });
      const followed_user = await this.userRepository.findOne({
        where: {
          username: following_username
        }
      });

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
