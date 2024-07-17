import { Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':following_id')
  async follow(
    @Param('following_id') following_id: number,
    @Req() req: Request
  ) {
    return this.followService.follow(following_id, req);
  }

  @Delete(':following_id')
  async unfollow(
    @Param('following_id') following_id: number,
    @Req() req: Request
  ) {
    return this.followService.unfollow(following_id, req);
  }
}
