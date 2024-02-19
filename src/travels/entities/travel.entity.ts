import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Moods } from './moods.entity';
import { Tour } from '../../tours/entities/tour.entity';

@ObjectType()
export class Travel {
  @Field(() => String)
  id: string;

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

  @Field(() => Moods)
  moods: Moods;

  @Field(() => [Tour])
  tours: Tour[];
}
