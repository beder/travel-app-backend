import { Test, TestingModule } from '@nestjs/testing';
import { TravelsService } from './travels.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TravelsResolver } from './travels.resolver';

describe('TravelsService', () => {
  let service: TravelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TravelsResolver, TravelsService],
    }).compile();

    service = module.get<TravelsService>(TravelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
