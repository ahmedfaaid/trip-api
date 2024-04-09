import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return await this.authService.login(loginDto, req);
  }

  @Post('register')
  @UseInterceptors(
    FileInterceptor('profile_picture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const userData = JSON.parse(req.body.data);
          const ext = extname(file.originalname);
          const filename = `${userData.username}-${Date.now()}${ext}`;
          callback(null, filename);
        }
      })
    })
  )
  async register(
    @Body() body: any,
    @Req() req: Request,
    @UploadedFile() profile_picture?: Express.Multer.File
  ) {
    const data = JSON.parse(body.data);
    return await this.authService.register(data, req, profile_picture);
  }
}
