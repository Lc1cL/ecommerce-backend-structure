import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs"
import { Request } from "express";

function validateRequest (request: Request){
    const token = request.headers['token'];
    return token === '1234'
}

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate( 
        context : ExecutionContext,
    ) : boolean | Promise<boolean> | Observable<boolean> { 
        const request = context.switchToHttp().getRequest();
        return validateRequest (request);
    }
}
