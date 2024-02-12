import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field(() => [String], { nullable: false })
  roles: string[];
}
