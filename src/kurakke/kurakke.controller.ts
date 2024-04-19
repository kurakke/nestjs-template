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
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  NomalResponse,
  FindOneResponse,
  CreatedResponse,
  UpdatedResponse,
  DeletedResponse,
} from 'src/common/decorators/swagger/responses/specific';

@Controller('kurakke')
@ApiTags('kurakke')
export class KurakkeController {
  constructor(private readonly kurakkeService: KurakkeService) {}

  @Post()
  @CreatedResponse()
  create(@Body() createKurakkeDto: CreateKurakkeDto) {
    return this.kurakkeService.create(createKurakkeDto);
  }

  @Get()
  @NomalResponse()
  findAll() {
    return this.kurakkeService.findAll();
  }

  @Patch(':id')
  @UpdatedResponse()
  @ApiBody({ type: UpdateKurakkeDto })
  update(@Param('id') id: string, @Body() updateKurakkeDto: UpdateKurakkeDto) {
    return this.kurakkeService.update(id, updateKurakkeDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @FindOneResponse()
  async findOne(@Param('id') id: string) {
    const result = await this.kurakkeService.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Delete(':id')
  @DeletedResponse()
  remove(@Param('id') id: string) {
    return this.kurakkeService.remove(id);
  }
}
