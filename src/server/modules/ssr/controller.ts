import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from '@nestjs/common';
import next from 'next';
import { isDev } from '@/server/config';

export const app = next({ dev: true });
const handle = app.getRequestHandler();

@Controller()
export class SSRController {
  @Get('/_next/*')
  async _next(@Req() request: Request, @Res() response: Response) {
    handle(request, response);
  }

  @Get('/blog/articles/:id')
  async article(@Req() request: Request, @Res() response: Response) {
    return app.render(request, response, '/blog/article', {
      id: request.params.id,
    });
  }

  @Get('/')
  async index(@Res() response: Response) {
    response.redirect('/blog');
  }

  @Get('*')
  async _all(@Req() request: Request, @Res() response: Response) {
    handle(request, response);
  }
}
