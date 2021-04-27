import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import errorCode from '@/error-code';

@Injectable()
export class ApiValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const error = errors.shift();
      const constraints = error.constraints;
      const keys = Object.keys(constraints);
      let errorKey;

      if (keys.length) {
        errorKey = keys[0];
        throw new BadRequestException(errorCode[constraints[errorKey]]);
      }
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
