import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initialize, defineKurakkeFactory } from '../../fabbrica';
import { PrismaService } from '../prisma/prisma.service';
import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const prisma = jestPrisma.client;
  const kurakkeFactory = defineKurakkeFactory({
    defaultData: async ({ seq }) => {
      return {
        name: 'kurakke',
        description: `${seq} kurakke`,
      };
    },
  });

  beforeAll(async () => {
    initialize({ prisma });
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/kurakke', async () => {
    const kurakkes = await kurakkeFactory.createList(3);

    return request(app.getHttpServer())
      .get('/kurakke')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(kurakkes);
      });
  });
});
