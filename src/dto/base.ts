export interface BaseDto<T> {
  code: number;
  msg: string;
  data?: T;
}