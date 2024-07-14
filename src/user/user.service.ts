import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { AddressService } from 'src/address/address.service';
import { ImageService } from 'src/image/image.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { Follower } from './entities/follower.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private imageService: ImageService,
    private addressService: AddressService
    // private followerRepository: Repository<Follower>
  ) {}

  async create(createUserDto: CreateUserDto, image?: Express.Multer.File) {
    try {
      const { address, password, ...rest } = { ...createUserDto };
      let newImage;

      if (image) {
        newImage = await this.imageService.create(image);
      }
      const newAddress = await this.addressService.create(address);
      const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
      const hashedPwd = await bcrypt.hash(password, salt);
      const newUser = this.userRepository.save({
        ...rest,
        password: hashedPwd,
        profile_picture: newImage,
        address: newAddress
      });

      return newUser;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          id
        },
        relations: {
          profile_picture: true,
          address: true,
          posts: {
            media: true
          },
          followers: true,
          following: true
        }
      });

      if (!existingUser) throw new NotFoundException();

      return existingUser;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          email
        },
        relations: {
          profile_picture: true,
          address: true
        }
      });

      if (!existingUser) throw new NotFoundException();

      return existingUser;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async follow(id: number, req: Request) {
    try {
      const {
        session: { userId }
      } = req;
      const user = await this.userRepository.findOne({
        where: {
          id: userId
        },
        relations: {
          profile_picture: true,
          address: true,
          posts: {
            media: true
          },
          followers: true,
          following: true
        }
      });
      const userToBeFollowed = await this.userRepository.findOne({
        where: {
          id
        },
        relations: {
          profile_picture: true,
          address: true,
          posts: {
            media: true
          },
          followers: true,
          following: true
        }
      });

      console.log({ user, id, userToBeFollowed, session: req.session });

      if (!req.session || !user) {
        throw new UnauthorizedException();
      }

      await userToBeFollowed.followers.push(user);
      await user.following.push(userToBeFollowed);

      await this.userRepository.save(user);
      await this.userRepository.save(userToBeFollowed);

      return true;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async unfollow(id: number, req: Request) {
    try {
      const {
        session: { userId }
      } = req;
      const user = await this.userRepository.findOne({
        where: {
          id: userId
        },
        relations: {
          profile_picture: true,
          address: true,
          posts: {
            media: true
          },
          followers: true,
          following: true
        }
      });
      const userToBeUnfollowed = await this.userRepository.findOne({
        where: {
          id
        },
        relations: {
          profile_picture: true,
          address: true,
          posts: {
            media: true
          },
          followers: true,
          following: true
        }
      });

      if (!req.session || !user) {
        throw new UnauthorizedException();
      }

      userToBeUnfollowed.followers = await userToBeUnfollowed.followers.filter(
        (follower) => follower.id !== userId
      );
      user.following = await user.following.filter(
        (following) => following.id !== id
      );

      await this.userRepository.save(userToBeUnfollowed);
      await this.userRepository.save(user);

      // await this.followerRepository.delete({
      //   user_id: userId,
      //   follower_id: userToBeUnfollowed.id
      // });

      return true;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
