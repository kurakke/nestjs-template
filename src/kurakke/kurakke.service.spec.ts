import { Test, TestingModule } from '@nestjs/testing';
import { KurakkeService } from './kurakke.service';
import { PrismaService } from '../prisma/prisma.service';
import { initialize, defineKurakkeFactory } from '../../prisma/fabbrica';
import { ConfigModule } from '@nestjs/config';
import { UpdateKurakkeDto } from './dto/update-kurakke.dto';

describe('KurakkeService', () => {
  let service: KurakkeService;
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
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
      providers: [KurakkeService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<KurakkeService>(KurakkeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a kurakke', async () => {
    const kurakke = await kurakkeFactory.build();

    const result = await service.create(kurakke);

    expect(result).toMatchObject({
      name: kurakke.name,
      description: kurakke.description,
    });
    expect(result).toHaveProperty('id');
  });

  it('should return kurakke', async () => {
    const kurakke = await kurakkeFactory.createList(3);

    const result = await service.findAll();

    expect(result).toEqual(kurakke);
  });

  it('shoud return a kurakke', async () => {
    const kurakke = await kurakkeFactory.create();

    const result = await service.findOne(kurakke.id);

    expect(result).toEqual(kurakke);
  });

  it('should update a kurakke', async () => {
    const kurakke = await kurakkeFactory.create();
    const updateKurakke: UpdateKurakkeDto = {
      name: 'updated kurakke name',
      description: 'updated kurakke description',
    };

    const result = await service.update(kurakke.id, {
      name: updateKurakke.name,
      description: updateKurakke.description,
    });

    expect(kurakke).not.toMatchObject(updateKurakke);
    expect(result).toMatchObject({
      name: updateKurakke.name,
      description: updateKurakke.description,
    });
  });

  it('should delete a kurakke', async () => {
    const createdKurakke = await kurakkeFactory.create();

    const result = await service.remove(createdKurakke.id);

    const findedKurakke = await service.findOne(createdKurakke.id);

    expect(result).toEqual(createdKurakke);
    expect(findedKurakke).toBeNull;
  });
});
