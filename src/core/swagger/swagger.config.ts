import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Nestjs Template')
  .setDescription('This is my nestjs template project.')
  .setVersion('1.0')
  .build();
