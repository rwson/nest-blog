import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { nanoid } from 'nanoid';

import {
  ensureDirSync,
  writeFileSync,
  removeSync,
} from 'fs-extra';

import { extname, join } from 'path';

import { AuthService } from '@/server/auth';

import { FileModelToken, FileModel, FileInterface } from '@/server/models';
import { FileDocument } from '@/server/models/file';

import { FileItem, FileLibraryResponse } from '@/dto/file/response';

import { FileDto, BaseResponse } from '@/dto/base';

import { PATHS } from '@/server/config';

import getFileMd5 from '@/server/utils/file-md5';

import errorCode from '@/error-code';

@Injectable()
export class FileService {
  constructor(
    @Inject(FileModelToken) private readonly fileModel: FileInterface,
    private readonly authService: AuthService,
  ) {}

  async uploadFile(
    authorization: string,
    file: FileDto | undefined,
  ): Promise<BaseResponse> {
    if (file) {
      const { originalname, size, buffer, mimetype } = file;
      const md5: string = getFileMd5(buffer);
      const ext: string = extname(originalname);

      const name: string = `${nanoid(18)}${ext}`;

      const distDirPath: string = PATHS.getUploadPathWithDate();
      const distPath: string = join(distDirPath, name);
      const url: string = PATHS.getVisitPath(name);

      const user = this.authService.parse(authorization);
      const id: string = user.id ?? '';

      ensureDirSync(distDirPath);

      writeFileSync(distPath, buffer);

      const fileInst: FileDocument = new FileModel({
        type: mimetype,
        uploader: id,
        url,
        distPath,
        originalname,
        name,
        size,
        md5,
      });

      await fileInst.save();

      return errorCode.success;
    }

    throw new BadRequestException(errorCode.uploadFileNotEmpty);
  }

  async deleteFile(id: string): Promise<BaseResponse> {
    const file: FileDocument | null = await this.fileModel.findById(id);

    if (file) {
      const fileRes = file.toJSON();

      removeSync(fileRes.distPath);

      await this.fileModel.findByIdAndRemove(id);

      return errorCode.success;
    }

    throw new BadRequestException(errorCode.getFileEmpty);
  }

  async fileLibrary(): Promise<FileLibraryResponse> {
    const res: Array<FileDocument> = await this.fileModel
      .find({})
      .select(['type', 'uploader', 'url', 'name', 'size', 'uploader'])
      .populate({
        path: 'uploader',
        select: 'userName -_id',
      });
    const data: Array<FileItem> = res.map(
      (file: FileDocument): FileItem => {
        return file.toJSON() as FileItem;
      },
    );

    return {
      ...errorCode.success,
      data,
    };
  }

  async getFileUrl(id: string): Promise<string> {
    const file: FileDocument | null = await this.fileModel.findById(id);

    if (file) {
      return file.url;
    }

    return null;
  }
}
