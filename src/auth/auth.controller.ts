import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto, CreateUserDto } from "src/users/users.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller ('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}
    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @HttpCode(201)
    @Post('signup')
    signUp(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
    }

    @HttpCode(200)
    @Post('signin')
    SignIn(@Body() credentials : LoginUserDto){
        const { email , password } = credentials;
        return this.authService.SignIn(email, password);
    }

}