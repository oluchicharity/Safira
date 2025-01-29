import { Request } from "express";
import User, { IUser } from '../Models/userModel';

declare global {
    namespace Express {
        export interface Request {
            user?: User;
            //admin?: Admin;
            rawBody: string;
        }
    }
    export type RequestWithBody<B> = Request<Request['params'], Request['res'], B>;
    export type RequestWithParams<P> = Request<P, Request['res'], Request['body']>;
    export type RequestWithQuery<Q> = Request<
        Request['params'],
        Request['res'],
        Request['body'],
        Q
    >;
}