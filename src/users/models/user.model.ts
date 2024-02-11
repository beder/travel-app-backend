import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from './role.model';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
  @Field((type) => [Role])
  roles: Role[];
}
