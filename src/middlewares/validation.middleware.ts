import { NextFunction, Request, Response } from "express";
import { IRequestResponseHandler } from "../interfaces/http.interface";
import { AnyZodObject } from "zod";
import { ResponseHelper } from "../helpers/response.helper";
import { HttpStatusCode } from "../constants/http.enum";

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

  // static fileHandler = (upload: multer.Multer) => {
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       await upload.any()(req, res, err => {
  //         if (err) {
  //           console.log(err)
  //           ErrorMiddleware.handle(res, err);
  //         } else {
  //           return next()
  //         }
  //       });
  //     } catch (error) {
  //       ErrorMiddleware.handle(res, error);
  //     }
  //   };
  // };
}

export default ValidationMiddleware;
