import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async create(createUserDto: CreateUserDto, image: Express.Multer.File) {
    const { address, ...rest } = JSON.parse(createUserDto as unknown as string);
    const newImage = await this.imageService.create(image);
    const newAddress = await this.addressService.create(address);
    const newUser = this.userRepository.save({
      ...rest,
      profile_picture: newImage,
      address: newAddress
    });

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
