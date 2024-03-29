import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersResolver } from './users.resolver';

@Module({
  exports: [UsersService],
  imports: [PrismaModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
