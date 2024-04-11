import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { omit } from 'utils/fns';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto, req: Request) {
    try {
      const existingUser = await this.userService.findByEmail(loginDto.email);

      if (!existingUser) throw new UnauthorizedException();

      const { password, ...rest } = existingUser;

      if (loginDto.password !== password) throw new UnauthorizedException();

      const sessionPayload = {
        username: rest.username,
        id: rest.id
      };

      req.session.username = rest.username;
      req.session.token = await this.jwtService.signAsync(sessionPayload);

      return rest;
    } catch (error) {
      console.error({ error });
      throw new UnauthorizedException();
    }
  }

  async register(
    body: CreateUserDto,
    req: Request,
    profile_picture?: Express.Multer.File
  ) {
    try {
      let newUser = await this.userService.create(body, profile_picture);

      if (!newUser) throw new BadRequestException();

      newUser = omit(['password'], newUser);

      const sessionPayload = {
        username: newUser.username,
        id: newUser.id
      };

      req.session.username = newUser.username;
      req.session.token = await this.jwtService.signAsync(sessionPayload);

      return newUser;
    } catch (error) {
      console.error({ error });
      throw new BadRequestException();
    }
  }

  async me(req: Request) {
    try {
      const { session } = req;

      if (!session.username || !session.token) {
        throw new UnauthorizedException();
      }

      const { username, id } = await this.jwtService.verifyAsync(session.token);

      if (session.username !== username) {
        throw new UnauthorizedException();
      }

      let user = await this.userService.findOne(id);

      if (!user) {
        throw new UnauthorizedException();
      }

      user = omit(['password'], user);

      return user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
