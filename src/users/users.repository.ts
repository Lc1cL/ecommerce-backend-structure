import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> 
  ) {}

  async getUsers(page: number, limit: number) {
    let users = await this.userRepository.find();

    const start = (page - 1) * limit;
    const end = page + limit;

    users = users.slice(start, end);

    return users.map(({ password, ...user }) => user);
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({where: { id }, relations: { orders: true}});

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const {password, isAdmin, ...userNoPass} = user;
    return userNoPass;
  }

  async createUser(user: Partial<User>) {

    const dateUser = new Date(user.birthdate);

    const newUser = await this.userRepository.save({birthdate: dateUser, ...user});

    const dbUser = await this.userRepository.findOneBy({id: newUser.id})

    const {password,isAdmin, ...userNoPass} = dbUser;

    return userNoPass;
  }

  async updateUser(id: string, user: User) {
    const foundUser = await this.userRepository.findOneBy({id})
    if (!foundUser) {
      throw new NotFoundException('User was not found and therefore not updated')
    }

    await this.userRepository.update(id, user);
  
    const {password, isAdmin, ...userNoPass} = foundUser;
    return userNoPass;
  }

  async deleteById(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      } else {
        await this.userRepository.remove(user);
        return `User with id ${id} was deleted successfully`;
      }
    } catch (error) {
      console.log(`Error al eliminar usuario: ${error.message}`);
      return `Error al eliminar usuario con id ${id}`;
    }
  }

  getUserByEmail(email: string) {
    const userEmail = this.userRepository.findOne({ where: { email } });
    
    if(!userEmail){
      throw new NotFoundException(`User with email ${email} not found`)
    }
    
    return userEmail;
  }
}
