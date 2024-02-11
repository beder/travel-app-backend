import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Role } from './models/role.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args('id') id: string) {
    return this.usersService.user({ id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  async getUsers() {
    return this.usersService.users({});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => User, { name: 'me', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    return this.usersService.user({ id: user.id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ResolveField('roles', (returns) => [Role])
  async getRoles(@Parent() user: User) {
    const { id } = user;
    return this.usersService.roles({ id });
  }
}
