import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KurakkeModule } from './kurakke/kurakke.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    KurakkeModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile:
        process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'ci',
      envFilePath:
        process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'ci'
          ? undefined
          : '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
