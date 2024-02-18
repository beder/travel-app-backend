import { Field, ObjectType } from '@nestjs/graphql';
import { Travel } from './travel.entity';
import { Meta } from './meta.entity';

@ObjectType()
export class TravelList {
  @Field(() => Meta)
  meta: Meta;

  @Field(() => [Travel])
  items: Travel[];
}
