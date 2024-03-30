import { Injectable } from '@nestjs/common';
import { CreateKurakkeDto } from './dto/create-kurakke.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UpdateKurakkeDto } from './dto/update-kurakke.dto';
import { Kurakke } from '@prisma/client';
@Injectable()
export class KurakkeService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}
  async create(createKurakkeDto: CreateKurakkeDto): Promise<Kurakke> {
    return await this.prismaService.kurakke.create({
      data: { ...createKurakkeDto },
    });
  }

  async findAll(): Promise<Kurakke[]> {
    return await this.prismaService.kurakke.findMany();
  }

  async findOne(id: string): Promise<Kurakke> {
    return await this.prismaService.kurakke.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateKurakkeDto: UpdateKurakkeDto,
  ): Promise<Kurakke> {
    return await this.prismaService.kurakke.update({
      where: { id },
      data: { ...updateKurakkeDto },
    });
  }

  async remove(id: string): Promise<Kurakke> {
    return await this.prismaService.kurakke.delete({
      where: { id },
    });
  }
}
