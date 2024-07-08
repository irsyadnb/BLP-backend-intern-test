// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { IRequestResponseHandler } from "../interfaces/http.interface";
import { AnyZodObject } from "zod";
import { ResponseHelper } from "../helpers/response.helper";
import { HttpStatusCode } from "../constants/http.enum";
import multer from "multer";

class ValidationMiddleware {
  public static validate(schema: AnyZodObject | any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const parsed = await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        req.body = parsed.body;
        req.query = parsed.query;
        req.params = parsed.params;

        return next();
      } catch (error) {
        return ResponseHelper.responseError(
          res,
          HttpStatusCode.InternalServerError,
          "[Validate Middleware] Internal server error",
          error as object
        );
      }
    };
  }

  public static exceptionGuard(handler: IRequestResponseHandler) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req, res);
      } catch (error) {
        return ResponseHelper.responseError(
          res,
          HttpStatusCode.InternalServerError,
          "[Exception Guard] Internal server error",
          error as object
        );
      }

      return next();
    };
  }

  static fileHandler = (upload: multer.Multer) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await upload.any()(req, res, (err) => {
          if (err) {
            const errorDetails = {
              message: "[File Handler] Error during file upload",
              storageErrors: [],
            };

            // Specific error handling
            if (err instanceof multer.MulterError) {
              // Multer-specific errors
              errorDetails.storageErrors.push({
                message: err.message,
                code: err.code,
              });
            } else if (err instanceof Error) {
              // General errors
              errorDetails.storageErrors.push({
                message: err.message,
              });
            }

            return ResponseHelper.responseError(
              res,
              HttpStatusCode.BadRequest,
              errorDetails.message,
              errorDetails
            );
          }
          return next();
        });
      } catch (error) {
        const errorDetails = {
          message: "[File Handler] Internal server error",
          storageErrors: [{ message: (error as Error).message }],
        };

        return ResponseHelper.responseError(
          res,
          HttpStatusCode.InternalServerError,
          errorDetails.message,
          errorDetails
        );
      }
    };
  };
}

export default ValidationMiddleware;
