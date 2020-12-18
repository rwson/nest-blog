import { Injectable, BadRequestException } from '@nestjs/common';

import { markdown } from 'markdown';

import { FileDto } from '@/dto/base';
import { ParseMarkdownData, ParseMarkdownResponse } from '@/dto/article/response';

import errorCode from '@/error-code';

@Injectable()
export class ArticleService {

  async parseMarkdown(file: FileDto | undefined): Promise<ParseMarkdownResponse> {
    if (file) {
      const content: string = file.buffer.toString();
      const data: ParseMarkdownData = new ParseMarkdownData();
      const html: string = markdown.toHTML(content);

      data.html = html;

      return {
        data,
        ...errorCode.success
      };
    }

    throw new BadRequestException(errorCode.parseMarkdownNotEmpty);
  }

  
}
