import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getHello(): Promise<string> {
    const users = await this.userService.users({ take: 1 });

    return users && users.length ? `Hello ${users[0].email}!` : 'Hello World!';
  }
}
