import { Controller, Get, Post } from '@nestjs/common';

import { UserService } from './service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(): Promise<any> {
    console.log(1111111);
    return this.userService.login();
  }

  @Get()
  getHello(): string {
    console.log(1111111);
    return this.userService.getHello();
  }
}
