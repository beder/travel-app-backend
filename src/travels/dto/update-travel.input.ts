import { CreateTravelInput } from './create-travel.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTravelInput extends PartialType(CreateTravelInput) {
  @Field()
  id: string;
}
