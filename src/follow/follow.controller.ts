import { Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':username')
  async follow(@Param('username') username: string, @Req() req: Request) {
    return this.followService.follow(username, req);
  }

  @Delete(':username')
  async unfollow(@Param('username') username: string, @Req() req: Request) {
    return this.followService.unfollow(username, req);
  }
}
