import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Meta {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  totalResults: number;
}
