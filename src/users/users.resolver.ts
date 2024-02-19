import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Role } from './entities/role.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateUserInput } from './dto/create-user.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role as RoleEnum } from '../auth/enums/role.enum';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  async getUsers() {
    return this.usersService.findAll({});
  }

  @Query(() => User, { name: 'me', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    return this.usersService.findOne({ id: user.id });
  }

  @ResolveField('roles', () => [Role])
  async getRoles(@Parent() user: User) {
    const { id } = user;
    return this.usersService.rolesByUser({ id });
  }

  @Mutation(() => User, { nullable: true })
  @Roles(RoleEnum.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createUser(@Args('input') input: CreateUserInput) {
    const roles = await this.usersService.roles({ name: { in: input.roles } });

    return this.usersService.create({
      ...input,
      roles: { connect: roles },
    });
  }
}
