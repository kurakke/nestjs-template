import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { initialize, defineKurakkeFactory } from '../../fabbrica';
import { PrismaService } from '../prisma/prisma.service';
import { AppModule } from '../app.module';
import { Kurakke, PrismaClient } from '@prisma/client';

describe('KurakkeController (e2e)', () => {
  let app: INestApplication;
  const prisma: PrismaClient = jestPrisma.client;
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
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('GET /kurakke', () => {
    it('should return kurakkes', async () => {
      const kurakkes: Kurakke[] = await kurakkeFactory.createList(3);

      const response = await request(app.getHttpServer())
        .get('/kurakke')
        .expect(200);

      expect(response.body).toEqual(kurakkes);
    });
  });

  describe('GET /kurakke/:id', () => {
    it('should return a kurakke', async () => {
      const kurakke: Kurakke = await kurakkeFactory.create();

      const response = await request(app.getHttpServer())
        .get(`/kurakke/${kurakke.id}`)
        .expect(200);

      expect(response.body).toEqual(kurakke);
    });

    it('should return 404 error', async () => {
      const response = await request(app.getHttpServer())
        .get('/kurakke/kurakke')
        .expect(404);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /kurakke', () => {
    it('should create a new Kurakke and return its details', async () => {
      const kurakke = await kurakkeFactory.build();
      const response = await request(app.getHttpServer())
        .post('/kurakke')
        .send(kurakke)
        .expect(201);

      const findedKurakke: Kurakke = await prisma.kurakke.findUnique({
        where: {
          id: response.body.id,
        },
      });

      expect(response.body).toMatchObject({
        name: kurakke.name,
        description: kurakke.description,
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body).toMatchObject({
        name: findedKurakke.name,
        description: kurakke.description,
      });
    });

    it('should fail creating kurakke', async () => {
      const kurakke = { name: 'kurakke', description: 123 };
      const response = await request(app.getHttpServer())
        .post('/kurakke')
        .send(kurakke)
        .expect(400);

      expect(response.body.message).toEqual(['Description must be a string']);
    });
  });

  describe('PUT /kurakke/:id', () => {
    it('/kurakke/:id update', async () => {
      const kurakke = await kurakkeFactory.create();
      const updateKurakke = await kurakkeFactory.build();

      const response = await request(app.getHttpServer())
        .patch(`/kurakke/${kurakke.id}`)
        .send(updateKurakke)
        .expect(200);

      expect(response.body).toMatchObject({
        name: updateKurakke.name,
        description: updateKurakke.description,
      });
      expect(response.body).toHaveProperty('id');
    });
  });
});
