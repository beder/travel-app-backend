import { Injectable } from '@nestjs/common';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TravelsService {
  constructor(private prisma: PrismaService) {}

  async create(createTravelInput: CreateTravelInput) {
    const travel = await this.prisma.travel.create({
      data: {
        ...createTravelInput,
        ...(createTravelInput.moods && {
          moods: createTravelInput.moods as any,
        }),
      },
    });

    return travel;
  }

  findAll() {
    return `This action returns all travels`;
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

  remove(id: string) {
    return `This action removes a #${id} travel`;
  }
}
