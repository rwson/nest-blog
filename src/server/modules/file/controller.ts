import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Headers,
  Param,
  UploadedFile,
  UseInterceptors,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import * as express from 'express';

import { FileLibraryResponse } from '@/dto/file/response';
import { FileDto, BaseResponse } from '@/dto/base';

import errorCode from '@/error-code';

import { FileService } from './service';

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload-file')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard())
  async uploadFile(
    @Headers('authorization') authorization: string,
    @UploadedFile('file') file: FileDto | undefined,
  ): Promise<BaseResponse> {
    return this.fileService.uploadFile(authorization, file);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard())
  async deleteFile(@Param('id') id: string): Promise<BaseResponse> {
    return this.fileService.deleteFile(id);
  }

  @Get('/library')
  async fileLibrary(): Promise<FileLibraryResponse> {
    return this.fileService.fileLibrary();
  }

  @Get('/get-file/:id')
  async getFile(
    @Param('id') id: string,
    @Response() res: express.Response,
  ): Promise<void> {
    const url: string = await this.fileService.getFileUrl(id);
    const { getFileEmpty } = errorCode;

    if (!url) {
      res.status(HttpStatus.BAD_REQUEST).json(getFileEmpty);
    } else {
      res.status(HttpStatus.PERMANENT_REDIRECT).redirect(url);
    }
  }
}
