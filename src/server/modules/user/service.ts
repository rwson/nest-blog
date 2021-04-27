import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { AuthService } from '@/server/auth';

import { UserModelToken, UserModel, UserInterface } from '@/server/models';
import { UserDocument } from '@/server/models/user';

import * as crypto from 'crypto-js';

import { UserLoginDto, CreateUserDto } from '@/dto/user/request';
import {
  UserLoginData,
  UserLoginResponse,
  CreateUserResponse,
} from '@/dto/user/response';

import errorCode from '@/error-code';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModelToken) private readonly userModel: UserInterface,
    private readonly authService: AuthService,
  ) {}

  async login(user: UserLoginDto): Promise<UserLoginResponse> {
    const password: string = crypto.SHA1(user.password).toString();
    const userDoc: UserDocument | null = await UserModel.findOne(
      {
        account: user.account,
        password,
      },
      ['userName', 'account', 'email', 'type'],
    );

    if (userDoc !== null) {
      const token: string = this.authService.signIn(
        userDoc.id,
        userDoc.account,
        userDoc.type,
        null
      );

      const data: UserLoginData = new UserLoginData();

      data.email = userDoc.email;
      data.userName = userDoc.userName;
      data.avatar = userDoc.avatar;
      data.type = userDoc.type;
      data.token = token;

      return {
        ...errorCode.success,
        data,
      };
    }

    throw new BadRequestException(errorCode.loginUserNotExist);
  }

  async createUser(user: CreateUserDto): Promise<CreateUserResponse> {
    const password: string = crypto.SHA1(user.password).toString();

    const userInst: UserDocument = new UserModel({
      type: 'admin',
      avatar: '',
      userName: user.userName,
      email: user.email,
      account: user.account,
      password,
    });

    await userInst.save();

    return errorCode.success;
  }

  async checkLogin(authorization: string): Promise<UserLoginResponse> {
    const user = this.authService.parse(authorization);
    const id: string = user.id ?? '';
    const userDoc: UserDocument | null = await UserModel.findById(id, [
      'userName',
      'account',
      'email',
      'type',
    ]);

    if (userDoc !== null) {
      const token: string = this.authService.signIn(
        userDoc.id,
        userDoc.account,
        userDoc.type,
        authorization
      );

      const data: UserLoginData = new UserLoginData();

      data.email = userDoc.email;
      data.userName = userDoc.userName;
      data.avatar = userDoc.avatar;
      data.type = userDoc.type;
      data.token = token;

      return {
        ...errorCode.success,
        data,
      };
    }

    throw new BadRequestException(errorCode.checkLoginUserNotExist);
  }
}
