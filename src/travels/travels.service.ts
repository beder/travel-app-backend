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

  async findAll(params: {
    page?: number;
    pageSize?: number;
    cursor?: Prisma.TravelWhereUniqueInput;
    where?: Prisma.TravelWhereInput;
    orderBy?: Prisma.TravelOrderByWithRelationInput;
  }) {
    const { page = 1, pageSize: take = 10, cursor, where, orderBy } = params;

    const query = {
      skip: (page - 1) * take,
      take,
      cursor,
      orderBy,
      include: { tours: true },
      where,
    };

    const [items, count] = await Promise.all([
      this.prisma.travel.findMany(query),
      this.prisma.travel.count({ where: query.where }),
    ]);

    return {
      items,
      meta: {
        page,
        pageSize: take,
        totalPages: Math.ceil(count / take),
        totalResults: count,
      },
    };
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
