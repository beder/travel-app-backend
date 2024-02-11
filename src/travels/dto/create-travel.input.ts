import { InputType, Int, Field } from '@nestjs/graphql';
import { MoodsInput } from './moods.input';

@InputType()
export class CreateTravelInput {
  @Field(() => Boolean)
  isPublic: boolean;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  numberOfDays: number;

  @Field(() => MoodsInput)
  moods: MoodsInput;
}
