import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Session } from './models/session.model';
import { UnauthorizedException } from '@nestjs/common';

@InputType()
class LoginInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

@Resolver(() => Session)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Session, { nullable: true })
  async login(@Args('input') input: LoginInput) {
    const user = await this.authService.validateUser(
      input.email,
      input.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }
}
