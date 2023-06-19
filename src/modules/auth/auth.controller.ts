import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { JwtRefreshGuard } from 'src/utils/guard/jwt-refresh.guard';
import { UserDTO } from '../user/dto/response-user.dto';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ResponseDto } from './dto/login-response.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: AuthRegisterLoginDto): Promise<UserDTO> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: AuthEmailLoginDto,
    @Res() res,
  ): Promise<ResponseDto> {
    const userData = await this.authService.validateLogin(loginDto);
    res.cookie('RefreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({
      user: userData.data,
      accessToken: userData.accessToken,
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() req, @Res() res) {
    const user = req.user;
    // console.log(req.cookies['RefreshToken']);
    const token = await this.authService.validateRefreshToken(
      user.sub,
      req.cookies['RefreshToken'],
    );
    // res.cookie('RefreshToken', token.accessToken, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });
    return res.send({ accessToken: token.accessToken });
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
