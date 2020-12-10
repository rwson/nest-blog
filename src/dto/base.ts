export class BaseDto {
  code: number;
  message: string;
}

export class FileDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
}