import { InputType, Int, Field } from '@nestjs/graphql';
import { SortOrderScalar } from 'src/graphql/scalars/sort-order.scalar';

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

  @Field(() => SortOrderScalar, { nullable: true })
  priceSortOrder?: string;

  @Field(() => Int, { nullable: true })
  take?: number;
}
