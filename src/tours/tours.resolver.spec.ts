import { Test, TestingModule } from '@nestjs/testing';
import { ToursResolver } from './tours.resolver';
import { ToursService } from './tours.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('ToursResolver', () => {
  let resolver: ToursResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ToursResolver, ToursService],
    }).compile();

    resolver = module.get<ToursResolver>(ToursResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
