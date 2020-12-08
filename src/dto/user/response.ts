import { BaseDto } from '../base';

export interface UserLoginResponse<T> extends BaseDto<T> {
  data: T
}