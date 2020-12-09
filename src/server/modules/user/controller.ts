import { Controller, UseGuards, Get, Post, Put, Body, Headers } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { UserLoginDto, CreateUserDto } from '@/dto/user/request';
import { UserLoginResponse, CreateUserResponse } from '@/dto/user/response';

import { UserService } from './service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() user: UserLoginDto): Promise<UserLoginResponse> {
    return this.userService.login(user);
  }

  @Put('/create-user')
  async createUser(@Body() user: CreateUserDto): Promise<CreateUserResponse> {
    return this.userService.createUser(user);
  }

  @Get('/check-login')
  @UseGuards(AuthGuard())
  async checkLogin(@Headers('authorization') authorization: string) {
    return authorization;
  }

  @Get()
  getHello(): string {
    console.log(1111111);
    return this.userService.getHello();
  }
}
