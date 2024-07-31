import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/entities/address.entity';
import { Image } from 'src/image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Follow } from './entities/follow.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User, Image, Address])],
  controllers: [FollowController],
  providers: [FollowService, UserService, ImageService, AddressService]
})
export class FollowModule {}
