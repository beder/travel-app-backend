import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FindToursInput {
  @Field(() => String)
  travelSlug: string;

  @Field(() => Int, { nullable: true })
  priceFrom?: number;

  @Field(() => Int, { nullable: true })
  priceTo?: number;

  @Field(() => Date, { nullable: true })
  startingDate?: Date;

  @Field(() => Date, { nullable: true })
  endingDate?: Date;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Boolean, { nullable: true })
  sortByPriceAsc?: boolean;

  @Field(() => Int, { nullable: true })
  take?: number;
}
