import { PartialType } from '@nestjs/mapped-types';
import { CreateKurakkeDto } from './create-kurakke.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateKurakkeDto extends PartialType(CreateKurakkeDto) {
  @ApiProperty({ example: 'Kurakke', description: 'The name of the Kurakke' })
  name: string;

  @ApiProperty({
    example: 'Kurakke is cool',
    description: 'The description of the Kurakke',
  })
  description: string;
}
