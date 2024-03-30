import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { KurakkeService } from './kurakke.service';
import { CreateKurakkeDto } from './dto/create-kurakke.dto';
import { UpdateKurakkeDto } from './dto/update-kurakke.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKurakkeDto: UpdateKurakkeDto) {
    return this.kurakkeService.update(id, updateKurakkeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kurakkeService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kurakkeService.remove(id);
  }
}
