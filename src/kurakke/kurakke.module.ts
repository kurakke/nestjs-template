import { Module } from '@nestjs/common';
import { KurakkeService } from './kurakke.service';
import { KurakkeController } from './kurakke.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KurakkeController],
  providers: [KurakkeService],
})
export class KurakkeModule {}
