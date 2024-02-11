import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ToursService } from './tours.service';
import { Tour } from './entities/tour.entity';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';

@Resolver(() => Tour)
export class ToursResolver {
  constructor(private readonly toursService: ToursService) {}

  @Mutation(() => Tour)
  createTour(
    @Args('travelId', { type: () => String }) travelId: string,
    @Args('createTourInput') createTourInput: CreateTourInput,
  ) {
    return this.toursService.create(travelId, createTourInput);
  }

  @Query(() => [Tour], { name: 'tours' })
  findAll() {
    return this.toursService.findAll();
  }

  @Query(() => Tour, { name: 'tour' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.toursService.findOne(id);
  }

  @Mutation(() => Tour)
  updateTour(@Args('updateTourInput') updateTourInput: UpdateTourInput) {
    return this.toursService.update(updateTourInput.id, updateTourInput);
  }

  @Mutation(() => Tour)
  removeTour(@Args('id', { type: () => String }) id: string) {
    return this.toursService.remove(id);
  }
}
