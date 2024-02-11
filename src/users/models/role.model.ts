import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Role {
  @Field()
  id: string;

  @Field()
  name: string;

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
  @Field((type) => [User])
  roles: User[];
}
