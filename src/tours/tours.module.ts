import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursResolver } from './tours.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ToursResolver, ToursService],
})
export class ToursModule {}
