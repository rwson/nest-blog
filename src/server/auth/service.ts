import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { BLOG_JWT_KEY, BLOG_JWT_EXP } from '@/server/config';

type AdminTokenParsed = {
  readonly id?: string;
  readonly account?: string;
  readonly role?: string;
  readonly random?: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signIn(
    id: string,
    account: string,
    role: string,
  ): string {
    const random: string = Math.random().toString(16).slice(2);

    const token: string = this.jwtService.sign(
      {
        id,
        account,
        role,
        random
      },
      {
        expiresIn: BLOG_JWT_EXP
      }
    );
    const res: string = `Bearer ${token}`;

    return res;
  }

  parse(token: string): AdminTokenParsed {
    try {
      token = token.replace(/^Bearer/, '').trim();
      return this.jwtService.verify(token, {
        secret: BLOG_JWT_KEY
      });
    } catch (e) {
      return {};
    }
  }

  async validateUser(payload: any): Promise<any> {
    if (payload.exp * 1000 < Date.now()) {
      return null;
    }
    return payload;
  }
}
