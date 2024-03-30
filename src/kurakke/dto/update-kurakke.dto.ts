import { PartialType } from '@nestjs/mapped-types';
import { CreateKurakkeDto } from './create-kurakke.dto';
export class UpdateKurakkeDto extends PartialType(CreateKurakkeDto) {}
