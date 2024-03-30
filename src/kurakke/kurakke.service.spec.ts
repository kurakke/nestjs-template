import { Test, TestingModule } from '@nestjs/testing';
import { KurakkeService } from './kurakke.service';
import { PrismaService } from '../prisma/prisma.service';
import { initialize, defineKurakkeFactory } from '../../fabbrica';
import { ConfigModule } from '@nestjs/config';

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

  it('should return kurakke', async () => {
    const kurakke = await kurakkeFactory.createList(3);
    const result = await service.findAll();
    expect(service).toBeDefined;
    expect(result).toEqual(kurakke);
  });

  it('shoud return a kurakke', async () => {
    const kurakke = await kurakkeFactory.create();
    const result = await service.findOne(kurakke.id);
    expect(service).toBeDefined;
    expect(result).toEqual(kurakke);
  });
});
