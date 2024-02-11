import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Session {
  @Field()
  accessToken?: string;
}
