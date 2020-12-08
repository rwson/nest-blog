import { Injectable, Inject } from '@nestjs/common';

import { UserModel, UserInterface } from '@/server/models';

@Injectable()
export class UserService {
  constructor(@Inject(UserModel.collection.collectionName) private readonly userModel: typeof UserModel) {

  }

  async login() {
    console.log(this.userModel);

    return {
      code: 1
    };
  }

  getHello(): string {
    return 'Hello World22222!';
  }
}
