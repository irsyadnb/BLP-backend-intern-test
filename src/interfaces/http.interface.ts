import { Request, Response } from 'express';

export interface IApiBaseResponseSuccess<T> {
  status: 'success';
  message: string;
  data?: T;
}

export interface IApiBaseResponseError<T> {
  status: 'error';
  message: string;
  errors?: T;
}

export interface IRequestResponseHandler {
  (req: Request, res: Response): Promise<Response> | Promise<void>;
}

export interface IApiBaseResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}