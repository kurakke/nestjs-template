import { Test, TestingModule } from '@nestjs/testing';
import { KurakkeController } from './kurakke.controller';
import { KurakkeService } from './kurakke.service';

describe('KurakkeController', () => {
  let controller: KurakkeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KurakkeController],
      providers: [KurakkeService],
    }).compile();

    controller = module.get<KurakkeController>(KurakkeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
