import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "../entities/users.entity";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UserRepository){}

    deleteUserById(id : string) {
        return this.usersRepository.deleteById(id);
    }

    updateUser(id : string, user: any){
        return this.usersRepository.updateUser(id, user)
    }
    
    getUsers(page : number, limit : number) {
        return this.usersRepository.getUsers(page, limit);
    }

    getUserById(id : string){
        return this.usersRepository.getById(id);
    }

    createUser(user: User){
        return this.usersRepository.createUser(user);
    }
}