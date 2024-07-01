import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AddressService } from 'src/address/address.service';
import { ImageService } from 'src/image/image.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private imageService: ImageService,
    private addressService: AddressService
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
          }
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
}
