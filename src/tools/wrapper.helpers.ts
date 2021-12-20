import { ValidationError } from "class-validator";
import { Request, Response } from "express";

export class HttpError extends Error {
  constructor(message?: string, public statusCode: number = 400) {
    super(message);
  }
}

export class HttpValidationError extends HttpError {
  constructor(public errors: ValidationError[]) {
    super("Validation error", 400);
  }
}

export function wrapper(func: Function) {
  return async function (req: Request, res: Response, next: Function) {
    try {
      await func.apply(null, [req, res, next]);
    } catch (err) {
      next(err);
    }
  };
}

export function middlewareWrapper(func: Function) {
  return async function (req: Request, res: Response, next: Function) {
    try {
      await func.apply(null, arguments);
      next();
    } catch (error) {
      next(error);
    }
  };
}
