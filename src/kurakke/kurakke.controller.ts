import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { KurakkeService } from './kurakke.service';
import { CreateKurakkeDto } from './dto/create-kurakke.dto';

@Controller('kurakke')
export class KurakkeController {
  constructor(private readonly kurakkeService: KurakkeService) {}

  @Post()
  create(@Body() createKurakkeDto: CreateKurakkeDto) {
    return this.kurakkeService.create(createKurakkeDto);
  }

  @Get()
  findAll() {
    return this.kurakkeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kurakkeService.findOne(id);
  }
}
