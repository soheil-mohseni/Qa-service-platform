import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ValidationConstraints } from '../../constants';

export function IsPassword(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsString()(target, propertyKey);
    IsNotEmpty()(target, propertyKey);
    Matches(ValidationConstraints.passwordPattern)(target, propertyKey);
  };
}
