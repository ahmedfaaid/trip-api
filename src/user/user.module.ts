import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/entities/address.entity';
import { Image } from 'src/image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Image, Address])],
  controllers: [UserController],
  providers: [UserService, ImageService, AddressService]
})
export class UserModule {}
