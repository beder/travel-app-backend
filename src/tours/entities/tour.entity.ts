import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tour {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  startingDate: Date;

  @Field(() => Date)
  endingDate: Date;

  @Field(() => Int)
  price: number;
}
