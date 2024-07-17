import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>
  ) {}

  async follow(following_id: number, req: Request) {
    try {
      const {
        session: { userId }
      } = req;

      const followUser = await this.followRepository.create({
        follower: { id: userId } as User,
        following: { id: following_id } as User
      });
      await this.followRepository.save(followUser);

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

      await this.followRepository.delete({
        follower: { id: userId } as User,
        following: { id: following_id } as User
      });

      return true;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
