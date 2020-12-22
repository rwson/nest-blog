import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { BLOG_JWT_KEY } from '@/server/config';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();
    let token: string = req.headers['authorization'];
    if (!token) {
      throw new ForbiddenException();
    }
    token = token.replace(/^Bearer/, '').trim();
    const decoed: any = this.jwtService.verify(token, {
      secret: BLOG_JWT_KEY,
    });
    const hasRole: boolean = roles.includes(decoed.role);

    if (hasRole) {
      return true;
    } else {
      throw new ForbiddenException();
    }
  }
}
