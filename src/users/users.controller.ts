import { Controller, Delete, Get, Put, Body, HttpCode, Param, UseGuards, Query, ParseUUIDPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Auth2Guard } from "src/guards/auth2.guard";
import { UpdateUserDto } from "./users.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller ('users')
export class UsersController {
    constructor (private readonly usersService: UsersService){}

    @Get('profile/images')   //Bloque de prueba por lecture y guards
    @UseGuards(AuthGuard)
    getUserImages() {
        return 'Este endopoint retorna las imágenes del usuario';
    }
    
    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    @Roles(Role.Admin)
    @UseGuards(Auth2Guard, RolesGuard)
    getUsers(@Query('page') page : string, @Query('limit') limit : string){
    !page ? page = '1' : page;
    !limit ? limit = '5' : limit;
    return this.usersService.getUsers(Number(page), Number(limit));
    }
        
    @ApiBearerAuth()
    @HttpCode(200)
    @Get(':id')
    @UseGuards(Auth2Guard)
    getUserById(@Param('id', ParseUUIDPipe ) id : string){
        return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id')
    @UseGuards(Auth2Guard)
    UpdateUser(@Param('id', ParseUUIDPipe) id : string, @Body() user : UpdateUserDto){
            return this.usersService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @UseGuards(Auth2Guard)
    DeleteUser(@Param('id', ParseUUIDPipe) id : string){
            return this.usersService.deleteUserById(id)
    }
    
}