import { Test, TestingModule } from '@nestjs/testing';
import { TravelsResolver } from './travels.resolver';
import { TravelsService } from './travels.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('TravelsResolver', () => {
  let resolver: TravelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TravelsResolver, TravelsService],
    }).compile();

    resolver = module.get<TravelsResolver>(TravelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
