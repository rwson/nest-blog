import { BaseResponse } from '../base';

export class FileCreator {
  userName: string;
}

export class FileItem {
  type: string;
  url: string;
  originalname: string;
  size: number;
  uploader: FileCreator;
}

export class FileLibraryResponse extends BaseResponse {
  data: Array<FileItem>;
}
