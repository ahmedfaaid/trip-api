import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
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
}
