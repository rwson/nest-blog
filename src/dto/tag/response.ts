import { BaseDto } from '../base';

export class ParseMarkdownData {
  html: string;
}

export class ParseMarkdownResponse extends BaseDto {
  data?: ParseMarkdownData;
}