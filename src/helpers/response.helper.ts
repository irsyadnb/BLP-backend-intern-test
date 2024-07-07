import { HttpStatusCode } from "../constants/http.enum";
import {
  IApiBaseResponseError,
  IApiBaseResponseSuccess,
} from "../interfaces/http.interface";
import { Response } from "express";

export class ResponseHelper {
  public static responseSuccess(
    res: Response,
    statusCode: HttpStatusCode,
    message: string,
    data?: object[] | object | null | undefined
  ) {
    const responseObj: IApiBaseResponseSuccess<object> = {
      status: "success",
      message: message,
    };

    if (data !== null && data !== undefined) {
      responseObj.data = data;
    }

    return res.status(statusCode).json(responseObj);
  }

  public static responseError(
    res: Response,
    statusCode: HttpStatusCode,
    message: string,
    errors?: object | null | undefined
  ) {
    const responseObj: IApiBaseResponseError<object> = {
      status: "error",
      message: message,
    };

    if (errors !== null && errors !== undefined) {
      responseObj.errors = errors;
    }

    return res.status(statusCode).json(responseObj);
  }
}
