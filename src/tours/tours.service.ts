import { Injectable } from '@nestjs/common';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToursService {
  constructor(private prisma: PrismaService) {}

  create(travelId: string, createTourInput: CreateTourInput) {
    return this.prisma.tour.create({
      data: {
        ...createTourInput,
        travel: { connect: { id: travelId } },
      },
    });
  }

  findAll() {
    return `This action returns all tours`;
  }

  findOne(id: string) {
    return `This action returns a #${id} tour`;
  }

  update(id: string, updateTourInput: UpdateTourInput) {
    return this.prisma.tour.update({
      where: { id },
      data: updateTourInput,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} tour`;
  }
}
