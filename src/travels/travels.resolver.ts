import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TravelsService } from './travels.service';
import { Travel } from './entities/travel.entity';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { FindTravelsInput } from './dto/find-travels.input';
import { TravelList } from './entities/travel-list.entity';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role as RoleEnum } from '../auth/enums/role.enum';

@Resolver(() => Travel)
export class TravelsResolver {
  constructor(private readonly travelsService: TravelsService) {}

  @Mutation(() => Travel)
  @Roles(RoleEnum.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createTravel(
    @Args('createTravelInput') createTravelInput: CreateTravelInput,
  ) {
    return this.travelsService.create(createTravelInput);
  }

  @Query(() => TravelList, { name: 'publishedTravels' })
  findAllPublic(
    @Args('findTravelsInput', { nullable: true })
    findTravelsInput: FindTravelsInput,
  ) {
    return this.travelsService.findAll({
      ...findTravelsInput,
      where: { isPublic: true },
    });
  }

  @Query(() => TravelList, { name: 'travels' })
  @Roles(RoleEnum.Admin, RoleEnum.Editor)
  @UseGuards(GqlAuthGuard, RolesGuard)
  findAll(
    @Args('findTravelsInput', { nullable: true })
    findTravelsInput: FindTravelsInput,
  ) {
    return this.travelsService.findAll(findTravelsInput);
  }

  @Query(() => Travel, { name: 'travel' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.travelsService.findOne(id);
  }

  @Mutation(() => Travel)
  updateTravel(
    @Args('updateTravelInput') updateTravelInput: UpdateTravelInput,
  ) {
    return this.travelsService.update(updateTravelInput.id, updateTravelInput);
  }

  @Mutation(() => Travel)
  @Roles(RoleEnum.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  deleteTravel(@Args('slug', { type: () => String }) slug: string) {
    return this.travelsService.remove(slug);
  }
}
