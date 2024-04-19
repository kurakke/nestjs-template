import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKurakkeDto {
  @ApiProperty({ example: 'Kurakke', description: 'The name of the Kurakke' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    example: 'Kurakke is cool',
    description: 'The description of the Kurakke',
  })
  @IsString({ message: 'Description must be a string' })
  description: string;
}
