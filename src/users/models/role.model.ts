import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Role {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [User])
  roles: User[];
}
