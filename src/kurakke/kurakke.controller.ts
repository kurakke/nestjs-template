import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
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
  async findOne(@Param('id') id: string) {
    const result = await this.kurakkeService.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kurakkeService.remove(id);
  }
}
