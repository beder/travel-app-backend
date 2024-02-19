import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { hashPassword } from './utils/hashPassword';
import { Role, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const passwordHash = hashPassword(password);

    return this.usersService.userForAuth({ email, password: passwordHash });
  }

  async login(user: User & { roles: Role[] }) {
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.roles.map((role) => role.name),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
