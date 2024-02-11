import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FindTravelsInput {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}
