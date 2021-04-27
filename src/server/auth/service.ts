import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { BLOG_JWT_KEY, BLOG_JWT_EXP } from '@/server/config';

type AdminTokenParsed = {
  readonly id?: string;
  readonly account?: string;
  readonly role?: string;
  readonly random?: string;
  readonly exp?: number;
};

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signIn(id: string, account: string, role: string, originToken: string | null): string {

    if (originToken !== null) {
      const tokenInfo = this.parse(originToken);

      //  有效期仅剩余半小时刷新
      if (tokenInfo.exp * 1000 - Date.now() > 1.8E6) {
        return originToken;
      }
    }

    const random: string = Math.random().toString(16).slice(2);
    const token: string = this.jwtService.sign(
      {
        id,
        account,
        role,
        random,
      },
      {
        expiresIn: BLOG_JWT_EXP,
      },
    );

    const res: string = `Bearer ${token}`;

    return res;
  }

  parse(token: string): AdminTokenParsed {
    try {
      token = token.replace(/^Bearer/, '').trim();
      return this.jwtService.verify(token, {
        secret: BLOG_JWT_KEY,
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
