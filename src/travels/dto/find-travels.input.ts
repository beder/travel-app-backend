import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FindTravelsInput {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  pageSize?: number;
}
