import { Request, Response, Router } from 'express'

export type IHttpRequest<T> = Request<T>

export type IHttpRouter = Router
export type IHttpResponse = Response
