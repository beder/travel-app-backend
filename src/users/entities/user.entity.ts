import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from './role.entity';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => [Role])
  roles: Role[];
}
