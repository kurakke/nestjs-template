import { Test, TestingModule } from '@nestjs/testing';
import { KurakkeController } from './kurakke.controller';
import { KurakkeService } from './kurakke.service';
import { CreateKurakkeDto } from './dto/create-kurakke.dto';

describe('KurakkeController', () => {
  let controller: KurakkeController;
  let service: KurakkeService;

  beforeEach(async () => {
    const mockKurakkeService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KurakkeController],
      providers: [{ provide: KurakkeService, useValue: mockKurakkeService }],
    }).compile();

    controller = module.get<KurakkeController>(KurakkeController);
    service = module.get<KurakkeService>(KurakkeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call KurakkeService.create and return the result', async () => {
    const kurakke: CreateKurakkeDto = {
      name: 'Test',
      description: 'Test description',
    };
    const expectedResult = {
      id: 'A2C181D9-0D60-47F1-97EC-AA8157B58A4D',
      ...kurakke,
    };

    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.create(kurakke)).toEqual(expectedResult);
    expect(service.create).toHaveBeenCalledWith(kurakke);
  });

  it('should call KurakkeService.findAll and return the result', async () => {
    const expectedResult = [
      {
        id: 'A2C181D9-0D60-47F1-97EC-AA8157B58A4D',
        name: 'Test',
        description: 'Test description',
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toEqual(expectedResult);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call KurakkeService.findOne and return the result', async () => {
    const expectedResult = {
      id: 'A2C181D9-0D60-47F1-97EC-AA8157B58A4D',
      name: 'Test',
      description: 'Test description',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOne(expectedResult.id)).toEqual(expectedResult);
    expect(service.findOne).toHaveBeenCalledWith(expectedResult.id);
  });

  it('should call KurakkeService.update and return the result', async () => {
    const kurakke: CreateKurakkeDto = {
      name: 'Test',
      description: 'Test description',
    };
    const expectedResult = {
      id: 'A2C181D9-0D60-47F1-97EC-AA8157B58A4D',
      ...kurakke,
    };

    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

    expect(await controller.update(expectedResult.id, kurakke)).toEqual(
      expectedResult,
    );
    expect(service.update).toHaveBeenCalledWith(expectedResult.id, kurakke);
  });

  it('should call KurakkeService.remove', async () => {
    const id = 'A2C181D9-0D60-47F1-97EC-AA8157B58A4D';

    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
