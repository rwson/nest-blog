import { Injectable, Inject } from '@nestjs/common';

import { AuthService } from '@/server/auth';

import { UserModelToken, UserModel, UserInterface } from '@/server/models';
import { UserDocument } from '@/server/models/user';

import * as crypto from 'crypto-js';

import { UserLoginDto, CreateUserDto } from '@/dto/user/request';
import { UserLoginData, UserLoginResponse, CreateUserResponse } from '@/dto/user/response';

import errorCode from '@/error-code';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModelToken) private readonly userModel: UserInterface,
    private readonly authService: AuthService
  ) {}

  async login(user: UserLoginDto): Promise<UserLoginResponse> {
    const password: string = crypto.SHA1(user.password).toString();
    const userDoc: UserDocument | null = await UserModel.findOne({
      account: user.account,
      password
    }, ['userName', 'account', 'email', 'type']);

    if (user !== null) {
      const token: string = this.authService.signIn(userDoc.id, userDoc.account, userDoc.type);

      const data = new UserLoginData();

      data.email = userDoc.email;
      data.userName = userDoc.userName;
      data.avatar = userDoc.avatar;
      data.type = userDoc.type;
      data.token = token;

      return {
        ...errorCode.success,
        data
      };
    }

    return errorCode.loginUserNotExist;
  }

  async createUser(user: CreateUserDto): Promise<CreateUserResponse> {
    const password: string = crypto.SHA1(user.password).toString();

    const userInst = new UserModel({
      type: 'admin',
      avatar: '',
      userName: user.userName,
      email: user.email,
      account: user.account,
      password
    });

    await userInst.save();

    return errorCode.success;
  }

  getHello(): string {
    return 'Hello World22222!';
  }
}
