import { Injectable } from '@nestjs/common';
import { CreateKurakkeDto } from './dto/create-kurakke.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KurakkeService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}
  create(createKurakkeDto: CreateKurakkeDto) {
    return this.prismaService.kurakke.create({ data: { ...createKurakkeDto } });
  }

  findAll() {
    return this.prismaService.kurakke.findMany();
  }

  findOne(id: string) {
    return this.prismaService.kurakke.findFirst({
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} kurakke`;
  }
}
