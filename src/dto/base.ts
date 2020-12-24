export class BaseResponse {
  code: number;
  message: string;
}

export class PageResponseDto {
  totalPages: number;
  currentPage: number;
  total: number;
}

export class FileDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
