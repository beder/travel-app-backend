import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ToursService } from './tours.service';
import { Tour } from './entities/tour.entity';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';
import { FindToursInput } from './dto/find-tours.input';
import { Prisma } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role as RoleEnum } from 'src/auth/enums/role.enum';

@Resolver(() => Tour)
export class ToursResolver {
  constructor(private readonly toursService: ToursService) {}

  private orderBy(attributeName: string, sortOrder?: string) {
    return sortOrder
      ? [{ [attributeName]: sortOrder as Prisma.SortOrder }]
      : [];
  }

  @Mutation(() => Tour)
  @Roles(RoleEnum.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createTour(
    @Args('travelSlug', { type: () => String }) travelSlug: string,
    @Args('createTourInput') createTourInput: CreateTourInput,
  ) {
    return this.toursService.create(travelSlug, createTourInput);
  }

  @Query(() => [Tour], { name: 'tours' })
  findAll(
    @Args('findToursInput', { nullable: true })
    findToursInput: FindToursInput,
  ) {
    const {
      travelSlug: slug,
      priceFrom,
      priceTo,
      priceSortOrder,
      startingDate,
      endingDate,
      ...rest
    } = findToursInput;

    return this.toursService.findAll({
      ...rest,
      orderBy: [
        ...this.orderBy('price', priceSortOrder),
        {
          startingDate: 'asc',
        },
      ],
      where: {
        endingDate,
        price: {
          gte: priceFrom,
          lte: priceTo,
        },
        startingDate,
        travel: { slug },
      },
    });
  }

  @Query(() => Tour, { name: 'tour' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.toursService.findOne(id);
  }

  @Mutation(() => Tour)
  @Roles(RoleEnum.Admin, RoleEnum.Editor)
  @UseGuards(GqlAuthGuard, RolesGuard)
  updateTour(@Args('updateTourInput') updateTourInput: UpdateTourInput) {
    return this.toursService.update(updateTourInput.id, updateTourInput);
  }

  @Mutation(() => Tour)
  removeTour(@Args('id', { type: () => String }) id: string) {
    return this.toursService.remove(id);
  }
}
