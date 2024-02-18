import { Injectable } from '@nestjs/common';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TravelsService {
  constructor(private prisma: PrismaService) {}

  create(createTravelInput: CreateTravelInput) {
    return this.prisma.travel.create({
      data: {
        ...createTravelInput,
        ...(createTravelInput.moods && {
          moods: createTravelInput.moods as any,
        }),
      },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TravelWhereUniqueInput;
    where?: Prisma.TravelWhereInput;
    orderBy?: Prisma.TravelOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.travel.findMany({
      skip,
      take,
      cursor,
      orderBy,
      include: { tours: true },
      where: {
        ...where,
        isPublic: true,
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} travel`;
  }

  update(id: string, updateTravelInput: UpdateTravelInput) {
    return this.prisma.travel.update({
      where: { id },
      data: {
        ...updateTravelInput,
        ...(updateTravelInput.moods && {
          moods: JSON.stringify(updateTravelInput.moods),
        }),
      },
    });
  }

  remove(slug: string) {
    return this.prisma.travel.delete({
      where: { slug },
    });
  }
}
