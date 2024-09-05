import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{


    use(req: Request, res: Response, next: NextFunction){

        const actualDate = new Date();
        const date = actualDate.toLocaleDateString();
        const time = actualDate.toLocaleTimeString();

        console.log(`Ejecuntando método  ${req.method} en la ruta ${req.originalUrl} el día ${date} a las ${time} hrs`);
        next();
    };
};
