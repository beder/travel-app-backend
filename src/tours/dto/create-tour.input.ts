import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTourInput {
  @Field(() => String)
  name: string;

  @Field(() => Date)
  startingDate: Date;

  @Field(() => Date)
  endingDate: Date;

  @Field(() => Int)
  price: number;
}
