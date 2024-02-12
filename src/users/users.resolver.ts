import {
  Args,
  Field,
  InputType,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Role } from './models/role.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@InputType()
class CreateUserInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field(() => [String], { nullable: false })
  roles: string[];
}

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args('id') id: string) {
    return this.usersService.user({ id });
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  async getUsers() {
    return this.usersService.users({});
  }

  @Query(() => User, { name: 'me', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    return this.usersService.user({ id: user.id });
  }

  @ResolveField('roles', () => [Role])
  async getRoles(@Parent() user: User) {
    const { id } = user;
    return this.usersService.rolesByUser({ id });
  }

  @Mutation(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async createUser(@Args('input') input: CreateUserInput) {
    const roles = await this.usersService.roles({ name: { in: input.roles } });

    return this.usersService.createUser({
      ...input,
      roles: { connect: roles },
    });
  }
}
