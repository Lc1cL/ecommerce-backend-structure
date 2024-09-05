import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { User } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRespository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'Retorno de Auth';
  }

  async SignIn(email: string, password: string) {
    const user = await this.userRespository.getUserByEmail(email);
    if (!user) throw new BadRequestException(`Wrong credentials`);

    const valildPassword = await bcrypt.compare(password, user.password);
    if (!valildPassword) throw new BadRequestException(`Wrong credentials`);

    const payload = {id: user.id, email: user.email, isAdmin: user.isAdmin};
    const token = this.jwtService.sign(payload);


    return {
        message: 'Successfully logged in',
        token,
    };
  }

  async signUp(user: Partial<User>) {
    const { email, password } = user;

    const foundUser = await this.userRespository.getUserByEmail(email);

    if (foundUser)
      throw new BadRequestException(
        `Email ${email} is already a registered account`,
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRespository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}
