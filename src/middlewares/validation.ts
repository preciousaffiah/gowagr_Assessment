import { plainToInstance } from "class-transformer";
import { ValidationError, validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { APIResponse } from "utils/response";

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export default function validationMiddleware(
  type: any,
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(type, req.body);
      await validateOrReject(dto, {
        skipMissingProperties,
        whitelist,
        forbidNonWhitelisted,
      });
      req.body = dto;
      next();
    } catch (errors: any) {
      let result: any;
      errors.forEach((error: ValidationError) => {
        Object.entries(error.constraints as Record<string, string>).forEach(
          ([constraintKey, constraintValue]) => {
            result = constraintValue;
          }
        );
      });
      return APIResponse.error(res, { message: result }, 400);
    }
  };
}

export function isValidEnumValue<T extends { [key: string]: string }>(enumObject: T, value: any): value is T[keyof T] {
  return Object.values(enumObject).includes(value);
}